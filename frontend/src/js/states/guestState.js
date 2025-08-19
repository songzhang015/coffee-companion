/**
 * guestState.js
 * Helps determine if the user is a guest or signed into an account
 */
export const guestState = {
	get isGuest() {
		return localStorage.getItem("isGuest") === "true";
	},
	set isGuest(value) {
		localStorage.setItem("isGuest", value ? "true" : "false");
	},
};
