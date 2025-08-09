/**
 * homePageEvents.js
 * Contains homepage events for going to 'Log' or 'Adjust' sections
 */
import { initLogPage, initAdjustPage } from "../home";

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

export { attachSectionEventListeners };
