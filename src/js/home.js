/* JS File for Coffee Companion App - Home Page */
import "../css/global.css";
import "../css/home.css";
import logIcon from "../assets/icons/log.svg";
import adjustIcon from "../assets/icons/adjust.svg";

import { attachEventListeners } from "./navigation";

function initMain() {
	const mainContainer = document.createElement("div");
	mainContainer.classList.add("main-container");

	// Helper to create a section (log and adjust)
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

	// Create and append both sections
	const logSection = createSection("log-container", logIcon, "Log");
	const adjustSection = createSection("adjust-container", adjustIcon, "Adjust");

	mainContainer.appendChild(logSection);
	mainContainer.appendChild(adjustSection);
	document.body.appendChild(mainContainer);
	attachEventListeners();
}

function initLogPage() {
	document.body.innerHTML = "";

	const mainContainer = document.createElement("div");
	mainContainer.classList.add("main-container-log");

	const entryForm = document.createElement("div");
	entryForm.classList.add("entry-form");

	const recentEntriesTitle = document.createElement("h1");
	recentEntriesTitle.textContent = "Recent Entries";
	entryForm.appendChild(recentEntriesTitle);

	const returnButton = document.createElement("button");
	returnButton.textContent = "<-- Return";
	entryForm.appendChild(returnButton);

	const entriesContainer = document.createElement("div");
	entriesContainer.classList.add("entries-container");
	entryForm.appendChild(entriesContainer);

	// FACTOR OUT INTO NEW FUNCTION
	const exampleEntryContainer = document.createElement("div");
	exampleEntryContainer.classList.add("entry-container");
	entriesContainer.appendChild(exampleEntryContainer);

	const exampleEntryContainer2 = document.createElement("div");
	exampleEntryContainer2.classList.add("entry-container");
	entriesContainer.appendChild(exampleEntryContainer2);

	mainContainer.appendChild(entryForm);
	document.body.appendChild(mainContainer);
}

function initAdjustPage() {
	alert("Adjust section clicked!");
}

document.addEventListener("DOMContentLoaded", () => {
	initMain();
	initLogPage();
});

export { initLogPage, initAdjustPage };
