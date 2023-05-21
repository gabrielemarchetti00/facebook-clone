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

export function profileLoad() {
    content.appendChild(profileDiv);
    loadPosts()
}

function loadPosts() {
    const postsQuery = query(collection(getFirestore(), 'posts'));

    onSnapshot(postsQuery, function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            let post = change.doc.data();
            displayPost(change.doc.id, post.timestamp, post.user,
                          post.text, post.profilePicUrl, post.image);
        });
      });
}

function displayPost(id, timestamp, user, text, picUrl, image) {
    const postDiv = document.getElementById(id);
    if(postDiv) {
        const pic = postDiv.querySelector('img');
        pic.src = image;
        const desc = postDiv.querySelector('div');
        desc.textContent = text;
    }
    else {
        createPost(id, image, text);
    }
}

function createPost(id, image, text) {
    const postDiv = document.createElement('div');
    postDiv.id = id;
    postDiv.className = 'post-div';
    profileDiv.appendChild(postDiv);

    const pic = document.createElement('img');
    pic.src = image;
    const desc = document.createElement('div');
    desc.textContent = text;
    postDiv.appendChild(pic)
    postDiv.appendChild(desc)
}

const content = document.querySelector('#content');
const profileDiv = document.createElement('div');
profileDiv.id = 'profile-div'
profileDiv.textContent = "Your Posts";







