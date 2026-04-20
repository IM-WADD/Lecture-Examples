// The Google Sheet can be found at: https://docs.google.com/spreadsheets/d/1CS3LIeM0_7m6sVy6W1rqVHKSXrlTnk3UAA5AFpoayBw/edit?gid=398550332#gid=398550332

const DB_ENDPOINT = "https://script.google.com/macros/s/AKfycbyXsSOQmlzE_jDfqhn4rp6z5bVFJ8LHWsw0Dh4nvfAXynEzBQSeQi-_av1JzOK3Wde2/exec";

/** FYI - The readData function includes an implementation of a finite state machine to communicate request status (extension stage 6) */

// The possible request statuses
const requestStatus = {
    idle: "idle",
    loading: "loading",
    success: "success",
    error: "error"
};

// The current request status (initially idle)
let currentRequestStatus = requestStatus.idle;

/**
 * Set the current request status and update the display accordingly
 * @param {string} status 
 */
function setRequestStatus(status) {
    currentRequestStatus = status;
    displayRequestStatus();
}

/**
 * Update the display based on the current request status
 */
function displayRequestStatus() {
    switch (currentRequestStatus) {
        case requestStatus.idle:
            // Show nothing when idle
            break;
        case requestStatus.loading:
            document.body.innerHTML = "<div class='progress'></div>";
            break;
        case requestStatus.success:
            document.body.innerHTML = "<p class='success'>Request completed successfully! Open the console to see.</p>";
            break;
        case requestStatus.error:
            document.body.innerHTML = "<p class='error'>Request failed! Check the console for more details.</p>";
            break;
    }
}

/**
 * Read all data from a table in the database and log it to the console
 * @param {string} table The table name (the tab name in the Google Sheet) to read data from
 */
async function readData(table) {
    try {
        setRequestStatus(requestStatus.loading);
        // Step 1. Request data from the database
        const response = await fetch(`${DB_ENDPOINT}?table=${table}`);
        // Step 2. Convert the response to JSON format
        const data = await response.json();

        setRequestStatus(requestStatus.success);
        console.log(data);
    } catch (error) {
        setRequestStatus(requestStatus.error);
        console.error("Error fetching data:", error);
    }
}

/**
 * Add data to a table in the database
 * @param {string} table The table name (the tab name in the Google Sheet) to add data to
 * @param {Object} dataToAdd The data to add to the table. The object keys should match the column names in the 
 * Google Sheet, and the values should be the data to add to those columns. All columns must be included in the 
 * dataToAdd object.
 */
async function addData(table, dataToAdd) {
    try {
        // Step 1. Send a POST request to the database with the data to add
        const response = await fetch(`${DB_ENDPOINT}?table=${table}`, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                action: "add",
                data: dataToAdd
            })
        });
        // Step 2. Convert the response to JSON format
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error("Error adding data:", error);
    }
}

/**
 * Update data in a table in the database. All rows that match the dataToSelect object will be updated with the data in the dataToUpdate object.
 * @param {string} table The table name (the tab name in the Google Sheet) to update data in
 * @param {Object} dataToSelect The data to select rows to update. The object keys should match the column names in the 
 * Google Sheet, and the values should be the data to search for in those columns.
 * @param {Object} dataToUpdate The data to update the selected rows with. The object keys should match the column names in the 
 * Google Sheet, and the values should be the data to update those columns in the selected rows.
 */
async function updateData(table, dataToSelect, dataToUpdate) {
    try {
        // Step 1. Send a POST request to the database with the data to update
        const response = await fetch(`${DB_ENDPOINT}?table=${table}`, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                action: "update",
                data: {
                    select: dataToSelect,
                    update: dataToUpdate
                }
            })
        });
        // Step 2. Convert the response to JSON format
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error("Error updating data:", error);
    }
}


/**
 * Delete data from a table in the database. All rows that match the dataToSelect object will be deleted.
 * @param {string} table The table name (the tab name in the Google Sheet) to delete data from
 * @param {Object} dataToSelect The data to select rows to delete. The object keys should match the column names in the 
 * Google Sheet, and the values should be the data to search for in those columns.
 */
async function deleteData(table, dataToSelect) {
    try {
        // Step 1. Send a POST request to the database with the data to delete
        const response = await fetch(`${DB_ENDPOINT}?table=${table}`, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                action: "delete",
                data: {
                    select: dataToSelect
                }
            })
        });
        // Step 2. Convert the response to JSON format
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error("Error deleting data:", error);
    }
}


/** Example usage of the database functions */

// Read data from Table1
readData("Table1");

// read data from Table2
readData("Table2");

// Add data to Table2
const data = { ID: 4, ColumnB: "ABC", ColumnC: "XYZ" };
addData("Table2", data);

// Update data in Table2 (update the row with ID 4 to have ColumnB = "DEF" and ColumnC = "UVW")
const selectForUpdate = { ID: 4 };
const updateValues = { ColumnB: "DEF", ColumnC: "UVW" };
updateData("Table2", selectForUpdate, updateValues);

// Delete data from Table2 (delete the row with ID 4)
deleteData("Table2", selectForUpdate);