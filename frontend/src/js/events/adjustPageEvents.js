/**
 * adjustPageEvents.js
 * Contains adjust page events for the 'Adjust' section of the homepage
 */
import { selectEntry, initContinuePage } from "../dom/adjustPageUI";

// Listener for when the user selects an entry from adjust's sidebar
function selectEntryListener(entryContainer, entry) {
	entryContainer.addEventListener("click", () => {
		selectEntry(entry);
	});
}

// Listener to populate tooltip on hover
function issueTooltipListener(issueElement, issue, tooltip) {
	issueElement.addEventListener("mouseenter", (event) => {
		tooltip.textContent = issue.info;
		tooltip.classList.add("visible");

		const rect = event.target.getBoundingClientRect();
		tooltip.style.left = `${rect.left + rect.width / 2}px`;
		tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
	});

	issueElement.addEventListener("mouseleave", () => {
		tooltip.classList.remove("visible");
	});
}

// Listener to colorize the issue when selected
function issueSelectListener(issueElement, issuesContainer, goForwardBtn) {
	issueElement.addEventListener("click", () => {
		issueElement.classList.toggle("selected");

		const hasSelectedIssue =
			issuesContainer.querySelector(".issue.selected") !== null;
		goForwardBtn.classList.toggle("clickable", hasSelectedIssue);
	});
}

// Listener for the "Go Forward" button when issues are selected
function issueContinueListener(goForwardBtn) {
	goForwardBtn.addEventListener("click", () => {
		initContinuePage();
	});
}

// Listeners for the next and prev buttons in the continue screen
function continueButtonsListeners(nextBtn, prevBtn, finishBtn, maxIdx) {
	let counter = 0;

	nextBtn.addEventListener("click", () => {
		if (counter < maxIdx) {
			const curItem = document.querySelector(`[data-index='${counter}']`);
			curItem.classList.remove("active");

			counter += 1;
			const nextItem = document.querySelector(`[data-index='${counter}']`);
			nextItem.classList.add("active");

			if (counter === maxIdx) {
				finishBtn.style.display = "flex";
			}
		}
	});

	prevBtn.addEventListener("click", () => {
		if (counter > 0) {
			const curItem = document.querySelector(`[data-index='${counter}']`);
			curItem.classList.remove("active");

			counter -= 1;
			const prevItem = document.querySelector(`[data-index='${counter}']`);
			prevItem.classList.add("active");

			finishBtn.style.display = "none";
		}
	});
}

export {
	selectEntryListener,
	issueTooltipListener,
	issueSelectListener,
	issueContinueListener,
	continueButtonsListeners,
};
