import {
    getFirestore,
    collection,
    getDocs,
    query,
    where
} from 'firebase/firestore';
import { getUserName } from "..";

export function initialLoad() {
    content.appendChild(homeDiv);
    loadFriendsPost();
}

async function loadFriendsPost() {
    let current = getUserName();

    const postsQuery = query(collection(getFirestore(), 'posts'), where('user', '!=', current))
    const postsQuerySnapshot = await getDocs(postsQuery);
    postsQuerySnapshot.forEach((doc) => {
        let post = doc.data();
        displayFriendsPost(doc.id, post.image, post.text, post.user, post.profilePicUrl);
    });
}

function displayFriendsPost(id, image, text, user, profilePic) {
    const postDiv = document.getElementById(id);
    const userData = document.querySelector('.user-data')
    if(postDiv) {
        const pic = postDiv.querySelector('img');
        pic.src = image;
        const desc = postDiv.querySelector('.desc');
        desc.textContent = text;
        const profilePhoto = userData.querySelector('.user-photo');
        profilePhoto.src = profilePic;
        const userName = userData.querySelector('.user-name');
        userName.textContent = user;
    }
    else {
        createFriendPost(id, image, text, user, profilePic);
    }
}

function createFriendPost(id, image, text, user, profilePic) {
    const postDiv = document.createElement('div');
    postDiv.id = id;
    postDiv.className = 'post-div';
    homeDiv.appendChild(postDiv);

    const pic = document.createElement('img');
    pic.src = image;
    const desc = document.createElement('div');
    desc.className = 'desc';
    desc.textContent = text;

    const userData = document.createElement('div');
    userData.className = 'user-data';
    const userPhoto = document.createElement('img');
    userPhoto.className = 'user-photo';
    userPhoto.src = profilePic;
    const userName = document.createElement('div');
    userName.className = 'user-name';
    userName.textContent = user;
    userData.appendChild(userPhoto);
    userData.appendChild(userName);

    postDiv.appendChild(userData);
    postDiv.appendChild(pic)
    postDiv.appendChild(desc)
}

const content = document.querySelector('#content');
const homeDiv = document.createElement('div');
homeDiv.textContent = 'Friends post';
homeDiv.id = 'home-div';