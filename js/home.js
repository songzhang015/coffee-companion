/* JS File for Coffee Companion App - Home Page */

const mainContainer = document.querySelector(".main-container");

function initMain() {
	mainContainer.innerHTML = "";

	// Helper to create a section (log and adjust)
	function createSection(className, iconSrc, labelText) {
		const container = document.createElement("div");
		container.classList.add(className);

		const iconContainer = document.createElement("div");
		iconContainer.classList.add("icon-container");

		const img = document.createElement("img");
		img.classList.add("icon");
		img.src = iconSrc;
		img.alt = labelText;

		iconContainer.appendChild(img);

		const label = document.createElement("a");
		label.classList.add("label");
		label.textContent = labelText;

		container.appendChild(iconContainer);
		container.appendChild(label);

		return container;
	}

	// Create and append both sections
	const logSection = createSection(
		"log-container",
		"assets/icons/log.svg",
		"Log"
	);
	const adjustSection = createSection(
		"adjust-container",
		"assets/icons/adjust.svg",
		"Adjust"
	);

	mainContainer.appendChild(logSection);
	mainContainer.appendChild(adjustSection);
}

initMain();
