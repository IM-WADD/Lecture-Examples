const submitBtn = document.getElementById("add_user");
const userText = document.getElementById("new_user");
const users = document.getElementById("users");

const DB_NAME = "WADD_DB";
const STORE_NAME = "Users";

let db;

submitBtn.addEventListener("click", function () {
    addUser(userText.value);
})

/**
 * Open / create the database.
 */
function openDB() {
    const request = indexedDB.open(DB_NAME);
    
    // If the request is successful, assign the database to the global db variable
    request.addEventListener("success", function (event) {
        db = event.target.result;
        console.log("db opened!");
        getExistingUsers();
        // Do something
    });

    // If the request fails, print the error message.
    request.addEventListener("error", function (error) {
        console.log("Something went wrong", error);
    });

    /**
     * The upgradeneeded event is the only way to add new object stores, or to 
     * add an index to existing store. This event *should* fire if the 
     * database version number is changed when opening it. If that doesn't work, 
     * delete the database via the Application tab in Chrome dev tools. 
     */
    request.addEventListener("upgradeneeded", function (event) {
        db = event.target.result;
        db.createObjectStore(STORE_NAME, {keyPath: "username", autoIncrement: false});
        // store.createIndex("username", "username", {unique: true});
        console.log("db upgraded");
    });
}

/**
 * Get the users saved in the database and show them
 */
function getExistingUsers() {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);

    // Asks to "point" a cursor at the first item in the object store
    const request = store.openCursor();
    
    request.addEventListener("success", function (event) {
        const cursor = event.target.result;
        // Checks if the cursor is pointing at data
        if (cursor) {
            // There is data to look at
            const dataRequest = store.get(cursor.key);

            dataRequest.addEventListener("success", function (event) {
                const data = event.target.result;
                const item = document.createElement("li");
                item.innerText = data.username;
                users.appendChild(item);
                console.log(data.username);
            });

            dataRequest.addEventListener("error", function (error) {
                console.log("Couldn't get data", error);
            });

            cursor.continue();
        } else {
            console.log("no data in the store");
        }
    });

    request.addEventListener("error", function (error) {
        console.log("Couldn't open cursor", error);
    });

    // Move on to the next item in the store
}

/**
 * Add a new name to the database if it doesn't exist already.
 * @param {string} name 
 */
function addUser(name) {
    // Check if the user exists. If not, add the user
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const request = store.get(name);

    request.addEventListener("success", function (event) {
        const result = event.target.result;
        if (result === undefined) {
            const addRequest = store.add({username: name});
            addRequest.addEventListener("success", function (event) {
                console.log(event.target.result, "added to the database");
                // Update the list of existing users
                const item = document.createElement("li");
                item.innerText = name;
                users.appendChild(item);
            });
            addRequest.addEventListener("error", function (error) {
                console.log("Error adding a name", error);
            })
        } else {
            console.log(result, "The name is already in the database, don't add.")
        }
    });

    request.addEventListener("error", function (error) {
        console.log("Error fetching data", error);
    })
}

// Open / create the database on page load
openDB();