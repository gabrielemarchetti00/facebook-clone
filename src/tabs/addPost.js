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
    addPostBtn.addEventListener('click', addPost)
}

const picInput = document.createElement('input');
picInput.id = 'pic-input'
picInput.type = 'file'

const textInput = document.createElement('input');
textInput.id = 'text-input'

const posts = [];

function addPost(e) {
    e.preventDefault();
    posts.push({pic: picInput.value, desc: textInput.value})
    console.log(posts)
}


