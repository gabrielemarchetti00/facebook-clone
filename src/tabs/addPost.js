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
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage';
import { getUserName, getProfilePicUrl } from '..';
import { getAuth } from 'firebase/auth';

export function addPostLoad() {
    const content = document.querySelector('#content');

    const addPostDiv = document.createElement('div');
    addPostDiv.id = 'addpost-div'
    content.appendChild(addPostDiv);

    //creating form
    const addPostForm = document.createElement('form');
    addPostForm.id = 'addpost-form'
    addPostDiv.appendChild(addPostForm);

    const picDiv = document.createElement('div')
    const picLabel = document.createElement('label');
    picLabel.textContent = 'Choose photo'
    picLabel.setAttribute('for', picInput.id)
    picDiv.appendChild(picLabel)
    picDiv.appendChild(picInput)

    const textDiv = document.createElement('div')
    const textLabel = document.createElement('label');
    textLabel.textContent = 'Write description'
    textLabel.setAttribute('for', textInput.id)
    textDiv.appendChild(textLabel)
    textDiv.appendChild(textInput)

    addPostForm.appendChild(picDiv);
    addPostForm.appendChild(textDiv);

    const addPostBtn = document.createElement('button');
    addPostBtn.id = 'addpost-btn'
    addPostBtn.type = 'submit'
    addPostBtn.textContent = 'Create New Post'
    addPostForm.appendChild(addPostBtn)

    //adding post
    addPostBtn.addEventListener('click', savePost)
}

// Add a new message entry to the Firebase database.
async function savePost(e) {
    e.preventDefault();
    try {
        const postRef = await addDoc(collection(getFirestore(), 'posts'), {
            user: getUserName(),
            profilePicUrl: getProfilePicUrl(),
            text: textInput.value,
            image: LOADING_IMAGE_URL,
            timestamp: serverTimestamp()
        });
    
        const filePath = `${getAuth().currentUser.uid}/${postRef.id}/${picInput.files[0].name}`;
        const newImageRef = ref(getStorage(), filePath);
        const fileSnapshot = await uploadBytesResumable(newImageRef, picInput.files[0]);
        const publicImageUrl = await getDownloadURL(newImageRef);

        await updateDoc(postRef,{
            image: publicImageUrl,
            storageUri: fileSnapshot.metadata.fullPath
        });
    }
    catch(error) {
        console.error('Error writing new message to Firebase Database', error);
    }
}

let LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

const picInput = document.createElement('input');
picInput.id = 'pic-input'
picInput.type = 'file'

const textInput = document.createElement('input');
textInput.id = 'text-input'




