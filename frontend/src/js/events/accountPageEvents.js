/**
 * accountPageEvents.js
 * Contains account page events for form switching, guest login, and submissions
 */
import { showRegister, showLogin, showError } from "../dom/accountFormUI";
import { guestState } from "../states/guestState";
import { login, register } from "../apis/accountAuthApi.js";
import { mergeGuestAndUser } from "../apis/homeApi.js";

let animating = false;

function attachFormSwitchListeners() {
	const loginBtn = document.querySelector(".switch-login-btn");
	const registerBtn = document.querySelector(".switch-register-btn");

	const buttonsWrapper = document.querySelector(".buttons-wrapper");

	const confirmPasswordInput = document.querySelector(
		".register-form .form-group:nth-child(3)"
	);
	if (registerBtn) {
		registerBtn.addEventListener("click", (e) => {
			e.preventDefault();

			document.querySelectorAll(".register-form input").forEach((input) => {
				input.value = "";
			});

			if (animating == false && !registerBtn.classList.contains("active")) {
				animating = true;

				buttonsWrapper.classList.remove("inactive");
				registerBtn.classList.add("active");
				loginBtn.classList.remove("active");
				confirmPasswordInput.style.display = "none";
				showRegister();

				setTimeout(() => {
					buttonsWrapper.classList.add("active");
				}, 50);
				setTimeout(() => {
					buttonsWrapper.classList.remove("active");
					confirmPasswordInput.style.display = "flex";
				}, 550);
				setTimeout(() => {
					confirmPasswordInput.classList.add("active");
				}, 600);

				setTimeout(() => {
					animating = false;
				}, 775);
			}
		});
	}

	if (loginBtn) {
		loginBtn.addEventListener("click", (e) => {
			e.preventDefault();
			if (animating == false && !loginBtn.classList.contains("active")) {
				animating = true;

				buttonsWrapper.classList.remove("active");
				confirmPasswordInput.classList.remove("active");

				registerBtn.classList.remove("active");
				loginBtn.classList.add("active");

				setTimeout(() => {
					buttonsWrapper.classList.add("inactive");
				}, 500);

				setTimeout(() => {
					showLogin();
				}, 1000);

				setTimeout(() => {
					animating = false;
				}, 1200);
			}
		});
	}
}

function attachGuestListeners() {
	const continueAsGuestBtn = document.querySelector(".header");

	continueAsGuestBtn.addEventListener("click", (e) => {
		e.preventDefault();
		window.location.href = "/home";
	});
}

function attachSubmissionListeners() {
	const loginForm = document.querySelector(".login-form");
	const registerForm = document.querySelector(".register-form");
	const passwordInput = document.getElementById("password-login");

	// Login Form
	loginForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		const email = document.getElementById("email-login").value;
		const password = passwordInput.value;

		if (email === "" || password === "") {
			showError("requiredFields");
			return;
		}
		if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
			showError("invalidEmail");
			return;
		}
		if (password.length < 6) {
			showError("incorrectLogin");
			return;
		}

		try {
			const result = await login(email, password);

			if (result.success) {
				guestState.isGuest = false;
				await mergeGuestAndUser();
				window.location.href = "/home";
			}
		} catch (error) {
			if (error.status === 400) {
				showError("requiredFields");
				return;
			} else if (error.status === 401) {
				showError("incorrectLogin");
				return;
			} else {
				showError("generalError");
				return;
			}
		}
	});

	// Register Form
	registerForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		const email = document.getElementById("email-register").value;
		const password = document.getElementById("password-register").value;
		const confirmPassword = document.getElementById(
			"password-register-confirm"
		).value;

		if (email === "" || password === "" || confirmPassword === "") {
			showError("requiredFields");
			return;
		}
		if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
			showError("invalidEmail");
			return;
		}
		if (password.length < 6) {
			showError("shortPassword");
			return;
		}
		if (password !== confirmPassword) {
			showError("unmatchedPassword");
			return;
		}

		try {
			const result = await register(email, password);

			if (result.success) {
				guestState.isGuest = false;
				await mergeGuestAndUser();
				window.location.href = "/home";
			}
		} catch (error) {
			if (error.status === 409) {
				showError("emailInUse");
				return;
			} else {
				showError("generalError");
				return;
			}
		}
	});
}

export {
	attachFormSwitchListeners,
	attachGuestListeners,
	attachSubmissionListeners,
};
