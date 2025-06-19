/* JS File for Coffee Companion App - Account Page */

function showRegister() {
    document.querySelector(".login-form").style.display = "none";
    document.querySelector(".register-form").style.display = "flex";
}

function showLogin() {
    document.querySelector(".register-form").style.display = "none";
    document.querySelector(".login-form").style.display = "flex";
}

document.querySelector(".switch-register-btn").addEventListener("click", function(event) {
    event.preventDefault();
    showRegister();
});
document.querySelector(".switch-login-btn").addEventListener("click", function(event) {
    event.preventDefault();
    showLogin();
});