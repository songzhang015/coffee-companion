/* JS File for Coffee Companion App - Home Page */
import "../css/global.css";
import "../css/home.css";
import { guestState } from "./states/guestState.js";
import { getLocalEntries } from "./utils/storage";
import { getServerEntries } from "./apis/homeApi";
import { initMain } from "./dom/homeUI";

import { initLogPage } from "./dom/logPageUI.js";

async function fetchEntries() {
	return guestState.isGuest ? getLocalEntries() : await getServerEntries();
}

document.addEventListener("DOMContentLoaded", () => {
	initMain();

	setTimeout(() => {
		initLogPage();
	}, 10);
});

export { fetchEntries };
