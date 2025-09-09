/**
 * homeApi.js
 * Handles the creation, deletion, and fetching of entries as API calls for the home page
 */
import { getLocalEntries } from "../utils/storage.js";

async function getServerEntries() {
	try {
		const response = await fetch("http://localhost:5000/api/entries", {
			credentials: "include",
		});
		if (!response.ok) {
			throw new Error(`HTTP error: ${response.status}`);
		}
		const result = await response.json();
		if (!result.success) {
			throw new Error(`Backend error: ${result.message}`);
		}
		return result.entries;
	} catch (error) {
		console.error(error.message);
		return [];
	}
}

async function mergeGuestAndUser() {
	const guestEntries = getLocalEntries();
	if (!guestEntries.length) return;

	for (const entry of guestEntries) {
		const { id, ...entryData } = entry; // Remove local ID
		await fetch("http://localhost:5000/api/entries", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(entryData),
			credentials: "include",
		});
	}
}

export { getServerEntries, mergeGuestAndUser };
