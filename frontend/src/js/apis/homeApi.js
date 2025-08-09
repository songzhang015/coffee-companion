/**
 * homeApi.js
 * Handles the creation, deletion, and fetching of entries as API calls for the home page
 */

async function getServerEntries() {
	try {
		const response = await fetch("/api/entries");
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

export { getServerEntries };
