/**
 * logPageEvents.js
 * Contains log page events for the 'Log' section of the homepage
 */
import {
	initLogPage,
	initNewEntryPage,
	viewEntry,
	createCriteriaModal,
} from "../dom/logPageUI";
import { createNewEntry, deleteEntry } from "../apis/logPageApi";

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
			return element.value !== undefined ? element.value : element.textContent;
		};
		await createNewEntry(
			getValue("title"),
			getValue("date"),
			getValue("roastLevel"),
			getValue("roastDate"),
			getValue("coffeeAmount"),
			getValue("waterAmount"),
			getValue("brewMethod"),
			getValue("brewTime"),
			getValue("waterTemp"),
			getValue("grindSize"),
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

// Allows criteria quadrants to be clicked
function addQuadrantListener(form, quadrantElement, name) {
	quadrantElement.addEventListener("click", () =>
		createCriteriaModal(form, quadrantElement, name)
	);
}

// When overlay is clicked, get rid of modal + overlay
function addOverlayListener(modal, overlay) {
	overlay.addEventListener("click", () => {
		modal.classList.add("closing");
		overlay.classList.add("closing");

		setTimeout(() => {
			modal.remove();
			overlay.remove();
		}, 300);
	});
}

// Allows the scale selectors (1-5) to be clicked
function addScaleSelectionListeners(criteria, scale, scaleElement) {
	scaleElement.addEventListener("click", () => {
		let valueElement = document.querySelector(`.${criteria}`);
		valueElement.textContent = scaleElement.textContent;
		for (let child of scale.children) {
			if (child === scaleElement) {
				child.classList.add("active");
			} else {
				child.classList.remove("active");
			}
		}
	});
}

export {
	addNewEntryListener,
	submitNewEntryListener,
	deleteEntryListener,
	viewEntryListener,
	cancelNewEntryListener,
	addQuadrantListener,
	addOverlayListener,
	addScaleSelectionListeners,
};
