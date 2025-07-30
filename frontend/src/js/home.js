/* JS File for Coffee Companion App - Home Page */
import "../css/global.css";
import "../css/home.css";
import logIcon from "../assets/icons/log.svg";
import adjustIcon from "../assets/icons/adjust.svg";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

let entries = [];

fetchEntries().then((fetchedEntries) => {
	entries = fetchedEntries;
});

async function fetchEntries() {
	try {
		const response = await fetch("/api/entries");
		if (!response.ok) {
			throw new Error(`HTTP error: ${response.status}`);
		}
		const json = await response.json();
		if (!json.success) {
			throw new Error(`Backend error: ${json.message}`);
		}
		return json.entries;
	} catch (error) {
		console.error(error.message);
		return [];
	}
}

const optionalFields = {
	roastLevel: ["Roast Level", "e.g. Dark Roast (optional)"],
	coffeeAmount: ["Coffee Amount", "e.g. 13g (optional)"],
	waterTemp: ["Water Temperature", "e.g. 212°F (optional)"],
	waterAmount: ["Water Amount", "e.g. 200g (optional)"],
	grindSize: ["Grind Size", "e.g. Medium Fine (optional)"],
	brewTime: ["Brew Time", "e.g. 3 minutes (optional)"],
	notes: ["Notes", "e.g. Clean, lingering sweetness (optional)"],
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
	notes: "Notes",
	aroma: "Aroma",
	texture: "Texture",
	flavor: "Flavor",
	acidity: "Acidity",
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
	returnButton.classList.add("return-button");
	returnButton.textContent = "← Go Back";
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
	const entriesContainer = document.querySelector(".entries-container");
	entriesContainer.innerHTML = "";

	let oldButton = document.querySelector(".add-entries-button");
	oldButton.remove();

	let returnButton = document.querySelector(".return-button");
	returnButton.remove();

	const newForm = document.createElement("form");
	entriesContainer.replaceWith(newForm);
	newForm.appendChild(entriesContainer);

	const title = document.querySelector(".entries-title");
	title.textContent = "New Entry";

	let currentRow = null;
	let fieldCount = 0;

	function addNewField(title, placeholder, cls, fullWidth = false) {
		const entryContainer = document.createElement("div");
		entryContainer.classList.add("new-entry-container");

		if (fullWidth) {
			entryContainer.classList.add("full-width");
		}

		const entryTitle = document.createElement("h2");
		entryTitle.classList.add("entry-title");
		entryTitle.textContent = title;

		const entryInput = document.createElement("input");
		entryInput.classList.add("entry-input", cls);
		entryInput.placeholder = placeholder;

		entryContainer.append(entryTitle, entryInput);

		const entriesContainer = document.querySelector(".entries-container");

		if (fullWidth || !currentRow || fieldCount % 2 === 0) {
			currentRow = document.createElement("div");
			currentRow.classList.add("entry-row");

			entriesContainer.appendChild(currentRow);
		}

		currentRow.appendChild(entryContainer);
		fieldCount++;

		if (fullWidth) {
			currentRow = null;
			fieldCount = 0;
		}

		if (cls === "date") {
			flatpickr(entryInput, {
				dateFormat: "m/d/Y",
				allowInput: true,
				maxDate: "today",
			});
		}
	}

	addNewField("Entry Title:", "e.g. Columbian", "title");
	addNewField("Date:", "e.g. 01/20/2025", "date");
	for (const field in optionalFields) {
		const [label, placeholder] = optionalFields[field];
		console.log(`field: ${field}, fullWidth: ${field === "notes"}`);
		if (field === "notes") {
			addNewField(label, placeholder, field, true);
		} else {
			addNewField(label, placeholder, field);
		}
	}

	function addSliderField(title, cls) {
		const entryContainer = document.createElement("div");
		entryContainer.classList.add("new-entry-container");

		const entryTitle = document.createElement("h2");
		entryTitle.classList.add("entry-title");
		entryTitle.textContent = title;

		const sliderInput = document.createElement("input");
		sliderInput.classList.add("entry-slider", cls);
		sliderInput.type = "range";
		sliderInput.min = "0";
		sliderInput.max = "5";
		sliderInput.step = "1";
		sliderInput.value = "3";

		const valueDisplay = document.createElement("span");
		valueDisplay.classList.add("slider-value");
		valueDisplay.textContent = sliderInput.value;

		sliderInput.addEventListener("input", () => {
			valueDisplay.textContent = sliderInput.value;
		});

		entryContainer.append(entryTitle, sliderInput, valueDisplay);

		const entriesContainer = document.querySelector(".entries-container");

		if (!currentRow || fieldCount % 2 === 0) {
			currentRow = document.createElement("div");
			currentRow.classList.add("entry-row");

			entriesContainer.appendChild(currentRow);
		}

		currentRow.appendChild(entryContainer);
		fieldCount++;
	}

	addSliderField("Aroma:", "aroma");
	addSliderField("Texture:", "texture");
	addSliderField("Flavor:", "flavor");
	addSliderField("Acidity:", "acidity");

	const newEntryButton = document.createElement("button");
	newEntryButton.type = "submit";
	newEntryButton.classList.add("add-entries-button");
	newEntryButton.textContent = "Add Journal Entry";
	newForm.appendChild(newEntryButton);

	document.querySelector(".title").required = true;
	document.querySelector(".date").required = true;

	newForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const getValue = (className) => {
			const element = document.querySelector(`.${className}`);
			return element ? element.value : "";
		};
		createNewEntry(
			getValue("title"),
			getValue("date"),
			getValue("roastLevel"),
			getValue("coffeeAmount"),
			getValue("waterTemp"),
			getValue("waterAmount"),
			getValue("grindSize"),
			getValue("brewTime"),
			getValue("notes"),
			getValue("aroma"),
			getValue("texture"),
			getValue("flavor"),
			getValue("acidity")
		);
		initLogPage();
	});

	const header = document.querySelector(".entries-header");

	const cancelNewEntryButton = document.createElement("button");
	cancelNewEntryButton.classList.add("cancel-entries-button");
	cancelNewEntryButton.textContent = "×";
	header.append(cancelNewEntryButton);
	cancelNewEntryButton.addEventListener("click", () => {
		initLogPage();
	});
}

