/* Router (JS) File for Coffee Companion App - Home Page */

document.addEventListener("click", (e) => {
    const {target} = e;
    if(!target.matches("nav a")) {
        return;
    }
    e.preventDefault();
    urlRoute();
});

const urlRoute = (event) => {
    event = event || window.event;
    event.preventDefault();
}

const urlLocationHandler = async () => {

}