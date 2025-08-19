/**
 * homePageEvents.js
 * Contains homepage events for going to 'Log' or 'Adjust' sections
 */
import { initLogPage } from "../dom/logPageUI";
import { initAdjustPage } from "../dom/adjustPageUI";
import { initMain } from "../dom/homeUI";

// Attaches event listeners for the two buttons in the homepage to go to their respective sections
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

export { attachSectionEventListeners, addReturnListener };
