/* JS File for Coffee Companion App - Index Page */
import "../css/global.css";
import "../css/index.css";

function init() {
	const startButton = document.querySelector(".start-btn");
	startButton.addEventListener("click", () => {
		window.location.href = "/account";
	});
}

window.addEventListener("load", () => {
	const elements = document.querySelectorAll(".fade-in");

	elements.forEach((el, index) => {
		setTimeout(() => {
			el.classList.add("visible");
		}, index * 165);
	});
});

document.addEventListener("DOMContentLoaded", () => {
	init();
});
