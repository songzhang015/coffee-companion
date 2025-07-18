/* JS File for Coffee Companion App - Home Page */
import "../css/global.css";
import "../css/home.css";
import logIcon from "../assets/icons/log.svg";
import adjustIcon from "../assets/icons/adjust.svg";

let entries = [];
const optionalFields = {
	roastLevel: ["Roast Level", "e.g. Dark Roast"],
	coffeeAmount: ["Coffee Amount", "e.g. 13g"],
	waterTemp: ["Water Temperature", "e.g. 212°F"],
	waterAmount: ["Water Amount", "e.g. 200g"],
	grindSize: ["Grind Size", "e.g. Medium Fine"],
	brewTime: ["Brew Time", "e.g. 3 minutes"],
};

const fieldNames = {
	title: "Entry Title",
	date: "Date",
	roastLevel: "Roast Level",
	coffeeAmount: "Coffee Amount",
	waterTemp: "Water Temperature",
	waterAmount: "Water Amount",
	grindSize: "Grind Size",
	brewTime: "Brew Time",
};

function initMain() {
	document.body.innerHTML = "";
	const mainContainer = document.createElement("div");
	mainContainer.classList.add("main-container");

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
	const logSection = createSection("log-container", logIcon, "Log");
	const adjustSection = createSection("adjust-container", adjustIcon, "Adjust");

	mainContainer.appendChild(logSection);
	mainContainer.appendChild(adjustSection);
	document.body.appendChild(mainContainer);
	attachSectionEventListeners();
}

function initLogPage() {
	document.body.innerHTML = "";

	// Main, white container
	const mainContainer = document.createElement("div");
	mainContainer.classList.add("main-container-log");

	// Main form, yellow container
	const entryForm = document.createElement("div");
	entryForm.classList.add("entry-form");

	const entriesHeader = document.createElement("div");
	entriesHeader.classList.add("entries-header");

	const recentEntriesTitle = document.createElement("h1");
	recentEntriesTitle.classList.add("entries-title");
	recentEntriesTitle.textContent = "Recent Entries";
	entriesHeader.appendChild(recentEntriesTitle);

	const returnButton = document.createElement("button");
	returnButton.textContent = "<-- Return";
	returnButton.addEventListener("click", () => {
		initMain();
	});
	entriesHeader.appendChild(returnButton);

	const divider = document.createElement("div");
	divider.classList.add("divider");

	entryForm.appendChild(entriesHeader);
	entryForm.appendChild(divider);

	const entriesContainer = document.createElement("div");
	entriesContainer.classList.add("entries-container");
	entryForm.appendChild(entriesContainer);

	mainContainer.appendChild(entryForm);
	document.body.appendChild(mainContainer);

	entries.forEach((entry) => {
		addEntryToPage(entry);
	});

	const newEntryButton = document.createElement("button");
	newEntryButton.classList.add("add-entries-button");
	newEntryButton.textContent = "New Entry";
	entryForm.appendChild(newEntryButton);
	newEntryButton.addEventListener("click", () => {
		initNewEntryPage();
	});
}

function initNewEntryPage() {
	const entryForm = document.querySelector(".entry-form");
	const entriesContainer = document.querySelector(".entries-container");
	entriesContainer.innerHTML = "";

	let oldButton = document.querySelector(".add-entries-button");
	oldButton.remove();

	const title = document.querySelector(".entries-title");
	title.textContent = "New Entry";

	const entryContainerOptional = document.createElement("div");
	entryContainerOptional.classList.add("new-entry-container");

	const entryOptionalTitle = document.createElement("h2");
	entryOptionalTitle.textContent = "Add Optional Field:";

	const entryOptionalSelector = document.createElement("select");
	entryOptionalSelector.classList.add("entry-selector");

	(function initOptions() {
		const entryOptionPlaceholder = document.createElement("option");
		entryOptionPlaceholder.value = "";
		entryOptionPlaceholder.disabled = true;
		entryOptionPlaceholder.selected = true;
		entryOptionPlaceholder.hidden = true;
		entryOptionPlaceholder.textContent = "-- Select a field --";
		entryOptionalSelector.append(entryOptionPlaceholder);

		const roastLevel = document.createElement("option");
		roastLevel.value = "roastLevel";
		roastLevel.textContent = "Roast Level";
		entryOptionalSelector.append(roastLevel);

		const coffeeAmount = document.createElement("option");
		coffeeAmount.value = "coffeeAmount";
		coffeeAmount.textContent = "Coffee Amount";
		entryOptionalSelector.append(coffeeAmount);

		const waterTemp = document.createElement("option");
		waterTemp.value = "waterTemp";
		waterTemp.textContent = "Water Temperature";
		entryOptionalSelector.append(waterTemp);

		const waterAmount = document.createElement("option");
		waterAmount.value = "waterAmount";
		waterAmount.textContent = "Water Amount";
		entryOptionalSelector.append(waterAmount);

		const grindSize = document.createElement("option");
		grindSize.value = "grindSize";
		grindSize.textContent = "Grind Size";
		entryOptionalSelector.append(grindSize);

		const brewTime = document.createElement("option");
		brewTime.value = "brewTime";
		brewTime.textContent = "Brew Time";
		entryOptionalSelector.append(brewTime);
	})();

	entryContainerOptional.append(entryOptionalTitle);
	entryContainerOptional.append(entryOptionalSelector);

	addNewField("Date:", "e.g. 01/20/2025", "date");
	addNewField("Entry Title:", "e.g. Columbian", "title");

	const addFieldButton = document.createElement("button");
	addFieldButton.classList.add("add-field-button");
	addFieldButton.textContent = "Add Field";
	entryContainerOptional.append(addFieldButton);
	addFieldButton.addEventListener("click", () => {
		const selectedValue = entryOptionalSelector.value;
		if (selectedValue !== "") {
			const fieldDetails = optionalFields[selectedValue];
			addNewField(fieldDetails[0], fieldDetails[1], selectedValue);
			entryOptionalSelector.selectedOptions[0].remove();
			entryOptionalSelector.value = "";
			if (entryOptionalSelector.options.length <= 1) {
				entryOptionalSelector.style.display = "none";
				entryOptionalTitle.style.display = "none";
				addFieldButton.style.display = "none";
			}
		}
	});

	entriesContainer.append(entryContainerOptional);

	const newEntryButton = document.createElement("button");
	newEntryButton.classList.add("add-entries-button");
	newEntryButton.textContent = "Add Journal Entry";
	entryForm.append(newEntryButton);
	newEntryButton.addEventListener("click", () => {
		const entryInputTitle = document.querySelector(".title");
		const entryInputDate = document.querySelector(".date");
		const entryInputRoastLevel = document.querySelector(".roastLevel");
		const entryInputCoffeeAmount = document.querySelector(".coffeeAmount");
		const entryInputWaterTemp = document.querySelector(".waterTemp");
		const entryInputWaterAmount = document.querySelector(".waterAmount");
		const entryInputGrindSize = document.querySelector(".grindSize");
		const entryInputBrewTime = document.querySelector(".brewTime");

		createNewEntry(
			entryInputTitle?.value ?? "",
			entryInputDate?.value ?? "",
			entryInputRoastLevel?.value ?? "",
			entryInputCoffeeAmount?.value ?? "",
			entryInputWaterTemp?.value ?? "",
			entryInputWaterAmount?.value ?? "",
			entryInputGrindSize?.value ?? "",
			entryInputBrewTime?.value ?? ""
		);
		initLogPage();
	});

	const cancelNewEntryButton = document.createElement("button");
	cancelNewEntryButton.classList.add("add-entries-button");
	cancelNewEntryButton.textContent = "Cancel";
	entryForm.append(cancelNewEntryButton);
	cancelNewEntryButton.addEventListener("click", () => {
		initLogPage();
	});
}

