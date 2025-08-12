/**
 * logPageEvents.js
 * Contains log page events for the 'Log' section of the homepage
 */
import { initMain } from "../dom/homeUI";
import { initLogPage, initNewEntryPage } from "../dom/logPageUI";
import { createNewEntry } from "../apis/logPageApi";

function addReturnListener(btn) {
	btn.addEventListener("click", () => {
		initMain();
	});
}

function addNewEntryListener(btn) {
	btn.addEventListener("click", () => {
		initNewEntryPage();
	});
}

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

export { addReturnListener, addNewEntryListener, submitNewEntryListener };
