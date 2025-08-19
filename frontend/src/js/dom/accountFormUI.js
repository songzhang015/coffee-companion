/**
 * accountFormUI.js
 * Toggles between the login and registration forms
 */
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");

const toggleToLogin = document.querySelector(".toggle-to-login");
const toggleToSignup = document.querySelector(".toggle-to-signup");

function showRegister() {
	loginForm.style.display = "none";
	registerForm.style.display = "flex";
	toggleToSignup.style.display = "none";
	toggleToLogin.style.display = "block";
}

function showLogin() {
	loginForm.style.display = "flex";
	registerForm.style.display = "none";
	toggleToSignup.style.display = "block";
	toggleToLogin.style.display = "none";
}

export { showRegister, showLogin };
