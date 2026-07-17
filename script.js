// ======================================
// ELEMENTS
// ======================================

const fullName = document.getElementById("fullname");
const email = document.getElementById("email");
const username = document.getElementById("username");

const passwordInput = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

const toggleBtn = document.getElementById("toggle-btn");
const confirmToggleBtn = document.getElementById("confirm-toggle-btn");

const copyBtn = document.getElementById("copy-btn");
const registerBtn = document.getElementById("register-btn");

const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");
const analysisMessage = document.getElementById("analysis-message");

// Requirement Elements

const lengthReq = document.getElementById("length");
const uppercaseReq = document.getElementById("uppercase");
const lowercaseReq = document.getElementById("lowercase");
const numberReq = document.getElementById("number");
const specialReq = document.getElementById("special");

// ======================================
// COMMON PASSWORDS
// ======================================

const commonPasswords = [
  "123456",
  "12345678",
  "password",
  "password123",
  "qwerty",
  "abc123",
  "admin",
  "welcome",
  "letmein",
  "football",
  "iloveyou"
];

// ======================================
// EVENTS
// ======================================

passwordInput.addEventListener("input", checkPasswordStrength);

toggleBtn.addEventListener("click", togglePassword);

confirmToggleBtn.addEventListener("click", toggleConfirmPassword);

copyBtn.addEventListener("click", copyPassword);

registerBtn.addEventListener("click", registerPassword);

// ======================================
// SHOW / HIDE PASSWORD
// ======================================

function togglePassword() {

    if(passwordInput.type === "password"){

        passwordInput.type = "text";
        toggleBtn.textContent = "Hide";

    }else{

        passwordInput.type = "password";
        toggleBtn.textContent = "Show";

    }

}

function toggleConfirmPassword(){

    if(confirmPassword.type === "password"){

        confirmPassword.type = "text";
        confirmToggleBtn.textContent = "Hide";

    }else{

        confirmPassword.type = "password";
        confirmToggleBtn.textContent = "Show";

    }

}

// ======================================
// COPY PASSWORD
// ======================================

function copyPassword(){

    if(passwordInput.value === ""){

        alert("Please enter a password first.");
        return;

    }

    navigator.clipboard.writeText(passwordInput.value);

    copyBtn.textContent = "✔";

    setTimeout(function(){

        copyBtn.textContent = "⧉";

    },2000);

}

// ======================================
// PASSWORD STRENGTH
// ======================================

function checkPasswordStrength(){

    const password = passwordInput.value;

    let score = 0;

    if(password.length >= 8){

        score++;
        setValid(lengthReq);

    }else{

        setInvalid(lengthReq);

    }

    if(/[A-Z]/.test(password)){

        score++;
        setValid(uppercaseReq);

    }else{

        setInvalid(uppercaseReq);

    }

    if(/[a-z]/.test(password)){

        score++;
        setValid(lowercaseReq);

    }else{

        setInvalid(lowercaseReq);

    }

    if(/[0-9]/.test(password)){

        score++;
        setValid(numberReq);

    }else{

        setInvalid(numberReq);

    }

    if(/[^A-Za-z0-9]/.test(password)){

        score++;
        setValid(specialReq);

    }else{

        setInvalid(specialReq);

    }

    if(score <= 2){

        strengthBar.style.width = "33%";
        strengthBar.style.backgroundColor = "red";
        strengthText.textContent = "Strength: Weak";

    }

    else if(score <= 4){

        strengthBar.style.width = "66%";
        strengthBar.style.backgroundColor = "orange";
        strengthText.textContent = "Strength: Medium";

    }

    else{

        strengthBar.style.width = "100%";
        strengthBar.style.backgroundColor = "green";
        strengthText.textContent = "Strength: Strong";

    }

    securityAnalysis(password, score);

}

// ======================================
// SECURITY ANALYSIS
// ======================================

function securityAnalysis(password, score) {

    if (password.length === 0) {

        analysisMessage.innerHTML =
            "Start typing your password to receive security feedback.";

        return;
    }

    if (commonPasswords.includes(password.toLowerCase())) {

        analysisMessage.innerHTML =
            "❌ <strong>Very Unsafe!</strong><br>This password is commonly used and can be guessed easily.";

        return;
    }

    if (score <= 2) {

        analysisMessage.innerHTML =
            "❌ Weak Password.<br>Add uppercase letters, lowercase letters, numbers and special characters.";

    }

    else if (score <= 4) {

        analysisMessage.innerHTML =
            "⚠ Medium Password.<br>Almost there. Improve it by meeting all password requirements.";

    }

    else {

        analysisMessage.innerHTML =
            "✅ Strong Password.<br>Your password meets the recommended security standards.";

    }

}

// ======================================
// REGISTER
// ======================================

function registerPassword() {

    const password = passwordInput.value;

    // Check empty fields
    if (
        fullName.value.trim() === "" ||
        email.value.trim() === "" ||
        username.value.trim() === "" ||
        password.trim() === "" ||
        confirmPassword.value.trim() === ""
    ) {

        alert("Please complete all fields.");
        return;

    }

    // Passwords must match
    if (password !== confirmPassword.value) {

        alert("Passwords do not match.");
        return;

    }

    // Common password
    if (commonPasswords.includes(password.toLowerCase())) {

        alert("This password is too common. Please choose another one.");
        return;

    }

    // Check password strength
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score < 5) {

        alert("Please create a STRONG password before continuing.");
        return;

    }

    // Get previously saved users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if password has been used before
    const passwordExists = users.some(user => user.password === password);

    if (passwordExists) {

        alert("This password has already been used. Please choose a different password.");
        return;

    }

    // Save new user
    const newUser = {

        fullname: fullName.value,
        email: email.value,
        username: username.value,
        password: password

    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    // Save current user
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    registerBtn.disabled = true;
    registerBtn.textContent = "Creating Password...";

    setTimeout(function () {

        window.location.href = "success.html";

    }, 1000);

}

// ======================================
// REQUIREMENT HELPERS
// ======================================

function setValid(element){

    element.classList.add("valid");
    element.classList.remove("invalid");

    element.innerHTML = "✔ " + element.textContent.substring(2);

}

function setInvalid(element){

    element.classList.add("invalid");
    element.classList.remove("valid");

    element.innerHTML = "✖ " + element.textContent.substring(2);

}
