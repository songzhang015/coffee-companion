/* JS File for Coffee Companion App - Account Page */
import "../css/global.css";
import "../css/account.css";

import { guestState } from "./states/guestState.js";
import { login, register } from "./apis/accountAuthApi.js";

const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");

function showRegister() {
	document.querySelector(".login-form").style.display = "none";
	document.querySelector(".register-form").style.display = "flex";
	document.querySelector(".no-account").style.display = "none";
	document.querySelector(".have-account").style.display = "block";
}

function showLogin() {
	document.querySelector(".register-form").style.display = "none";
	document.querySelector(".login-form").style.display = "flex";
	document.querySelector(".no-account").style.display = "block";
	document.querySelector(".have-account").style.display = "none";
}

function attachFormSwitchListeners() {
	const registerBtn = document.querySelector(".switch-register-btn");
	if (registerBtn) {
		registerBtn.addEventListener("click", (e) => {
			e.preventDefault();
			showRegister();
		});
	}

	const loginBtn = document.querySelector(".switch-login-btn");
	if (loginBtn) {
		loginBtn.addEventListener("click", (e) => {
			e.preventDefault();
			showLogin();
		});
	}
}

function continueAsGuest() {
	const continueButton = document.querySelector(".guest");
	continueButton.addEventListener("click", (e) => {
		e.preventDefault();
		guestState.isGuest = true;
		window.location.href = "/home";
	});
}

function submission() {
	const passwordInput = document.getElementById("password-login");

	passwordInput.addEventListener("input", () => {
		passwordInput.setCustomValidity("");
	});

	loginForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		try {
			const email = document.getElementById("email-login").value;
			const password = passwordInput.value;

			const result = await login(email, password);

			passwordInput.setCustomValidity("");

			if (result.success) {
				guestState.isGuest = false;
				window.location.href = "/home";
			}
		} catch (error) {
			if (error.status === 401) {
				passwordInput.setCustomValidity("Incorrect password");
				passwordInput.reportValidity();
			} else {
				console.error("Request failed:", error);
			}
		}
	});

	const confirmPassword = document.getElementById("password-register-confirm");
	confirmPassword.addEventListener("input", () => {
		if (
			confirmPassword.value ===
			document.getElementById("password-register").value
		) {
			confirmPassword.setCustomValidity("");
		} else {
			confirmPassword.setCustomValidity("Passwords do not match.");
		}
	});

	registerForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		if (!registerForm.checkValidity()) {
			registerForm.reportValidity();
			return;
		}

		try {
			const email = document.getElementById("email-register").value;
			const password = document.getElementById("password-register").value;

			const result = await register(email, password);

			if (result.success) {
				guestState.isGuest = false;
				window.location.href = "/home";
			}
		} catch (error) {
			console.error("Request failed:", error);
		}
	});
}

function init() {
	attachFormSwitchListeners();
	continueAsGuest();
	submission();
}

document.addEventListener("DOMContentLoaded", () => {
	init();
});
