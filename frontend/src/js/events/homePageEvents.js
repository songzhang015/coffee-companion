/**
 * homePageEvents.js
 * Contains homepage events for going to 'Log' or 'Adjust' sections
 */
import { initAdjustPage } from "../home";
import { initLogPage } from "../dom/logPageUI";

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
