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

const issueSolutions = {
	bitter: `Bitterness mainly comes from incorrect brewing or bad beans.
	First, check what beans you have. Cheap or certain types of Robusta beans
	are naturally bitter, as are super dark roasted beans. Otherwise, the
	bitterness is likely due to an over-extraction of the coffee beans.
	The most common problem is that the coffee is grinded too fine (or small).
	If the grind size seems standard, check the brew time- most coffee is
	brewed for around 1-5 minutes depending on the method. Next, determine
	the ideal ratio of coffee to water for your brewing method and try
	adjusting it if it isn't in that range. Most common ratios of coffee to
	water is around 1:15, 1:16, or 1:17. Lower than 1:12 or higher than 1:21
	is atypical for non-espresso brews. If you happen to be severely agitating
	your coffee as it brews, try toning that down. Otherwise, not common but
	you could try brewing at a lower temperature (ex. <205°).`,
	sour: `Sourness mainly comes from incorrect brewing. First, check how fine
	(small) your coffee beans are. If they are super coarse (aka bigger
	chunks), try grinding them to be finer. For non-espresso drinks, try
	increasing the brew time by 20-30 seconds, especially if it's under a
	minute. Next, determine the ideal ratio of coffee to water for your brewing
	method and try adjusting it if it isn't in that range. Most common ratios
	of coffee to water is around 1:15, 1:16, or 1:17. Lower than 1:12 or
	higher than 1:21 is atypical for non-espresso brews. If your water is on
	the cooler side (ex. <205°), try brewing it with off-the-boil water
	(increased temps).`,
	weak: `Weak or watery coffee mainly comes from an incorrect ratio of
	coffee to water, with weaker coffee coming from higher amounts of water.
	If you measure the amount of coffee to water, ensure the ratio is less
	than 1:21, getting closer to most methods and recipes which is around
	1:18 or less. If increased bitterness occurs, adjust the grind size as
	opposed to increasing water. Otherwise, look at common brew times for
	your method and if you are within range, increase times by 30-60 seconds
	and seeing if that helps. If the coffee is weak but without much
	bitterness, you could try to increase extraction by grinding finer
	(smaller). Lastly, if nothing else try increasing water temperatures to
	help extract more flavors.`,
	heavy: `Heavy or bold coffee can be too much, too strong. This is likely
	due to a more extracted coffee or a darker roasted, fully bodied coffee.
	The most common reason for a heavy cup of coffee is a close coffee to water
	ratio. Most espresso (super strong coffee) is brewed from 1:1, 1:2, and 1:3.
	A stronger non-espresso ratio is around 1:12 or 1:14, so if you are brewing
	this type of coffee, try increasing the water to 1:16, 1:17, or even 1:18.
	If the coffee tastes bold and heavy without much bitterness, try grinding
	a little bit coarser which will lessen the extraction. Extra agitation or
	stirring can also contribute to a bolder cup.`,
	burnt: `If a coffee tastes burnt, the easiest and most common problems are
	bad coffee and unclean coffee machines or makers if you use any of
	those devices. Super cheap or incredibly dark roasted coffee can have a
	burnt taste, and oils in uncleaned coffee machines can contribute to a
	burnt taste. Otherwise, unlikely but possible issues can arise from an
	overextraction (ex. too finely grounded) of beans or too hot of water.`,
	bland: `If your coffee tastes bland, the most common issue is not enough
	coffee. If your ratio is greater than 1:21, try reducing it to 1:21. If
	it's 1:21, try a common 1:18 ratio, or 1:16 ratio. Some people enjoy even
	lower, which you could try if it is bland. Otherwise, if the coffee tastes
	bland you could attempt to grind a bit finer if the coffee doesn't taste
	bitter. Minor changes that may help is increasing water temperatures or
	brewing for longer if the ranges are on the lower end.`,
	cardboard: `Beans that taste like cardboard or stale/papery often comes
	simply from the quality of the beans. Older coffee, especially pre-ground
	can taste stale or like cardboard. Otherwise, check that your water temps
	are >200° and you rinse out your machines/devices/filters which may or may
	not have an effect.`,
	overextracted: `Overextracted coffee tasting bitter or harsh can be solved
	by grinding coarser, as super fine particles can slip through or get in
	the taste. A long brew time can also lead to overextraction. Perhaps limit
	it to 2-3 minutes if you are brewing for longger. Lastly, a ratio of 1:14
	or lower for most non-espresso techniques could be overextracted depending
	on your tastes and the coffee beans.`,
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
			info: "An astringent taste, similar to citrus peels, very dark chocolate, or grapefruit.",
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
			text: "Cardboard",
			info: "A papery, woody, or stale taste.",
		},
		{
			text: "Overextracted",
			info: "Having bitter, dry, or too strong of flavors.",
		},
	];

	const issueTooltip = document.querySelector(".issue-tooltip");

	const goForwardBtn = document.createElement("button");
	goForwardBtn.classList.add("go-forward-btn");
	goForwardBtn.textContent = "Continue";

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
	container.append(goForwardBtn);

	goForwardBtn.addEventListener("click", () => {
		initContinuePage();
	});

	goForwardBtn.classList.remove("clickable");
}

function initContinuePage() {
	const issues = Array.from(
		document
			.querySelector(".issues-container")
			.querySelectorAll(".issue.selected")
	).map((e) => e.textContent);

	document.body.innerHTML = "";

	const mainContainer = document.createElement("div");
	mainContainer.classList.add("analysis-container");

	const mainTitle = document.createElement("h1");
	mainTitle.classList.add("analysis-title");
	mainTitle.textContent = "You selected...";
	mainContainer.append(mainTitle);

	issues.forEach((issue) => {
		const issueContainer = document.createElement("div");
		issueContainer.classList.add("analysis-item");

		const issueBox = document.createElement("div");
		issueBox.classList.add("analysis-box");
		const issueTitle = document.createElement("h2");
		issueTitle.classList.add("analysis-title");
		issueTitle.textContent = issue;
		issueBox.append(issueTitle);
		issueContainer.append(issueBox);

		const issueSolution = document.createElement("p");
		issueSolution.classList.add("analysis-solution");
		issueSolution.textContent = issueSolutions[issue.toLowerCase()];
		issueContainer.append(issueSolution);

		mainContainer.append(issueContainer);
	});
	document.body.append(mainContainer);
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
	setTimeout(() => {
		initAdjustPage();
	}, 25);
});

export { initLogPage, initAdjustPage };
