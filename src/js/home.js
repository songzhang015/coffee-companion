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
	attachSectionEventListeners();
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
	recentEntriesTitle.classList.add("entries-title");
	recentEntriesTitle.textContent = "Recent Entries";
	entriesHeader.appendChild(recentEntriesTitle);

	const returnButton = document.createElement("button");
	returnButton.textContent = "<-- Return";
	returnButton.addEventListener("click", () => {
		initMain();
	});
	entriesHeader.appendChild(returnButton);

	const divider = document.createElement("div");
	divider.classList.add("divider");

	entryForm.appendChild(entriesHeader);
	entryForm.appendChild(divider);

	const entriesContainer = document.createElement("div");
	entriesContainer.classList.add("entries-container");
	entryForm.appendChild(entriesContainer);

	mainContainer.appendChild(entryForm);
	document.body.appendChild(mainContainer);

	addEntryToPage("Googa Coffee", "25/01/15");
	addEntryToPage("Goomba Coffee", "25/01/16");
	addEntryToPage("Goota Coffee", "25/01/17");

	const newEntryButton = document.createElement("button");
	newEntryButton.classList.add("add-entries-button");
	newEntryButton.textContent = "New Entry";
	entryForm.appendChild(newEntryButton);
	newEntryButton.addEventListener("click", () => {
		initNewEntryPage();
	});
}

function initNewEntryPage() {
	const entryForm = document.querySelector(".entry-form");

	const entriesContainer = document.querySelector(".entries-container");
	entriesContainer.innerHTML = "";

	let oldButton = document.querySelector(".add-entries-button");
	oldButton.remove();

	const title = document.querySelector(".entries-title");
	title.textContent = "New Entry";

	const entryContainerName = document.createElement("div");
	entryContainerName.classList.add("new-entry-container");

	const entryContainerDate = document.createElement("div");
	entryContainerDate.classList.add("new-entry-container");

	const entryTitleName = document.createElement("h2");
	entryTitleName.textContent = "Entry / Coffee Title";
	const entryInputName = document.createElement("input");
	entryInputName.classList.add("entry-input");
	entryInputName.placeholder = "e.g. Columbian";

	const entryTitleDate = document.createElement("h2");
	entryTitleDate.textContent = "Date";
	const entryInputDate = document.createElement("input");
	entryInputDate.classList.add("entry-input");
	entryInputDate.placeholder = "e.g. 2004-09-18";

	entryContainerName.append(entryTitleName);
	entryContainerName.append(entryInputName);
	entryContainerDate.append(entryTitleDate);
	entryContainerDate.append(entryInputDate);
	entriesContainer.append(entryContainerName);
	entriesContainer.append(entryContainerDate);

	const newEntryButton = document.createElement("button");
	newEntryButton.classList.add("add-entries-button");
	newEntryButton.textContent = "Add Journal Entry";
	entryForm.appendChild(newEntryButton);
	newEntryButton.addEventListener("click", () => {
		initLogPage();
	});

	const cancelNewEntryButton = document.createElement("button");
	cancelNewEntryButton.classList.add("add-entries-button");
	cancelNewEntryButton.textContent = "Cancel";
	entryForm.appendChild(cancelNewEntryButton);
	cancelNewEntryButton.addEventListener("click", () => {
		initLogPage();
	});
}

function addEntryToPage(title, date) {
	const container = document.querySelector(".entries-container");

	const entryContainer = document.createElement("div");
	entryContainer.classList.add("entry-container");

	const entryTitle = document.createElement("h2");
	entryTitle.textContent = title;

	const entryDate = document.createElement("h2");
	entryDate.textContent = date;

	entryContainer.appendChild(entryTitle);
	entryContainer.appendChild(entryDate);

	container.appendChild(entryContainer);
}

function initAdjustPage() {
	alert("Adjust section clicked!");
}

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

document.addEventListener("DOMContentLoaded", () => {
	initMain();
	setTimeout(initLogPage, 10);
});

export { initLogPage, initAdjustPage };
