const passwordInput = document.getElementById("password");

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

passwordInput.addEventListener("input", checkPasswordStrength);

toggleBtn.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";

    toggleBtn.textContent = "Hide";
  } else {
    passwordInput.type = "password";

    toggleBtn.textContent = "Show";
  }
});

copyBtn.addEventListener("click", function () {
  const password = passwordInput.value;

  if (password === "") {
    alert("Please enter a password first.");
    return;
  }

  navigator.clipboard.writeText(password);

  copyBtn.textContent = "Copied!";

  setTimeout(function () {
    copyBtn.textContent = "⧉";
  }, 2000);
});

function checkPasswordStrength() {
  const password = passwordInput.value;

  let score = 0;

  // Length
  if (password.length >= 8) {
    score++;

    setValid(lengthReq);
  } else {
    setInvalid(lengthReq);
  }

  // Uppercase
  if (/[A-Z]/.test(password)) {
    score++;

    setValid(uppercaseReq);
  } else {
    setInvalid(uppercaseReq);
  }

  // Lowercase
  if (/[a-z]/.test(password)) {
    score++;

    setValid(lowercaseReq);
  } else {
    setInvalid(lowercaseReq);
  }

  // Number
  if (/[0-9]/.test(password)) {
    score++;

    setValid(numberReq);
  } else {
    setInvalid(numberReq);
  }

  // Special Character
  if (/[^A-Za-z0-9]/.test(password)) {
    score++;

    setValid(specialReq);
  } else {
    setInvalid(specialReq);
  }

  // Weak
  if (score <= 2) {
    strengthBar.style.width = "33%";

    strengthBar.style.backgroundColor = "red";

    strengthText.textContent = "Strength: Weak";
  }

  // Medium
  else if (score <= 4) {
    strengthBar.style.width = "66%";

    strengthBar.style.backgroundColor = "orange";

    strengthText.textContent = "Strength: Medium";
  }

  // Strong
  else {
    strengthBar.style.width = "100%";

    strengthBar.style.backgroundColor = "green";

    strengthText.textContent = "Strength: Strong";
  }
}

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
