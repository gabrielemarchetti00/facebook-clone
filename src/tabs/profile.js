export function profileLoad() {
    const content = document.querySelector('#content');

    const profileDiv = document.createElement('div');
    profileDiv.textContent = "Your Posts"
    content.appendChild(profileDiv);
}