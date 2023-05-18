export function initialLoad() {
    const content = document.querySelector('#content');

    const homeDiv = document.createElement('div');
    homeDiv.textContent = "Home"
    content.appendChild(homeDiv);
}