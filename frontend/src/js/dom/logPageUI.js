/**
 * logPageUI.js
 * DOM content for the log portion of the homepage
 */
import {
	addReturnListener,
	addNewEntryListener,
	submitNewEntryListener,
	deleteEntryListener,
	viewEntryListener,
	cancelNewEntryListener,
} from "../events/logPageEvents";
import { fetchEntries } from "../home";
import { optionalFields, fieldNames } from "../constants/constants.js";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Initializes the log page when user clicks on the 'Log' section in the homepage
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
	returnButton.classList.add("return-button");
	returnButton.textContent = "← Go Back";
	addReturnListener(returnButton);
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

	fetchEntries().then((fetchedEntries) => {
		fetchedEntries.forEach((entry) => {
			addEntryToPage(entry);
		});
	});

	const newEntryButton = document.createElement("button");
	newEntryButton.classList.add("add-entries-button");
	newEntryButton.textContent = "New Entry";
	entryForm.appendChild(newEntryButton);
	addNewEntryListener(newEntryButton);
}

// Initializes the new entry page when the user hits "New Entry" in the log page
function initNewEntryPage() {
	const entriesContainer = document.querySelector(".entries-container");
	entriesContainer.innerHTML = "";

	let oldButton = document.querySelector(".add-entries-button");
	if (oldButton) oldButton.remove();

	let returnButton = document.querySelector(".return-button");
	if (returnButton) returnButton.remove();

	const newForm = document.createElement("form");
	entriesContainer.replaceWith(newForm);
	newForm.appendChild(entriesContainer);

	const title = document.querySelector(".entries-title");
	title.textContent = "New Entry";

	let row = document.createElement("div");
	row.classList.add("entry-row");
	entriesContainer.appendChild(row);
	addNewField(row, "Entry Title:", "e.g. Columbian", "title");
	addNewField(row, "Date:", "e.g. 01/20/2025", "date");

	let colCount = 0;
	let currentRow = null;

	for (const key in optionalFields) {
		if (key === "notes") continue;

		if (colCount === 0) {
			currentRow = document.createElement("div");
			currentRow.classList.add("entry-row");
			entriesContainer.appendChild(currentRow);
		}

		const [label, placeholder] = optionalFields[key];
		addNewField(currentRow, label, placeholder, key);

		colCount++;

		if (colCount === 2) {
			colCount = 0;
			currentRow = null;
		}
	}

	const notesRow = document.createElement("div");
	notesRow.classList.add("entry-row");
	entriesContainer.appendChild(notesRow);
	addNewField(
		notesRow,
		optionalFields.notes[0],
		optionalFields.notes[1],
		"notes",
		true
	);

	row = document.createElement("div");
	row.classList.add("entry-row");
	entriesContainer.appendChild(row);
	addSliderField(row, "Aroma", "aroma");
	addSliderField(row, "Texture", "texture");

	row = document.createElement("div");
	row.classList.add("entry-row");
	entriesContainer.appendChild(row);
	addSliderField(row, "Flavor", "flavor");
	addSliderField(row, "Acidity", "acidity");

	const newEntryButton = document.createElement("button");
	newEntryButton.type = "submit";
	newEntryButton.classList.add("add-entries-button");
	newEntryButton.textContent = "Add Journal Entry";
	newForm.appendChild(newEntryButton);

	document.querySelector(".title").required = true;
	document.querySelector(".date").required = true;

	submitNewEntryListener(newForm);

	const header = document.querySelector(".entries-header");

	const cancelNewEntryButton = document.createElement("button");
	cancelNewEntryButton.classList.add("cancel-entries-button");
	cancelNewEntryButton.textContent = "×";
	header.append(cancelNewEntryButton);
	cancelNewEntryButton.addEventListener("click", () => {
		initLogPage();
	});
}

// Helper function for initNewEntryPage to add a field in new entry
function addNewField(row, title, placeholder, cls, fullWidth = false) {
	const entryContainer = document.createElement("div");
	entryContainer.classList.add("new-entry-container");
	if (fullWidth) {
		entryContainer.classList.add("full-width");
	}

	const entryTitle = document.createElement("h2");
	entryTitle.classList.add("entry-title");
	entryTitle.textContent = title;

	let entryInput;
	if (cls === "notes") {
		entryInput = document.createElement("textarea");
		entryInput.rows = 5;
	} else {
		entryInput = document.createElement("input");
		entryInput.maxLength = 80;
	}

	entryInput.classList.add("entry-input", cls);
	entryInput.placeholder = placeholder;

	entryContainer.append(entryTitle, entryInput);
	row.appendChild(entryContainer);

	if (cls === "date") {
		flatpickr(entryInput, {
			dateFormat: "m/d/Y",
			allowInput: true,
			maxDate: "today",
		});
	}
}

