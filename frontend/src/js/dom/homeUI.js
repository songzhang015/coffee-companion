/**
 * homeUI.js
 * DOM content for the main homepage excluding the two sections
 */
import {
	attachSectionEventListeners,
	attachSignupBtnListeners,
	attachLogoutBtnListeners,
} from "../events/homePageEvents";
import { guestState } from "../states/guestState";
import logIcon from "../../assets/icons/log.svg";
import adjustIcon from "../../assets/icons/adjust.svg";

// Initializes the homepage by creating containers and the sections
function initMain() {
	document.body.innerHTML = "";
	const mainContainer = document.createElement("div");
	mainContainer.classList.add("main-container");
	mainContainer.style.display = "none";

	// Create both main sections in homepage
	const logSection = createSection("log-container", logIcon, "Log");
	const adjustSection = createSection("adjust-container", adjustIcon, "Adjust");

	// Create appropriate signup / logout button
	if (guestState.isGuest) {
		const signupBtn = createSignupBtn();
		mainContainer.appendChild(signupBtn);
	} else {
		const logoutBtn = createLogoutBtn();
		mainContainer.appendChild(logoutBtn);
	}

	mainContainer.appendChild(logSection);
	mainContainer.appendChild(adjustSection);
	document.body.appendChild(mainContainer);
	attachSectionEventListeners();
	mainContainer.style.display = "";
}

// Creates the 'Log' and 'Adjust' icons and text
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

// Creates the top-right sign up button in homepage
function createSignupBtn() {
	const signupBtn = document.createElement("button");
	signupBtn.classList.add("home-signup-btn");
	signupBtn.textContent = "Sign up";
	attachSignupBtnListeners(signupBtn);
	return signupBtn;
}

// Creates the top-right log out button in homepage
function createLogoutBtn() {
	const logoutBtn = document.createElement("button");
	logoutBtn.classList.add("home-logout-btn");
	logoutBtn.textContent = "Log out";
	attachLogoutBtnListeners(logoutBtn);
	return logoutBtn;
}

export { initMain };
