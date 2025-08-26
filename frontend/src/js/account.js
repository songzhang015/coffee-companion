/* JS File for Coffee Companion App - Account Page */
import "../css/global.css";
import "../css/account.css";
import {
	attachFormSwitchListeners,
	attachGuestListeners,
	attachSubmissionListeners,
} from "./events/accountPageEvents.js";

function init() {
	attachFormSwitchListeners();
	attachGuestListeners();
	attachSubmissionListeners();
}

window.addEventListener("load", () => {
	const element = document.querySelector(".fade-in");
	element.classList.add("visible");
});

document.addEventListener("DOMContentLoaded", () => {
	init();
});
