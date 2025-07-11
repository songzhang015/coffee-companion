/* Navigation File for Coffee Companion App to traverse between logging and adjusting brews for homescreen */

function attachEventListeners() {
	const logSection = document.querySelector(".log-container .icon-container");
	const adjustSection = document.querySelector(
		".adjust-container .icon-container"
	);

	logSection.addEventListener("click", () => {
		navigateToLogPage();
	});

	adjustSection.addEventListener("click", () => {
		alert("Adjust section clicked!");
	});
}

function navigateToLogPage() {
	document.body.innerHTML = "";
}

export { attachEventListeners };
