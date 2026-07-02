const passwordInput = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

const fullName = document.getElementById("fullname");
const email = document.getElementById("email");
const username = document.getElementById("username");

const registerBtn = document.getElementById("register-btn");

const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");

const toggleBtn = document.getElementById("toggle-btn");
const copyBtn = document.getElementById("copy-btn");

// Requirement Elements
const lengthReq = document.getElementById("length");
const uppercaseReq = document.getElementById("uppercase");
const lowercaseReq = document.getElementById("lowercase");
const numberReq = document.getElementById("number");
const specialReq = document.getElementById("special");

let currentStrength = "Weak";

// ================================
// PASSWORD STRENGTH
// ================================

passwordInput.addEventListener("input", checkPasswordStrength);

function checkPasswordStrength() {
  const password = passwordInput.value;

  let score = 0;

  if (password.length >= 8) {
    score++;
    setValid(lengthReq);
  } else {
    setInvalid(lengthReq);
  }

  if (/[A-Z]/.test(password)) {
    score++;
    setValid(uppercaseReq);
  } else {
    setInvalid(uppercaseReq);
  }

  if (/[a-z]/.test(password)) {
    score++;
    setValid(lowercaseReq);
  } else {
    setInvalid(lowercaseReq);
  }

  if (/[0-9]/.test(password)) {
    score++;
    setValid(numberReq);
  } else {
    setInvalid(numberReq);
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score++;
    setValid(specialReq);
  } else {
    setInvalid(specialReq);
  }

  if (score <= 2) {
    currentStrength = "Weak";

    strengthBar.style.width = "33%";
    strengthBar.style.backgroundColor = "red";
    strengthText.textContent = "Strength: Weak";
  } else if (score <= 4) {
    currentStrength = "Medium";

    strengthBar.style.width = "66%";
    strengthBar.style.backgroundColor = "orange";
    strengthText.textContent = "Strength: Medium";
  } else {
    currentStrength = "Strong";

    strengthBar.style.width = "100%";
    strengthBar.style.backgroundColor = "green";
    strengthText.textContent = "Strength: Strong";
  }
}

// ================================
// SHOW / HIDE PASSWORD
// ================================

toggleBtn.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleBtn.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    toggleBtn.textContent = "Show";
  }
});

// ================================
// COPY PASSWORD
// ================================

copyBtn.addEventListener("click", function () {
  if (passwordInput.value === "") {
    alert("Please enter a password first.");
    return;
  }

  navigator.clipboard.writeText(passwordInput.value);

  copyBtn.textContent = "Copied!";

  setTimeout(function () {
    copyBtn.textContent = "⧉";
  }, 2000);
});

// ================================
// REGISTER
// ================================

registerBtn.addEventListener("click", function () {
  if (
    fullName.value.trim() === "" ||
    email.value.trim() === "" ||
    username.value.trim() === "" ||
    passwordInput.value.trim() === "" ||
    confirmPassword.value.trim() === ""
  ) {
    alert("Please fill in all fields.");
    return;
  }

  if (passwordInput.value !== confirmPassword.value) {
    alert("Passwords do not match.");
    return;
  }

  if (currentStrength !== "Strong") {
    alert("Please choose a stronger password.");
    return;
  }

  // Save password locally to simulate reuse detection
  localStorage.setItem("lastPassword", passwordInput.value);

  window.location.href = "success.html";
});

// ================================
// REQUIREMENT HELPERS
// ================================

function setValid(element) {
  element.classList.add("valid");
  element.classList.remove("invalid");

  element.innerHTML = "✔ " + element.textContent.substring(2);
}

function setInvalid(element) {
  element.classList.add("invalid");
  element.classList.remove("valid");

  element.innerHTML = "✖ " + element.textContent.substring(2);
}