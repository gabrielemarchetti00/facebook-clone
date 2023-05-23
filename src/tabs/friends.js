import { getAuth } from 'firebase/auth';
import {
    getFirestore,
    collection,
    query,
    onSnapshot,
} from 'firebase/firestore';

export function friendsLoad() {
    content.appendChild(friendsDiv);
    loadUsers();
}

function loadUsers() {
    const usersQuery = query(collection(getFirestore(), 'users'))

    onSnapshot(usersQuery, function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            let user = change.doc.data();
            if(user.name != getAuth().currentUser.displayName) {
                displayUsers(change.doc.id, user.name, user.photo)
            }
        })
    })
}

function displayUsers(id, name, photo) {
    const userDiv = document.getElementById(id)
    if(userDiv) {
        const userName = userDiv.querySelector('div');
        userName.textContent = name;
        const userPhoto = userDiv.querySelector('img');
        userPhoto.src = photo;
    }
    else {
        createUserDiv(id, name, photo);
    }
}

function createUserDiv(id, name, photo) {
    const userDiv = document.createElement('div');
    userDiv.id = id;
    userDiv.className = 'user-div';
    usersDiv.appendChild(userDiv);

    const userPhoto = document.createElement('img');
    userPhoto.src = photo;
    const userName = document.createElement('div');
    userName.textContent = name;
    userDiv.appendChild(userPhoto);
    userDiv.appendChild(userName);
}

const content = document.querySelector('#content');
const friendsDiv = document.createElement('div');
friendsDiv.id = 'friends-div'
const usersDiv = document.createElement('div');
usersDiv.id = 'users-div'
friendsDiv.textContent = 'All Users'
friendsDiv.appendChild(usersDiv);








