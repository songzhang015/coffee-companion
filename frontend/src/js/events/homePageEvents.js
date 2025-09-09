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
		const popupStatus = localStorage.getItem("seenPopup");
		localStorage.clear();
		if (popupStatus !== null) {
			localStorage.setItem("seenPopup", popupStatus);
		}
		guestState.isGuest = true;
		window.location.href = "/";
	});
}

// Attaches event listeners for continue button in popup of homepage
function attachContinueBtnListeners(btn) {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		const overlay = document.querySelector(".screen-overlay");
		const container = document.querySelector(".popup-container");
		if (overlay) overlay.remove();
		if (container) container.remove();
	});
}

export {
	attachSectionEventListeners,
	addReturnListener,
	attachSignupBtnListeners,
	attachLogoutBtnListeners,
	attachContinueBtnListeners,
};
