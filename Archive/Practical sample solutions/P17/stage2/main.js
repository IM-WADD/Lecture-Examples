const nameInput = document.getElementById("name");
const saveButton = document.getElementById("save");
const countButton = document.getElementById("count");
const counters = document.getElementById("counters");

saveButton.addEventListener("click", addCounter);

const DB_NAME = "CounterDB";
const STORE_NAME = "Counters";

let db;

/**
 * Open the database
 */
function openDB() {
    const request = indexedDB.open(DB_NAME);

    // If an existing database is opened successfully...
    request.addEventListener("success", function (event) {
        db = event.target.result;
        // Get all saved counters and draw them to the screen
        getAllCounters();
    });

    // The database doesn't exist yet... create it
    request.addEventListener("upgradeneeded", function (event) {
        db = event.target.result;
        // Add the store with "name" as the unique key for each object
        db.createObjectStore(STORE_NAME, {keyPath: "name", autoIncrement: false});
    });
}

/**
 * Save a new counter
 */
function addCounter() {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const request = store.add({name: nameInput.value, value: 0});

    // If the counter is added successfully
    request.addEventListener("success", function (event) {
        // Show the counter. event.target.result will contain the added data's keyPath (its name)
        showCounter(event.target.result);
    });
}

/**
 * Show a counter
 * @param {string} name The saved name of the counter
 */
function showCounter(name) {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);

    const request = store.get(name);

    // If the get request is successful...
    request.addEventListener("success", function (event) {
        const data = event.target.result;
        // If the data is not undefined
        if (data) {
            // Create the HTML elements to display the counter
            const newCounter = document.createElement("p");
            newCounter.innerText = data.name + ": " + data.value + " ";
            const countBtn = document.createElement("button");
            countBtn.innerText = "Count";

            // Add an event handler to the Count button for the counter
            countBtn.addEventListener("click", function (event) {
                const countTransaction = db.transaction(STORE_NAME, "readwrite");
                const store = countTransaction.objectStore(STORE_NAME);
                // Update the value of the counter in the store
                const putRequest = store.put({
                    name: data.name,
                    value: parseInt(data.value) + 1
                });

                // If the counter is successfully updated
                putRequest.addEventListener("success", function (event) {
                    // Redraw all saved counters
                    getAllCounters();
                });
            });
            newCounter.appendChild(countBtn);
            counters.appendChild(newCounter);
        }
    });
}

/**
 * Get and draw all saved counters
 */
function getAllCounters() {
    // Remove any child nodes in the counters div
    while (counters.children.length > 0) {
        counters.removeChild(counters.childNodes[0]);
    }

    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);

    // Open a cursor to iterate through all data
    const request = store.openCursor();

    // If the cursor is opened successfully...
    request.addEventListener("success", function (event) {
        // The data the cursor is point at
        const cursor = event.target.result;

        // The data is not undefined / empty
        if (cursor) {
            // Get the data stored at the cursor
            const dataRequest = store.get(cursor.key);

            // If the data is retrieved successfully
            dataRequest.addEventListener("success", function (event) {
                const data = event.target.result;
                // Show the counter
                showCounter(data.name);
            })

            // Move the cursor to the next entry
            cursor.continue();
        }
    });
}

openDB();