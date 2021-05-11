const form = document.querySelector(".contact-form");
const submitButton = document.querySelector(".submit-button");

const fullName = document.querySelector("#fullName");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");

const fullNameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const subjectError = document.querySelector("#subject-error");
const messageError = document.querySelector("#message-error");

const success = document.querySelector(".success");

function validateForm(event) {
  event.preventDefault();

  if (checkLength(fullName.value, 6) === true) {
    fullNameError.style.display = "none";
    fullName.style.borderBottom = "3px solid olive";
  } else {
    fullNameError.style.display = "block";
    fullName.style.borderBottom = "3px solid darkred";
  }

  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
    email.style.borderBottom = "3px solid olive";
  } else {
    emailError.style.display = "block";
    email.style.borderBottom = "3px solid darkred";
  }

  if (checkLength(subject.value, 16) === true) {
    subjectError.style.display = "none";
    subject.style.borderBottom = "3px solid olive";
  } else {
    subjectError.style.display = "block";
    subject.style.borderBottom = "3px solid darkred";
  }

  if (checkLength(message.value, 26) === true) {
    messageError.style.display = "none";
    message.style.borderBottom = "3px solid olive";
  } else {
    messageError.style.display = "block";
    message.style.borderBottom = "3px solid darkred";
  }
}

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
  if (value.trim().length >= len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const emailRegEx = /\S+@\S+\.\S+/;
  const patternMatchesEmail = emailRegEx.test(email);
  return patternMatchesEmail;
}

function submitForm(event) {
  event.preventDefault();
  if (
    checkLength(fullName.value, 6) === true &&
    validateEmail(email.value) === true &&
    checkLength(subject.value, 16) === true &&
    checkLength(message.value, 26) === true
  ) {
    form.style.display = "none";
    success.style.display = "block";
  } else {
    form.style.display = "block";
  }
}

form.addEventListener("submit", submitForm);
