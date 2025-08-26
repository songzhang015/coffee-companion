/**
 * accountPageEvents.js
 * Contains account page events for form switching, guest login, and submissions
 */
import { showRegister, showLogin } from "../dom/accountFormUI";
import { guestState } from "../states/guestState";
import { login, register } from "../apis/accountAuthApi.js";

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
