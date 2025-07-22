/* JS File for Coffee Companion App - Account Page */
import "../css/global.css";
import "../css/account.css";

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
	document
		.querySelector(".switch-register-btn")
		.addEventListener("click", (e) => {
			e.preventDefault();
			showRegister();
		});

	document.querySelector(".switch-login-btn").addEventListener("click", (e) => {
		e.preventDefault();
		showLogin();
	});
}

function confirmPasswordValidation() {
	const password = document.getElementById("password-register");
	const confirmPassword = document.getElementById("password-register-confirm");

	function validatePasswordMatch() {
		if (password.value !== confirmPassword.value) {
			confirmPassword.setCustomValidity("Passwords do not match.");
		} else {
			confirmPassword.setCustomValidity("");
		}
	}

	registerForm.addEventListener("submit", function (e) {
		validatePasswordMatch();

		if (!confirmPassword.checkValidity()) {
			e.preventDefault();
		}
	});
}

function continueAsGuest() {
	const continueButton = document.querySelector(".guest");
	continueButton.addEventListener("click", () => {
		window.location.href = "/home";
	});
}

function submission() {
	loginForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		// Sends info to login API, which returns into response and parsed into result
		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: document.getElementById("email-login").value,
					password: document.getElementById("password-login").value,
				}),
			});
			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.message);
			}

			if (result.success) {
				window.location.href = "/home";
			}
		} catch (e) {
			console.error("Request failed:", e);
		}
	});
}

function init() {
	attachFormSwitchListeners();
	confirmPasswordValidation();
	continueAsGuest();
	submission();
}

init();
