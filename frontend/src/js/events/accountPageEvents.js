/**
 * accountPageEvents.js
 * Contains account page events for form switching, guest login, and submissions
 */

import { showRegister, showLogin } from "../dom/accountFormUI";
import { guestState } from "../states/guestState";
import { login, register } from "../apis/accountAuthApi.js";

function attachFormSwitchListeners() {
	const loginBtn = document.querySelector(".switch-login-btn");
	const registerBtn = document.querySelector(".switch-register-btn");

	if (registerBtn) {
		registerBtn.addEventListener("click", (e) => {
			e.preventDefault();
			showRegister();
		});
	}

	if (loginBtn) {
		loginBtn.addEventListener("click", (e) => {
			e.preventDefault();
			showLogin();
		});
	}
}

function attachGuestListeners() {
	const continueAsGuestBtn = document.querySelector(".guest");

	continueAsGuestBtn.addEventListener("click", (e) => {
		e.preventDefault();
		guestState.isGuest = true;
		window.location.href = "/home";
	});
}

function attachSubmissionListeners() {
	const loginForm = document.querySelector(".login-form");
	const registerForm = document.querySelector(".register-form");
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

export {
	attachFormSwitchListeners,
	attachGuestListeners,
	attachSubmissionListeners,
};
