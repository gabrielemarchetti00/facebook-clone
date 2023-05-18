import { initializeApp } from "firebase/app";
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

const app = initializeApp(firebaseConfig);

async function signIn() {
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
}

let signInBtn = document.getElementById("signIn-btn");
signInBtn.addEventListener("click", signIn);