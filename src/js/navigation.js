/* Navigation File for Coffee Companion App to traverse between logging and adjusting brews for homescreen */

function attachEventListeners() {
	const logSection = document.querySelector(".log-container");
	const adjustSection = document.querySelector(".adjust-container");

	logSection.addEventListener("click", () => {
		alert("Log section clicked!");
	});

	adjustSection.addEventListener("click", () => {
		alert("Adjust section clicked!");
	});
}

export { attachEventListeners };
