/**
 * logPageApi.js
 * API calls for the 'Log' portion of the homepage
 */
import { fetchEntries } from "../home";
import { guestState } from "../states/guestState.js";
import { initLogPage } from "../dom/logPageUI.js";

async function createNewEntry(
	title = "",
	date = "",
	roastLevel = "",
	coffeeAmount = "",
	waterTemp = "",
	waterAmount = "",
	grindSize = "",
	brewTime = "",
	notes = "",
	aroma = 3,
	texture = 3,
	flavor = 3,
	acidity = 3
) {
	const newEntry = {
		title,
		date,
		roastLevel,
		coffeeAmount,
		waterTemp,
		waterAmount,
		grindSize,
		brewTime,
		notes,
		aroma,
		texture,
		flavor,
		acidity,
	};

	if (guestState.isGuest === true) {
		try {
			const entries = await fetchEntries();
			newEntry.id = Date.now();
			entries.push(newEntry);
			localStorage.setItem("localEntries", JSON.stringify(entries));
		} catch (error) {
			console.error(error.message);
		}
	} else {
		try {
			const response = await fetch("/api/entries", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newEntry),
			});
			if (!response.ok) {
				throw new Error(`HTTP error: ${response.status}`);
			}

			const result = await response.json();
			if (!result.success) {
				throw new Error(`Backend error: ${result.message}`);
			}
		} catch (error) {
			console.error(error.message);
		}
	}
}

async function deleteEntry(entryToDelete) {
	if (guestState.isGuest === true) {
		try {
			let entries = await fetchEntries();
			entries = entries.filter((entry) => entry.id !== entryToDelete.id);
			localStorage.setItem("localEntries", JSON.stringify(entries));
			initLogPage();
		} catch (error) {
			console.error(error.message);
		}
	} else {
		try {
			const response = await fetch(`/api/entries/${entryToDelete.id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error(`Delete failed: ${response.status}`);
			}

			initLogPage();
		} catch (error) {
			console.error("Error deleting entry:", error);
		}
	}
}

export { createNewEntry, deleteEntry };
