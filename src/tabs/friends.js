export function friendsLoad() {
    const content = document.querySelector('#content');

    const friendsDiv = document.createElement('div');
    friendsDiv.textContent = "Friends"
    content.appendChild(friendsDiv);
}