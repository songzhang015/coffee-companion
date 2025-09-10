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

let errorTimeout;

function showError(error) {
	const errorBox = document.querySelector(".error-box");
	clearTimeout(errorTimeout);

	errorBox.classList.remove("show", "hide");
	void errorBox.offsetWidth;

	errorBox.textContent = errorTypes[error];
	errorBox.classList.add("show");

	errorTimeout = setTimeout(() => {
		errorBox.classList.add("hide");

		errorTimeout = setTimeout(() => {
			errorBox.classList.remove("show", "hide");
		}, 1000);
	}, 10000);
}

export { showRegister, showLogin, showError };
