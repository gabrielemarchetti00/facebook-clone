export function addPostLoad() {
    const content = document.querySelector('#content');

    const addPostDiv = document.createElement('div');
    addPostDiv.textContent = "Add post"
    content.appendChild(addPostDiv);
}