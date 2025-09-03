/**
 * adjustPageUI.js
 * DOM content for the adjust portion of the homepage
 */
import { fetchEntries } from "../home";
import { addReturnListener } from "../events/homePageEvents";
import {
	selectEntryListener,
	issueTooltipListener,
	issueSelectListener,
	issueContinueListener,
	continueButtonsListeners,
} from "../events/adjustPageEvents";
import { fieldNames, issueSolutions } from "../constants/constants";

// Initializes the adjust page when user clicks on the 'Adjust' section in the homepage
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

	const returnButton = document.createElement("button");
	returnButton.classList.add("return-button");
	returnButton.classList.add("top-right");
	returnButton.textContent = "← Go Back";
	addReturnListener(returnButton);
	mainContainer.append(returnButton);

	loadAdjustEntries();
}

// Loads the entries in a list format on the sidebar of the adjust page
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
			selectEntryListener(entryContainer, entry);
		});
	});
}

// Populates the right side when the user selects an entry from the sidebar
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

	const rightTitle = document.createElement("h1");
	rightTitle.classList.add("right-title");
	rightTitle.textContent = `${entry.title}`;
	if (rightTitle.textContent.length > 45) {
		rightTitle.classList.add("long");
	}
	topSection.append(rightTitle);

	const rightdate = document.createElement("h2");
	rightdate.classList.add("right-date");
	rightdate.textContent = `${entry.date}`;
	topSection.append(rightdate);

	const fieldsContainers = document.createElement("div");
	fieldsContainers.classList.add("fields-containers");
	topSection.append(fieldsContainers);

	const leftDivider = document.createElement("div");
	const rightDivider = document.createElement("div");
	leftDivider.classList.add("fields-divider");
	rightDivider.classList.add("fields-divider");

	// Brewing Perameters
	const fieldsLeftSection = document.createElement("div");
	fieldsLeftSection.classList.add("fields-left-section");
	fieldsContainers.append(fieldsLeftSection);

	const fieldsLeftTitle = document.createElement("h3");
	fieldsLeftTitle.classList.add("fields-left-title");
	fieldsLeftTitle.textContent = "Brewing Parameters";

	const leftFieldsContainer = document.createElement("div");
	leftFieldsContainer.classList.add("left-fields-container");

	fieldsLeftSection.append(fieldsLeftTitle);
	fieldsLeftSection.append(leftDivider);
	fieldsLeftSection.append(leftFieldsContainer);

	// Tasting Notes
	const fieldsRightSection = document.createElement("div");
	fieldsRightSection.classList.add("fields-right-section");
	fieldsContainers.append(fieldsRightSection);

	const rightFieldsContainer = document.createElement("div");
	rightFieldsContainer.classList.add("right-fields-container");

	const fieldsRightTitle = document.createElement("h3");
	fieldsRightTitle.classList.add("fields-right-title");
	fieldsRightTitle.textContent = "Tasting Notes";

	fieldsRightSection.append(fieldsRightTitle);
	fieldsRightSection.append(rightDivider);
	fieldsRightSection.append(rightFieldsContainer);

	const leftSect = [
		"roastLevel",
		"coffeeAmount",
		"waterTemp",
		"waterAmount",
		"grindSize",
		"brewTime",
		"brewMethod",
	];

	const rightSect = ["notes", "aroma", "texture", "flavor", "acidity"];

	for (const field in fieldNames) {
		if (entry[field] !== "") {
			const line = document.createElement("div");
			line.classList.add("field-line");
			if (field === "notes") {
				line.classList.add("notes");
				const notesLine = document.createElement("p");
				const strong = document.createElement("strong");
				strong.textContent = `${fieldNames[field]}: `;
				notesLine.appendChild(strong);

				const lines = entry[field].split("\n");
				lines.forEach((lineText, i) => {
					notesLine.appendChild(document.createTextNode(lineText));
					if (i < lines.length - 1) {
						notesLine.appendChild(document.createElement("br"));
					}
				});

				line.appendChild(notesLine);
			} else {
				const parameter = document.createElement("p");
				parameter.textContent = `${fieldNames[field]}:`;

				const value = document.createElement("p");
				value.textContent = `${entry[field]}`;

				if (value.textContent.length > 40) {
					value.style.fontSize = "0.9rem";
				}
				line.append(parameter);
				line.append(value);
			}

			if (leftSect.includes(field)) {
				leftFieldsContainer.append(line);
			} else if (rightSect.includes(field)) {
				rightFieldsContainer.append(line);
			}
		}
	}

	if (leftFieldsContainer.children.length === 0) {
		fieldsLeftSection.remove();
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

// When an entry is selected, all the issues are populated on the bottom right
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

		issueTooltipListener(issueElement, issue, issueTooltip);

		issueSelectListener(issueElement, issuesContainer, goForwardBtn);
	});

	container.append(issuesContainer);
	container.append(goForwardBtn);

	issueContinueListener(goForwardBtn);

	goForwardBtn.classList.remove("clickable");
}

// Initializes the continue page after the user selects the issues with their brew
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

	document.body.append(mainContainer);

	let counter = 0;
	let maxIdx = issues.length - 1;

	issues.forEach((issue) => {
		displayAnalysis(issue, counter);
		counter += 1;
	});

	counter = 0;

	const analysisBtns = document.createElement("div");
	analysisBtns.classList.add("analysis-btns");

	const prevButton = document.createElement("button");
	prevButton.classList.add("prev-button");
	prevButton.textContent = "Previous";
	analysisBtns.append(prevButton);
	prevButton.style.display = "none";

	const nextButton = document.createElement("button");
	nextButton.classList.add("next-button");
	nextButton.textContent = "Next";
	analysisBtns.append(nextButton);
	nextButton.style.display = "none";

	const finishButton = document.createElement("button");
	finishButton.classList.add("finish-button");
	finishButton.textContent = "Finish";
	analysisBtns.append(finishButton);
	addReturnListener(finishButton);

	if (maxIdx !== 0) {
		prevButton.style.display = "flex";
		nextButton.style.display = "flex";
		finishButton.style.display = "none";
	}

	continueButtonsListeners(nextButton, prevButton, finishButton, maxIdx);

	mainContainer.append(analysisBtns);
}

// Function to display each individual analysis
function displayAnalysis(issue, counter) {
	const mainContainer = document.querySelector(".analysis-container");

	const issueContainer = document.createElement("div");
	issueContainer.classList.add("analysis-item");
	issueContainer.dataset.index = counter;

	const issueBox = document.createElement("div");
	issueBox.classList.add("analysis-box");
	const issueTitle = document.createElement("h2");
	issueTitle.classList.add("issue-title");
	issueTitle.textContent = issue;
	issueBox.append(issueTitle);
	issueContainer.append(issueBox);

	const issueSolution = document.createElement("p");
	issueSolution.classList.add("analysis-solution");
	issueSolution.textContent = issueSolutions[issue.toLowerCase()];
	issueContainer.append(issueSolution);

	mainContainer.append(issueContainer);

	if (counter === 0) {
		issueContainer.classList.add("active");
	}
}

export { initAdjustPage, selectEntry, initContinuePage };
