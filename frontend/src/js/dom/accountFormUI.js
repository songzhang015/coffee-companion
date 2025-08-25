/**
 * accountFormUI.js
 * Toggles between the login and registration forms
 */
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");

function showRegister() {
	loginForm.style.display = "none";
	registerForm.style.display = "flex";
}

function showLogin() {
	loginForm.style.display = "flex";
	registerForm.style.display = "none";
}

export { showRegister, showLogin };
