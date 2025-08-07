/* JS File for Coffee Companion App - Index Page */
import "../css/global.css";
import "../css/index.css";

function init() {
	const startButton = document.querySelector(".start-btn");
	startButton.addEventListener("click", () => {
		window.location.href = "/account";
	});
}

document.addEventListener("DOMContentLoaded", () => {
	init();
});
