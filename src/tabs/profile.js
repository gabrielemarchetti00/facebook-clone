export function profileLoad() {
    content.appendChild(profileDiv);
    displayPosts()
}

function displayPosts() {
}

const content = document.querySelector('#content');
const profileDiv = document.createElement('div');
profileDiv.textContent = "Your Posts";

const postDiv = document.createElement('div');
const picImg = document.createElement('img');
const descDiv = document.createElement('div');





