/* JS File for Coffee Companion App - Home Page */
import "../css/global.css";
import "../css/home.css";
import logIcon from "../assets/icons/log.svg";
import adjustIcon from "../assets/icons/adjust.svg";

function initMain() {
	document.body.innerHTML = "";
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

	// Main, white container
	const mainContainer = document.createElement("div");
	mainContainer.classList.add("main-container-log");

	// Main form, yellow container
	const entryForm = document.createElement("div");
	entryForm.classList.add("entry-form");

	const entriesHeader = document.createElement("div");
	entriesHeader.classList.add("entries-header");

	const recentEntriesTitle = document.createElement("h1");
	recentEntriesTitle.textContent = "Recent Entries";
	entriesHeader.appendChild(recentEntriesTitle);

	const returnButton = document.createElement("button");
	returnButton.textContent = "<-- Return";
	returnButton.addEventListener("click", () => {
		initMain();
	});
	entriesHeader.appendChild(returnButton);

	entryForm.appendChild(entriesHeader);

	const entriesContainer = document.createElement("div");
	entriesContainer.classList.add("entries-container");
	entryForm.appendChild(entriesContainer);

	// FACTOR OUT INTO NEW FUNCTION
	const exampleEntryContainer = document.createElement("div");
	exampleEntryContainer.classList.add("entry-container");
	entriesContainer.appendChild(exampleEntryContainer);

	// FACTOR OUT INTO NEW FUNCTION
	const exampleEntryContainer2 = document.createElement("div");
	exampleEntryContainer2.classList.add("entry-container");
	entriesContainer.appendChild(exampleEntryContainer2);

	mainContainer.appendChild(entryForm);
	document.body.appendChild(mainContainer);
}

function initAdjustPage() {
	alert("Adjust section clicked!");
}

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

document.addEventListener("DOMContentLoaded", () => {
	initMain();
	setTimeout(initLogPage, 10);
});

export { initLogPage, initAdjustPage };
