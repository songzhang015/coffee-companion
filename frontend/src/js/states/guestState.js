/**
 * guestState.js
 * Helps determine if the user is a guest or signed into an account
 */
export const guestState = {
	get isGuest() {
		const value = localStorage.getItem("isGuest");
		return value === null ? true : value === "true";
	},
	set isGuest(value) {
		localStorage.setItem("isGuest", value ? "true" : "false");
	},

	get seenPopup() {
		const value = localStorage.getItem("seenPopup");
		return value === "true";
	},
	set seenPopup(value) {
		localStorage.setItem("seenPopup", value ? "true" : "false");
	},
};
