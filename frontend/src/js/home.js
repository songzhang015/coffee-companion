/* JS File for Coffee Companion App - Home Page */
import "../css/global.css";
import "../css/home.css";
import logIcon from "../assets/icons/log.svg";
import adjustIcon from "../assets/icons/adjust.svg";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

async function fetchEntries() {
	try {
		const response = await fetch("/api/entries");
		if (!response.ok) {
			throw new Error(`HTTP error: ${response.status}`);
		}
		const result = await response.json();
		if (!result.success) {
			throw new Error(`Backend error: ${result.message}`);
		}
		return result.entries;
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

// Log Page
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

	fetchEntries().then((fetchedEntries) => {
		fetchedEntries.forEach((entry) => {
			addEntryToPage(entry);
		});
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
		sliderInput.min = "1";
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

	addSliderField("Aroma", "aroma");
	addSliderField("Texture", "texture");
	addSliderField("Flavor", "flavor");
	addSliderField("Acidity", "acidity");

	const newEntryButton = document.createElement("button");
	newEntryButton.type = "submit";
	newEntryButton.classList.add("add-entries-button");
	newEntryButton.textContent = "Add Journal Entry";
	newForm.appendChild(newEntryButton);

	document.querySelector(".title").required = true;
	document.querySelector(".date").required = true;

	newForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		const getValue = (className) => {
			const element = document.querySelector(`.${className}`);
			return element ? element.value : "";
		};
		await createNewEntry(
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

async function createNewEntry(
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
	try {
		const response = await fetch("/api/entries", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newEntry),
		});
		if (!response.ok) {
			throw new Error(`HTTP error: ${response.status}`);
		}

		const result = await response.json();
		if (!result.success) {
			throw new Error(`Backend error: ${result.message}`);
		}
	} catch (error) {
		console.error(error.message);
	}
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
}

async function deleteEntry(entryToDelete) {
	try {
		const response = await fetch(`/api/entries/${entryToDelete.id}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error(`Delete failed: ${response.status}`);
		}

		initLogPage();
	} catch (error) {
		console.error("Error deleting entry:", error);
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

	for (const field in fieldNames) {
		if (field !== "title" && field !== "user") {
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

// Adjust Page
function initAdjustPage() {
	document.body.innerHTML = "";

	const mainContainer = document.createElement("div");
	mainContainer.classList.add("main-container-adjust");
	document.body.append(mainContainer);

	const sidebar = document.createElement("div");
	sidebar.classList.add("sidebar-adjust");
	mainContainer.append(sidebar);

	const sidebarTitle = document.createElement("h1");
	sidebarTitle.classList.add("sidebar-title");
	sidebarTitle.textContent = "Entries";
	sidebar.append(sidebarTitle);

	const divider = document.createElement("div");
	divider.classList.add("divider-adjust");
	sidebar.append(divider);

	const entriesContainer = document.createElement("div");
	entriesContainer.classList.add("entries-container-adjust");
	sidebar.append(entriesContainer);

	const rightContainer = document.createElement("div");
	rightContainer.classList.add("right-container");
	mainContainer.append(rightContainer);

	const selectEntryPlaceholder = document.createElement("h2");
	selectEntryPlaceholder.classList.add("select-entry-placeholder");
	selectEntryPlaceholder.textContent = "Select an entry";
	rightContainer.append(selectEntryPlaceholder);

	loadAdjustEntries();
}

function loadAdjustEntries() {
	const container = document.querySelector(".entries-container-adjust");
	fetchEntries().then((fetchedEntries) => {
		fetchedEntries.forEach((entry) => {
			const entryContainer = document.createElement("div");
			entryContainer.classList.add("entry-container-adjust");

			const entryTitle = document.createElement("p");
			entryTitle.textContent = entry.title;
			entryContainer.append(entryTitle);

			const entryDate = document.createElement("p");
			entryDate.textContent = entry.date;
			entryContainer.append(entryDate);

			container.append(entryContainer);
			entryContainer.addEventListener("click", () => {
				selectEntry(entry);
			});
		});
	});
}

function selectEntry(entry) {
	const rightSection = document.querySelector(".right-container");
	rightSection.innerHTML = "";
	rightSection.classList.add("selected");

	const topSection = document.createElement("div");
	topSection.classList.add("adjust-top-section");
	rightSection.append(topSection);

	const bottomSection = document.createElement("div");
	bottomSection.classList.add("adjust-bottom-section");
	rightSection.append(bottomSection);

	const rightTitle = document.createElement("h2");
	rightTitle.classList.add("right-title");
	rightTitle.textContent = `Coffee: ${entry.title}`;
	topSection.append(rightTitle);

	for (const field in fieldNames) {
		if (field !== "title" && entry[field] !== "") {
			const element = document.createElement("p");
			element.textContent = `${fieldNames[field]}: ${entry[field]}`;
			topSection.append(element);
		}
	}

	const issuesTitle = document.createElement("h2");
	issuesTitle.classList.add("issues-title");
	issuesTitle.textContent = "Select all applicable issues";
	bottomSection.append(issuesTitle);

	const issueTooltip = document.createElement("div");
	issueTooltip.classList.add("issue-tooltip");
	document.body.append(issueTooltip);

	populateIssues();
}

function populateIssues() {
	const container = document.querySelector(".adjust-bottom-section");

	const issuesContainer = document.createElement("div");
	issuesContainer.classList.add("issues-container");

	const issueData = [
		{
			text: "Bitter",
			info: "An astringent taste, similar to citrus peels, 99% cocoa chocolate, or grapefruit.",
		},
		{
			text: "Sour",
			info: "A tart or acidic taste, similar to lemon or vinegar.",
		},
		{ text: "Weak", info: "Lacking in strength or body, water-like." },
		{
			text: "Heavy",
			info: "Too heavy, dense, or full, or too strong of a cup.",
		},
		{
			text: "Burnt",
			info: "A smoky, ashy, or charred taste.",
		},
		{
			text: "Bland",
			info: "Lacking in flavor, like bean-water with very little distinctive flavor.",
		},
		{
			text: "Cardboard-like",
			info: "A papery, woody, or stale taste.",
		},
		{
			text: "Overextracted",
			info: "Having bitter, dry, or too strong of flavors.",
		},
	];

	const issueTooltip = document.querySelector(".issue-tooltip");

	issueData.forEach((issue) => {
		const issueElement = document.createElement("div");
		issueElement.classList.add("issue");
		issueElement.textContent = issue.text;
		issuesContainer.append(issueElement);

		issueElement.addEventListener("mouseenter", (event) => {
			issueTooltip.textContent = issue.info;
			issueTooltip.classList.add("visible");

			const rect = event.target.getBoundingClientRect();
			issueTooltip.style.left = `${rect.left + rect.width / 2}px`;
			issueTooltip.style.top = `${rect.top - issueTooltip.offsetHeight - 10}px`;
		});

		issueElement.addEventListener("mouseleave", () => {
			issueTooltip.classList.remove("visible");
		});

		issueElement.addEventListener("click", () => {
			issueElement.classList.toggle("selected");

			const hasSelectedIssue =
				issuesContainer.querySelector(".issue.selected") !== null;
			goForwardBtn.classList.toggle("clickable", hasSelectedIssue);
		});
	});

	container.append(issuesContainer);

	const goForwardBtn = document.createElement("button");
	goForwardBtn.classList.add("go-forward-btn");
	goForwardBtn.textContent = "Continue";
	container.append(goForwardBtn);

	goForwardBtn.classList.remove("clickable");
}

// Other
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
});

export { initLogPage, initAdjustPage };