function addNewField(title, placeholder, cls) {
	const entryContainer = document.createElement("div");
	entryContainer.classList.add("new-entry-container");

	const entryTitle = document.createElement("h2");
	entryTitle.textContent = title;
	const entryInput = document.createElement("input");
	entryInput.classList.add("entry-input");
	entryInput.classList.add(cls);
	entryInput.placeholder = placeholder;

	entryContainer.append(entryTitle);
	entryContainer.append(entryInput);

	const entriesContainer = document.querySelector(".entries-container");
	entriesContainer.insertBefore(
		entryContainer,
		entriesContainer.lastElementChild
	);
}

function createNewEntry(
	title = "",
	date = "",
	roastLevel = "",
	coffeeAmount = "",
	waterTemp = "",
	waterAmount = "",
	grindSize = "",
	brewTime = ""
) {
	const newEntry = {
		title,
		date,
		roastLevel,
		coffeeAmount,
		waterTemp,
		waterAmount,
		grindSize,
		brewTime,
	};
	entries.push(newEntry);
}

function addEntryToPage(entry) {
	const container = document.querySelector(".entries-container");

	const entryContainer = document.createElement("div");
	entryContainer.classList.add("entry-container");

	const entryTitle = document.createElement("h2");
	entryTitle.textContent = entry.title;

	const entryDate = document.createElement("h2");
	entryDate.textContent = entry.date;

	entryContainer.append(entryTitle);
	entryContainer.append(entryDate);

	container.append(entryContainer);
	entryContainer.addEventListener("click", () => {
		viewEntry(entry);
	});
}

function viewEntry(entry) {
	const entryForm = document.querySelector(".entry-form");
	const entriesContainer = document.querySelector(".entries-container");
	entriesContainer.innerHTML = "";

	let oldButton = document.querySelector(".add-entries-button");

	oldButton.remove();

	const title = document.querySelector(".entries-title");
	title.textContent = "View Entry";

	for (const field in entry) {
		const fieldValue = entry[field];
		if (fieldValue !== "") {
			viewEntryAddField(entry, field);
		}
	}

	const cancelNewEntryButton = document.createElement("button");
	cancelNewEntryButton.classList.add("add-entries-button");
	cancelNewEntryButton.textContent = "Cancel";
	entryForm.append(cancelNewEntryButton);
	cancelNewEntryButton.addEventListener("click", () => {
		initLogPage();
	});
}

function viewEntryAddField(entry, field) {
	const mainContainer = document.querySelector(".entries-container");

	const container = document.createElement("div");
	container.classList.add("view-entry-container");

	const title = document.createElement("h2");
	title.textContent = fieldNames[field];

	const body = document.createElement("p");
	body.textContent = entry[field];

	container.append(title, body);
	mainContainer.append(container);
}



// Other Stuff
function initAdjustPage() {
	alert("Adjust section clicked!");
}

function attachSectionEventListeners() {
	const logSection = document.querySelector(".log-container .icon-container");
	const adjustSection = document.querySelector(
		".adjust-container .icon-container"
	);

	logSection.addEventListener("click", () => {
		initLogPage();
	});

	adjustSection.addEventListener("click", () => {
		initAdjustPage();
	});
}

document.addEventListener("DOMContentLoaded", () => {
	initMain();
	createNewEntry("Googa Coffee", "01/20/25");
	createNewEntry("Goomba Coffee", "02/15/25");
	createNewEntry("Goota Coffee", "03/25/25");
	setTimeout(initLogPage, 10);
	console.log(entries);
});

export { initLogPage, initAdjustPage };
