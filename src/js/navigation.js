/* Navigation File for Coffee Companion App to traverse between logging and adjusting brews for homescreen */

const logSection = document.querySelector(".log-container");
const adjustSection = document.querySelector(".adjust-container");

function attachEventListeners() {
	logSection.addEventListener("click", () => {
		alert("Log section clicked!");
	});

	adjustSection.addEventListener("click", () => {
		alert("Log section clicked!");
	});
}

export { attachEventListeners };
