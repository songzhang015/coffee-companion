/**
 * homePageEvents.js
 * Contains homepage events for going to 'Log' or 'Adjust' sections
 */
import { initLogPage } from "../dom/logPageUI";
import { initAdjustPage } from "../dom/adjustPageUI";
import { initMain } from "../dom/homeUI";
import { guestState } from "../states/guestState";

// Attaches event listeners for the main two buttons in the homepage to go to their respective sections
function attachSectionEventListeners() {
	const logSection = document.querySelector(".log-container .icon-container");
	const adjustSection = document.querySelector(
		".adjust-container .icon-container"
	);

	logSection.addEventListener("click", () => {
		initLogPage();
	});

	adjustSection.addEventListener("click", () => {
		initAdjustPage();
	});
}

// Return button to go to main
function addReturnListener(btn) {
	btn.addEventListener("click", () => {
		initMain();
	});
}

// Attaches event listeners for the signup button in the homepage
function attachSignupBtnListeners(btn) {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		window.location.href = "/account";
	});
}

// Attaches event listeners for the logout button in the homepage
function attachLogoutBtnListeners(btn) {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		localStorage.clear();
		guestState.isGuest = true;
		window.location.href = "/";
	});
}

export {
	attachSectionEventListeners,
	addReturnListener,
	attachSignupBtnListeners,
	attachLogoutBtnListeners,
};
