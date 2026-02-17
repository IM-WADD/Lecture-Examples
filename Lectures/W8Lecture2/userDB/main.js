const main = document.getElementsByTagName("main")[0];
const postArea = document.getElementById("posts");

const API = "https://script.google.com/macros/s/AKfycbxSQwAxW_hwbgnIMEjUR6pS3eo-n4I-3gr4kh7dOwCDjuTKccqfXpBT_somFPb6MEHJ/exec";
const tables = {
    profiles: "Profiles",
    posts: "Posts",
}

/**
 * Get all users from the "database".
 */
async function getAllUsers() {
    // Calling the API
    const apiURL = `${API}?table=${tables.profiles}`;
    // Step 1 - request data from the API
    const result = await fetch(apiURL);
    // Step 2 - get the JSON data out of the API response
    const resultJSON = await result.json();
    // Step 3 - get the data from the JSON object, convert it to a JS object, and return it
    return JSON.parse(resultJSON.data);
}

/**
 * Create the HTML element to display user information
 * @param {Object} user Contains data about a user profile
 * @returns {HTMLDivElement} The element to display the user information
 */
function makeUser(user) {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user");

    const profilePic = document.createElement("img");
    profilePic.setAttribute("src", user.ProfilePic);
    profilePic.setAttribute("alt", `${user.FirstName} ${user.LastName}`);
    userDiv.appendChild(profilePic);

    const info = document.createElement("div");
    const name = document.createElement("h2");
    name.innerText = `${user.FirstName} ${user.LastName}`;
    const username = document.createElement("p");
    username.innerText = `@${user.User}`;
    info.appendChild(name);
    info.appendChild(username);


    const counter = document.createElement("p");
    counter.setAttribute("id", `${user.User}-count`)
    counter.innerHTML = `&#x1F44B; ${user.HighFives}`;
    info.appendChild(counter);

    const actions = document.createElement("div");
    actions.setAttribute("class", "actions");

    const showPostsBtn = document.createElement("button");
    showPostsBtn.innerText = `Show ${user.User}'s posts`;
    showPostsBtn.addEventListener("click", () => getPostsBy(user.User));

    const highFiveBtn = document.createElement("button");
    highFiveBtn.innerText = `High five ${user.User}`;
    highFiveBtn.addEventListener("click", () => updateUser(user.User));

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = `Remove ${user.User}`;
    deleteBtn.addEventListener("click", () => deleteUser(user.User));

    actions.appendChild(showPostsBtn);
    actions.appendChild(highFiveBtn);
    actions.appendChild(deleteBtn);


    userDiv.appendChild(info);
    userDiv.appendChild(actions);

    return userDiv;
}

/**
 * Adds all users to the DOM
 * @param {Object[]} users An array of objects containing user information.
 */
function displayAllUsers(users) {
    for (const user of users) {
        main.appendChild(makeUser(user));
    }
}

/**
 * Gets all posts by a given user.
 * @param {string} username 
 */
async function getPostsBy(username) {
    const apiURL = `${API}?table=${tables.posts}`;
    const results = await fetch(apiURL);
    const posts = await results.json();
    const converted = JSON.parse(posts.data);
    const postsByUser = converted.filter(post => post.Author === username);
    showPosts(username, postsByUser);
}

/**
 * Show all posts by a given user in the post area. If there are no posts, show a message indicating that there are no posts to show.
 * @param {string} username 
 * @param {Object[]} posts 
 * @returns Nothing. This function modifies the DOM to show the posts.
 */
function showPosts(username, posts) {
    postArea.innerHTML = "";
    const heading = document.createElement("h2");
    heading.innerText = `Posts by @${username}`;
    postArea.appendChild(heading);
    if (posts.length === 0) {
        const noPosts = document.createElement("p");
        noPosts.innerText = "No posts to show.";
        postArea.appendChild(noPosts);
        return;
    }
    for (const post of posts) {
        const postArticle = document.createElement("article");
        postArticle.classList.add("post");
        const title = document.createElement("h3");
        title.innerText = post.Title;
        postArticle.appendChild(title);

        const date = document.createElement("p");
        date.innerText = `Posted on ${post.Date}`;
        postArticle.appendChild(date);

        const content = document.createElement("p");
        content.innerText = post.Contents;
        postArticle.appendChild(content);
        postArea.appendChild(postArticle);
    }

    window.scrollTo({
            top: postArea.offsetTop,
            left: 0,
            behavior: 'smooth'
        });
}
/**
 * FOR TESTING ONLY
 * Demonstrates use of a POST request to add a user to the database.
 */
async function addUser() {
    const apiURL = `${API}?table=${tables.profiles}`;
    const rawResponse = await fetch(apiURL, {
        method: 'POST',
        headers: {
        'Content-Type': 'text/plain;charset=utf-8'
        },
        mode: "cors",
        body: JSON.stringify({
            action: "add",
            data: {
                User: "whitepanda633", 
                FirstName: 'Violeta', 
                LastName: 'Moya', 
                ProfilePic: "https://randomuser.me/api/portraits/med/women/17.jpg",
                HighFives: "0"
            }
        })
    });
    const content = await rawResponse.json();
    console.log(content);
}

/**
 * Sends an update request to the database to increase a user's high five count. An update 
 * request will update ALL matching users in the database.
 * If the request is successful, the page will reload to pull the latest data.
 * @param {String} username The username of the profile to update.
 */
async function updateUser(username) {
    const currentCountText = document.getElementById(`${username}-count`);
    const textParts = currentCountText.innerText.split(" ");
    const newValue = parseInt(textParts[1]) + 1;
    const apiURL = `${API}?table=${tables.profiles}`;
    // Step 1 - request data from the API
    const rawResponse = await fetch(apiURL, {
        method: 'POST',
        headers: {
        'Content-Type': 'text/plain;charset=utf-8'
        },
        mode: "cors",
        body: JSON.stringify({
            action: "update",
            data: {
                select: {
                    User: username
                },
                update: {
                    HighFives: newValue.toString()
                }
            }
        })
    });
    const content = await rawResponse.json();
    console.log(content);
    if (content.status === 200) { // 200 is the success code for fetch requests
        currentCountText.innerText = `${textParts[0]} ${newValue}`
    }
}


/**
 * Deletes the user with the given username from the database. If there are duplicates, 
 * all matching users will be deleted.
 * @param {String} username The username of the user to be deleted.
 */
async function deleteUser(username) {
   const apiURL = `${API}?table=Friends`;
    // Step 1 - request data from the API
    const rawResponse = await fetch(apiURL, {
        method: 'POST',
        headers: {
        'Content-Type': 'text/plain;charset=utf-8'
        },
        mode: "cors",
        body: JSON.stringify({
            action: "delete",
            data: {
                select: {
                    User: username
                }
            }
        })
    });
    const content = await rawResponse.json();
    console.log(content);
    if (content.status === 200) { // 200 is the success code for fetch requests
        window.location.reload();
    }
}


const users = await getAllUsers();
displayAllUsers(users);
//addUser();
