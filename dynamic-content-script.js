let posts = []; // Store initially fetched posts
let loading = false; // Prevent multiple event triggers at once

function fetchPosts() { // Used to initially fetch and fill posts array
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error with the status: " + response.status);
        }
        return response.json();
    })
    .then((postData) => {
        posts = postData; // Fills the post array with the fetched data
        loadPosts();
    })
}

function loadPosts() {
    let container = document.getElementById("container");

    let i = 1, limit = 9;
    for (post of posts) {
        if (i <= limit) {
            console.log(posts);
            const article = document.createElement("article");
            const title = document.createElement("h1");
            title.textContent = post.title;
            const body = document.createElement("p");
            body.textContent = post.body;
            article.appendChild(title);
            article.appendChild(body);
            article.setAttribute("class", "post-styling");
            container.appendChild(article);
            posts.shift();
            i++;
        }
    }
    loading = false;
}

// Fetches and initializes the posts array
fetchPosts();

window.onscroll = function() {
    // Checking if the user has scrolled to the bottom, if it has load more
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 75 && !loading) {
        loading = true; // Prevent multiple fetches at once
        loadPosts();
    }
};