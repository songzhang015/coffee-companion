/**
 * logPageEvents.js
 * Contains log page events for the 'Log' section of the homepage
 */
import { initMain } from "../dom/homeUI";
import { initNewEntryPage } from "../home";

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

export { addReturnListener, addNewEntryListener };