// Helper function for initNewEntryPage to add a slider in new entry
function addSliderField(row, title, cls) {
	const entryContainer = document.createElement("div");
	entryContainer.classList.add("new-entry-container");

	const entryTitle = document.createElement("h2");
	entryTitle.classList.add("entry-title");
	entryTitle.textContent = title;

	const sliderInput = document.createElement("input");
	sliderInput.classList.add("entry-slider", cls);
	sliderInput.type = "range";
	sliderInput.min = "1";
	sliderInput.max = "5";
	sliderInput.step = "1";
	sliderInput.value = "3";

	const valueDisplay = document.createElement("span");
	valueDisplay.classList.add("slider-value");
	valueDisplay.textContent = sliderInput.value;

	sliderInput.addEventListener("input", () => {
		valueDisplay.textContent = sliderInput.value;
	});

	entryContainer.append(entryTitle, sliderInput, valueDisplay);
	row.appendChild(entryContainer);
}

// Adding entries to the main log page in recent entries
function addEntryToPage(entry) {
	const container = document.querySelector(".entries-container");

	const entryContainer = document.createElement("div");
	entryContainer.classList.add("entry-container");

	const entryTitle = document.createElement("h2");
	entryTitle.textContent = entry.title;

	const entryDate = document.createElement("h2");
	entryDate.textContent = entry.date;

	const deleteButton = document.createElement("button");
	deleteButton.classList.add("delete-entry-button");
	deleteButton.textContent = "×";

	entryContainer.addEventListener("mouseenter", () => {
		deleteButton.style.opacity = "1";
	});

	entryContainer.addEventListener("mouseleave", () => {
		deleteButton.style.opacity = "0";
	});

	deleteButton.addEventListener("mouseenter", () => {
		deleteButton.style.opacity = "1";
	});

	deleteButton.addEventListener("mouseleave", () => {
		deleteButton.style.opacity = "0";
	});

	deleteEntryListener(entry, deleteButton);

	entryContainer.append(entryTitle);
	entryContainer.append(entryDate);
	entryContainer.append(deleteButton);

	container.append(entryContainer);
	viewEntryListener(entry, entryContainer);
}

// View a single entry in log page
function viewEntry(entry) {
	const entryForm = document.querySelector(".entry-form");
	const entriesContainer = document.querySelector(".entries-container");
	entriesContainer.innerHTML = "";

	let oldButton = document.querySelector(".add-entries-button");
	oldButton.remove();

	let returnButton = document.querySelector(".return-button");
	returnButton.remove();

	const title = document.querySelector(".entries-title");
	title.textContent = entry.title;

	let currentRow = null;
	let fieldCount = 0;

	for (const field in fieldNames) {
		if (field !== "title" && field !== "user") {
			const fieldValue = entry[field];
			if (fieldValue !== "") {
				if (!currentRow || fieldCount % 2 === 0) {
					currentRow = document.createElement("div");
					currentRow.classList.add("entry-row");
					entriesContainer.appendChild(currentRow);
				}
				const fieldContainer = viewEntryAddField(entry, field);
				currentRow.appendChild(fieldContainer);
				fieldCount++;
			}
		}
	}

	const cancelNewEntryButton = document.createElement("button");
	cancelNewEntryButton.classList.add("add-entries-button");
	cancelNewEntryButton.textContent = "Back to Entries";
	entryForm.append(cancelNewEntryButton);
	cancelNewEntryListener(cancelNewEntryButton);
}

// Helper function for viewEntry
function viewEntryAddField(entry, field) {
	const container = document.createElement("div");
	container.classList.add("view-entry-container");

	const title = document.createElement("h2");
	title.textContent = fieldNames[field];

	const body = document.createElement("p");
	body.textContent = entry[field];

	container.append(title, body);
	return container;
}

export { initLogPage, initNewEntryPage, viewEntry };
