/**
 * logPageEvents.js
 * Contains log page events for the 'Log' section of the homepage
 */
import { initMain } from "../dom/homeUI";
import { initLogPage, initNewEntryPage, viewEntry } from "../dom/logPageUI";
import { createNewEntry, deleteEntry } from "../apis/logPageApi";

// Return button to go to main
function addReturnListener(btn) {
	btn.addEventListener("click", () => {
		initMain();
	});
}

// New Entry button in log page
function addNewEntryListener(btn) {
	btn.addEventListener("click", () => {
		initNewEntryPage();
	});
}

// Submit entry when making a new entry
function submitNewEntryListener(form) {
	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		const getValue = (className) => {
			const element = document.querySelector(`.${className}`);
			return element ? element.value : "";
		};
		await createNewEntry(
			getValue("title"),
			getValue("date"),
			getValue("roastLevel"),
			getValue("coffeeAmount"),
			getValue("waterTemp"),
			getValue("waterAmount"),
			getValue("grindSize"),
			getValue("brewTime"),
			getValue("notes"),
			getValue("aroma"),
			getValue("texture"),
			getValue("flavor"),
			getValue("acidity")
		);
		initLogPage();
	});
}

// Cancel entry when making a new entry
function cancelNewEntryListener(btn) {
	btn.addEventListener("click", () => {
		initLogPage();
	});
}

// Delete entry in main log page
function deleteEntryListener(entry, btn) {
	btn.addEventListener("click", (e) => {
		e.stopPropagation();
		deleteEntry(entry);
	});
}

// View the actual entry when clicked
function viewEntryListener(entry, btn) {
	btn.addEventListener("click", () => {
		viewEntry(entry);
	});
}

export {
	addReturnListener,
	addNewEntryListener,
	submitNewEntryListener,
	deleteEntryListener,
	viewEntryListener,
	cancelNewEntryListener,
};
