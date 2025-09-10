/**
 * accountFormUI.js
 * Toggles between the login and registration forms
 */
import { errorTypes } from "../constants/constants";

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

function showError(error) {
	const errorBox = document.querySelector(".error-box");
	errorBox.classList.remove("show");
	void errorBox.offsetWidth;

	errorBox.textContent = errorTypes[error];
	errorBox.classList.add("show");
}

export { showRegister, showLogin, showError };
