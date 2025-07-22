/* JS File for Coffee Companion App - Account Page */
import "../css/global.css";
import "../css/account.css";

function showRegister() {
	document.querySelector(".login-form").style.display = "none";
	document.querySelector(".register-form").style.display = "flex";
	document.querySelector(".no-account").style.display = "none";
	document.querySelector(".have-account").style.display = "block";
}

function showLogin() {
	document.querySelector(".register-form").style.display = "none";
	document.querySelector(".login-form").style.display = "flex";
	document.querySelector(".no-account").style.display = "block";
	document.querySelector(".have-account").style.display = "none";
}

document
	.querySelector(".switch-register-btn")
	.addEventListener("click", (event) => {
		event.preventDefault();
		showRegister();
	});

document
	.querySelector(".switch-login-btn")
	.addEventListener("click", (event) => {
		event.preventDefault();
		showLogin();
	});