function createNewEntry(
	title = "",
	date = "",
	roastLevel = "",
	coffeeAmount = "",
	waterTemp = "",
	waterAmount = "",
	grindSize = "",
	brewTime = "",
	notes = "",
	aroma = 3,
	texture = 3,
	flavor = 3,
	acidity = 3
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
		notes,
		aroma,
		texture,
		flavor,
		acidity,
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

	const deleteButton = document.createElement("button");
	deleteButton.classList.add("delete-entry-button");
	deleteButton.textContent = "×";

	entryContainer.addEventListener("mouseenter", () => {
		deleteButton.style.opacity = "1";
	});

	entryContainer.addEventListener("mouseleave", () => {
		deleteButton.style.opacity = "0";
	});

	deleteButton.addEventListener("mouseenter", () => {
		deleteButton.style.opacity = "1";
	});

	deleteButton.addEventListener("mouseleave", () => {
		deleteButton.style.opacity = "0";
	});

	deleteButton.addEventListener("click", (e) => {
		e.stopPropagation();
		deleteEntry(entry);
	});

	entryContainer.append(entryTitle);
	entryContainer.append(entryDate);
	entryContainer.append(deleteButton);

	container.append(entryContainer);
	entryContainer.addEventListener("click", () => {
		viewEntry(entry);
	});

	function deleteEntry(entryToDelete) {
		const entryIndex = entries.findIndex(
			(entry) =>
				entry.title === entryToDelete.title && entry.date === entryToDelete.date
		);

		if (entryIndex !== -1) {
			entries.splice(entryIndex, 1);
			initLogPage();
		}
	}
}

function viewEntry(entry) {
	const entryForm = document.querySelector(".entry-form");
	const entriesContainer = document.querySelector(".entries-container");
	entriesContainer.innerHTML = "";

	let oldButton = document.querySelector(".add-entries-button");
	oldButton.remove();

	let returnButton = document.querySelector(".return-button");
	returnButton.remove();

	const title = document.querySelector(".entries-title");
	title.textContent = entry.title;

	let currentRow = null;
	let fieldCount = 0;

	for (const field in entry) {
		if (field !== "title") {
			const fieldValue = entry[field];
			if (fieldValue !== "") {
				if (!currentRow || fieldCount % 2 === 0) {
					currentRow = document.createElement("div");
					currentRow.classList.add("entry-row");
					entriesContainer.appendChild(currentRow);
				}
				const fieldContainer = viewEntryAddField(entry, field);
				currentRow.appendChild(fieldContainer);
				fieldCount++;
			}
		}
	}

	const cancelNewEntryButton = document.createElement("button");
	cancelNewEntryButton.classList.add("add-entries-button");
	cancelNewEntryButton.textContent = "Back to Entries";
	entryForm.append(cancelNewEntryButton);
	cancelNewEntryButton.addEventListener("click", () => {
		initLogPage();
	});
}

function viewEntryAddField(entry, field) {
	const container = document.createElement("div");
	container.classList.add("view-entry-container");

	const title = document.createElement("h2");
	title.textContent = fieldNames[field];

	const body = document.createElement("p");
	body.textContent = entry[field];

	container.append(title, body);
	return container;
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
	setTimeout(initLogPage, 10);
	console.log(entries);
});

export { initLogPage, initAdjustPage };
