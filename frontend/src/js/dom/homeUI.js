/**
 * homeUI.js
 * DOM content for the main homepage excluding the two sections
 */
import { attachSectionEventListeners } from "../events/homePageEvents";
import logIcon from "../../assets/icons/log.svg";
import adjustIcon from "../../assets/icons/adjust.svg";

// Initializes the homepage by creating containers and the sections
function initMain() {
	document.body.innerHTML = "";
	const mainContainer = document.createElement("div");
	mainContainer.classList.add("main-container");
	mainContainer.style.display = "none";

	// Create and append both sections
	const logSection = createSection("log-container", logIcon, "Log");
	const adjustSection = createSection("adjust-container", adjustIcon, "Adjust");

	mainContainer.appendChild(logSection);
	mainContainer.appendChild(adjustSection);
	document.body.appendChild(mainContainer);
	attachSectionEventListeners();
	mainContainer.style.display = "";
}

// Creates the 'Log' and 'Adjust' icons and text
function createSection(className, iconSrc, labelText) {
	const container = document.createElement("div");
	container.classList.add(className);

	const iconContainer = document.createElement("div");
	iconContainer.classList.add("icon-container");

	const img = document.createElement("img");
	img.classList.add("icon");
	img.src = iconSrc;
	img.alt = labelText;

	iconContainer.appendChild(img);

	const label = document.createElement("a");
	label.classList.add("label");
	label.textContent = labelText;

	container.appendChild(iconContainer);
	container.appendChild(label);

	return container;
}

export { initMain };
