import { initialLoad } from "./tabs/home";
import { friendsLoad } from "./tabs/friends";
import { addPostLoad } from "./tabs/addPost";
import { initializeApp } from "firebase/app";
import { profileLoad } from "./tabs/profile";
import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
  } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCF_8rxNevkXu_HpnSTKvnlNUsb40rTJlI",
  authDomain: "facebookclone-c56ff.firebaseapp.com",
  projectId: "facebookclone-c56ff",
  storageBucket: "facebookclone-c56ff.appspot.com",
  messagingSenderId: "1067759188020",
  appId: "1:1067759188020:web:efc470addabc8bb2fb3261"
};

async function signIn() {
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
}

function signOutUser() {
  signOut(getAuth());
}

function getProfilePicUrl() {
  console.log(getAuth().currentUser)
  return getAuth().currentUser.photoURL;
}

function getUserName() {
  return getAuth().currentUser.displayName;
}

function initFirebaseAuth() {
  onAuthStateChanged(getAuth(), authStateObserver)
}

function authStateObserver(user) {
  if (user) {
    let profilePicUrl = getProfilePicUrl();
    let userName = getUserName();

    userPicElement.src = profilePicUrl;
    userNameElement.textContent = userName;

    userNameElement.removeAttribute('hidden');
    userPicElement.removeAttribute('hidden');
    signInBtn.setAttribute('hidden', 'true');
    signOutBtn.removeAttribute('hidden')
  }
  else {
    signInBtn.removeAttribute('hidden')
    signOutBtn.setAttribute('hidden', 'true')
    userNameElement.setAttribute('hidden', 'true');
    userPicElement.setAttribute('hidden', 'true');
  }
}

let signInBtn = document.getElementById("signIn-btn");
let signOutBtn = document.getElementById("signOut-btn");
let userPicElement = document.getElementById("user-pic");
let userNameElement = document.getElementById("user-name")

signInBtn.addEventListener("click", signIn);
signOutBtn.addEventListener("click", signOutUser);

const app = initializeApp(firebaseConfig);
initFirebaseAuth();


initialLoad();

const content = document.querySelector('#content');
const homeTab = document.querySelector('#home-tab');
homeTab.addEventListener('click', () => {
  content.innerHTML = '';
  initialLoad();
})

const friendsTab = document.querySelector('#friends-tab');
friendsTab.addEventListener('click', () => {
  content.innerHTML = '';
  friendsLoad();
})

const addPostTab = document.querySelector('#addPost-tab');
addPostTab.addEventListener('click', () => {
  content.innerHTML = '';
  addPostLoad();
})

const profileTab = document.querySelector('#user-name');
profileTab.addEventListener('click', () => {
  content.innerHTML = '';
  profileLoad();
})






