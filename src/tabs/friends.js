import { getAuth } from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    setDoc,
    updateDoc,
    doc,
    serverTimestamp,
} from 'firebase/firestore';

export function friendsLoad() {
    content.appendChild(friendsDiv);
    loadUsers();
    loadRequests();
}

function loadUsers() {
    const usersQuery = query(collection(getFirestore(), 'users'))

    onSnapshot(usersQuery, function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            let user = change.doc.data();
            /*
            if(user.name != getAuth().currentUser.displayName) {
                displayUsers(change.doc.id, user.name, user.photo)
            }
            */
            displayUsers(change.doc.id, user.name, user.photo)
        })
    })
}

function displayUsers(id, name, photo) {
    const userDiv = document.getElementById(id);
    if(userDiv) {
        const userPhoto = userDiv.querySelector('img');
        userPhoto.src = photo;
        const userName = userDiv.querySelector('div');
        userName.textContent = name;
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

    const requestBtn = document.createElement('button');
    requestBtn.textContent = 'Send request';
    requestBtn.className = 'request-btn';
    userDiv.appendChild(requestBtn);

    requestBtn.addEventListener('click', function() {
        saveRequest(name);
    });
}

async function saveRequest(name) {
    try {
        const reqRef = await addDoc(collection(getFirestore(), 'requests'), {
            sender: getAuth().currentUser.displayName,
            receiver: name,
            accepted: false
        });
    }
    catch(error) {
        console.error('Error writing new request to Firebase Database', error);
    }
}

function loadRequests() {
    const requestsQuery= (query(collection(getFirestore(), 'requests')))
    
    onSnapshot(requestsQuery, function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            let request = change.doc.data();
            if(request.accepted == false) {
                displayRequests(change.doc.id, request.sender)
            }
        })
    })
}

function displayRequests(id, sender) {
    const requestDiv = document.getElementById(id);
    if(requestDiv) {
        requestDiv.textContent = `Friend request from ${sender}`;
    }
    else {
        createRequestDiv(id, sender)
    }
}

function createRequestDiv(id, sender) {
    const requestDiv = document.createElement('div');
    requestDiv.className = 'request-div'
    requestDiv.textContent = `Friend request from ${sender}`;
    requestsDiv.appendChild(requestDiv);

    const acceptBtn = document.createElement('button');
    acceptBtn.textContent = 'Accept';
    acceptBtn.className = 'accept-btn';
    requestDiv.appendChild(acceptBtn);

    acceptBtn.addEventListener('click', function() {
        acceptRequest(id)
    });
}

async function acceptRequest(id) {
    const reqRef = doc(getFirestore(), 'requests', id)
    await updateDoc(reqRef, {
        accepted: true
    })
}

const content = document.querySelector('#content');
const friendsDiv = document.createElement('div');
friendsDiv.id = 'friends-div'
const requestsDiv = document.createElement('div');
requestsDiv.id = 'requests-div'
requestsDiv.textContent = 'Friend Requests'
const usersDiv = document.createElement('div');
usersDiv.id = 'users-div'
usersDiv.textContent = 'All Users'
friendsDiv.appendChild(requestsDiv);
friendsDiv.appendChild(usersDiv);








