/* Navigation File for Coffee Companion App to traverse between logging and adjusting brews for homescreen */
import { initLogPage } from "./home.js";
import { initAdjustPage } from "./home.js";

function attachEventListeners() {
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

export { attachEventListeners };
