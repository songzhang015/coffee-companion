/**
 * logPageUI.js
 * DOM content for the log portion of the homepage
 */
import {
	addNewEntryListener,
	submitNewEntryListener,
	deleteEntryListener,
	viewEntryListener,
	cancelNewEntryListener,
	addQuadrantListener,
	addOverlayListener,
	addScaleSelectionListeners,
} from "../events/logPageEvents";
import { addReturnListener } from "../events/homePageEvents.js";
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
		"notes"
	);

	createEvaulationFields(newForm);

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
function addNewField(row, title, placeholder, cls) {
	const entryContainer = document.createElement("div");
	entryContainer.classList.add("new-entry-container");

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

	if (cls === "date" || cls === "roastDate") {
		flatpickr(entryInput, {
			dateFormat: "m/d/Y",
			allowInput: true,
			maxDate: "today",
		});
	}
}

// Creates the circular UI for Aroma, Texture, Flavor, and Acidity
function createEvaulationFields(form) {
	const circle = document.createElement("div");
	circle.classList.add("circle");

	const verticalLine = document.createElement("div");
	verticalLine.classList.add("line", "vertical");

	const horizontalLine = document.createElement("div");
	horizontalLine.classList.add("line", "horizontal");

	circle.append(verticalLine, horizontalLine);

	const aromaQuadrant = document.createElement("div");
	aromaQuadrant.classList.add("quadrant", "top-left");
	const aromaLabel = document.createElement("p");
	aromaLabel.classList.add("label");
	aromaLabel.textContent = "Aroma";
	const aromaScore = document.createElement("p");
	aromaScore.classList.add("score", "aroma");
	aromaScore.textContent = "3";
	aromaQuadrant.append(aromaLabel, aromaScore);

	const textureQuadrant = document.createElement("div");
	textureQuadrant.classList.add("quadrant", "top-right");
	const textureLabel = document.createElement("p");
	textureLabel.classList.add("label");
	textureLabel.textContent = "Texture";
	const textureScore = document.createElement("p");
	textureScore.classList.add("score", "texture");
	textureScore.textContent = "3";
	textureQuadrant.append(textureLabel, textureScore);

	const flavorQuadrant = document.createElement("div");
	flavorQuadrant.classList.add("quadrant", "bottom-left");
	const flavorLabel = document.createElement("p");
	flavorLabel.classList.add("label");
	flavorLabel.textContent = "Flavor";
	const flavorScore = document.createElement("p");
	flavorScore.classList.add("score", "flavor");
	flavorScore.textContent = "3";
	flavorQuadrant.append(flavorLabel, flavorScore);

	const acidityQuadrant = document.createElement("div");
	acidityQuadrant.classList.add("quadrant", "bottom-right");
	const acidityLabel = document.createElement("p");
	acidityLabel.classList.add("label");
	acidityLabel.textContent = "Acidity";
	const acidityScore = document.createElement("p");
	acidityScore.classList.add("score", "acidity");
	acidityScore.textContent = "3";
	acidityQuadrant.append(acidityLabel, acidityScore);

	circle.append(
		aromaQuadrant,
		textureQuadrant,
		flavorQuadrant,
		acidityQuadrant
	);

	form.append(circle);

	addQuadrantListener(form, aromaQuadrant, "aroma");
	addQuadrantListener(form, textureQuadrant, "texture");
	addQuadrantListener(form, flavorQuadrant, "flavor");
	addQuadrantListener(form, acidityQuadrant, "acidity");
}

function createCriteriaModal(form, quadrantElement, criteria) {
	const modalOverlay = document.createElement("div");
	modalOverlay.classList.add("modal-overlay");

	const modalContainer = document.createElement("div");
	modalContainer.classList.add("modal-container");

	addOverlayListener(modalContainer, modalOverlay);

	const header = document.createElement("h1");
	const subheader = document.createElement("h2");
	switch (criteria) {
		case "aroma":
			header.textContent = "Aroma";
			subheader.textContent =
				"The smell, such as floral, nutty, or burnt aromas.";
			break;
		case "texture":
			header.textContent = "Texture";
			subheader.textContent =
				"The mouthfeel or body, such as a rich and creamy texture or thin like tea.";
			break;
		case "flavor":
			header.textContent = "Flavor";
			subheader.textContent =
				"The taste profile, such as sweetness and distinct flavor notes like chocolate.";
			break;
		case "acidity":
			header.textContent = "Acidity";
			subheader.textContent =
				"The brightness, such as the enjoyable or unpleasant bitterness/sourness.";
			break;
	}

	const scale = document.createElement("div");
	scale.classList.add("criteria-scale");

	const scaleOne = document.createElement("p");
	scaleOne.classList.add("scale-element");
	scaleOne.textContent = "1";
	const scaleTwo = document.createElement("p");
	scaleTwo.classList.add("scale-element");
	scaleTwo.textContent = "2";
	const scaleThree = document.createElement("p");
	scaleThree.classList.add("scale-element");
	scaleThree.textContent = "3";
	const scaleFour = document.createElement("p");
	scaleFour.classList.add("scale-element");
	scaleFour.textContent = "4";
	const scaleFive = document.createElement("p");
	scaleFive.classList.add("scale-element");
	scaleFive.textContent = "5";

	scale.append(scaleOne, scaleTwo, scaleThree, scaleFour, scaleFive);

	for (const scaleElement of scale.children) {
		const currentScore = document.querySelector(`.${criteria}`).textContent;
		if (scaleElement.textContent === currentScore) {
			scaleElement.classList.add("active");
		} else {
			scaleElement.classList.remove("active");
		}
		addScaleSelectionListeners(criteria, scale, scaleElement);
	}

	const scaleNote = document.createElement("p");
	scaleNote.classList.add("scale-note");
	scaleNote.textContent = `Note: Rate the ${criteria} based on enjoyability as opposed to the amount of ${criteria}.`;

	modalContainer.append(header, subheader, scale, scaleNote);
	form.append(modalOverlay, modalContainer);
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

export { initLogPage, initNewEntryPage, viewEntry, createCriteriaModal };
