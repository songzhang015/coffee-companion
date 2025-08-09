/**
 * storage.js
 * Handles localStorage for the homepage
 */

function getLocalEntries() {
	try {
		const entriesJSON = localStorage.getItem("localEntries");
		return entriesJSON ? JSON.parse(entriesJSON) : [];
	} catch (error) {
		console.error(error.message);
		return [];
	}
}

export { getLocalEntries };
