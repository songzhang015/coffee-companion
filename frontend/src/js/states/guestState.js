export const guestState = {
	get isGuest() {
		return localStorage.getItem("isGuest") === "true";
	},
	set isGuest(value) {
		localStorage.setItem("isGuest", value ? "true" : "false");
	},
};
