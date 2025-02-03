const rooms = []; // An array to store all room objects (including offices and classrooms)
const tableBody = document.getElementById("rooms");

/** DATA DISPLAY FUNCTIONS */
/**
 * Creates a new table row containing information about a Room.
 * @param {Room} room 
 * @returns An HTML row element (<tr>) containing information about the room
 */
function createRow(room) {
    const newRow = document.createElement("tr");
    const building = document.createElement("td");
    building.innerText = room.buildingName;
    const roomNumber = document.createElement("td");
    roomNumber.innerText = room.roomNumber;
    const roomType = document.createElement("td");
    if (room.hasOwnProperty("occupants")) {
        roomType.innerText = "Office";
    } else if (room.hasOwnProperty("numSeats")) {
        roomType.innerText = "Classroom"
    }
    else {
        roomType.innerText = "Unspecified"
    }
    newRow.appendChild(building);
    newRow.appendChild(roomNumber);
    newRow.appendChild(roomType);
    return newRow;
}

/**
 * Clears the table and repopulates it with rooms in the rooms array
 */
function showAllRooms() {
    // Clear the current table contents
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
    for (let room of rooms) {
        tableBody.appendChild(createRow(room));
    }
}

/** Show / hide the form inputs that are relevant to the selected room type */
document.getElementById("type").addEventListener("change", function () {
    if (document.getElementById("type").value === "office") {
        document.getElementById("office-details").style.display = "block";
        document.getElementById("classroom-details").style.display = "none";
    }
    else if (document.getElementById("type").value === "classroom") {
        document.getElementById("classroom-details").style.display = "block";
        document.getElementById("office-details").style.display = "none";
    }
})

/**
 * Adds a new room when the form is submitted. Does not do any input validation.
 */
document.getElementById("add").addEventListener("click", function (event) {
    event.preventDefault();
    const roomType = document.getElementById("type").value;
    const building = document.getElementById("building").value.toUpperCase();
    const number = document.getElementById("number").value;
    let newRoom;
    /** IMPORTANT - this code is missing input validation, which would be important for a real form */
    if (roomType === "office") {
        const occupants = document.getElementById("occupants").value.length > 0 ?
                            document.getElementById("occupants").value
                                                              .split(",") // Splits the string at each comma and returns an array of strings
                                                              .map(name => name.trim()) // Trims whitespace from each entry in the array
                            : [];
        newRoom = new Office(building, number, occupants);
    } else if (roomType === "classroom") {
        const numSeats = document.getElementById("numSeats").value;
        const hasProjector = document.getElementById("projector").checked;
        newRoom = new Classroom(building, number, numSeats, hasProjector);
    }
    rooms.push(newRoom);
    tableBody.appendChild(createRow(newRoom));
});

// All Office and Classroom objects have properties and methods associated with the Room object as well as their own.
let office = new Office("RCH", 330, ["Abi", "Hasmik"]);
let lmb = new Classroom("LMB", "002", 80, true);

rooms.push(office);
rooms.push(lmb);

for (let room of rooms) {
    console.log(room.display());
}

showAllRooms();

/** DATA STRUCTURES */

/**
 * Constructor for a Room object
 * @param {string} buildingName 
 * @param {number | string} roomNumber 
 * @returns A Room object with buildingName and roomNumber properties
 */
function Room(buildingName, roomNumber) {
    this.buildingName = buildingName;
    this.roomNumber = roomNumber;
    this.display = function() { return this.buildingName + "/" + this.roomNumber; }
}


/**
 * A constructor for an Office object - a specialised type of Room
 * @param {string} buildingName 
 * @param {number | string} roomNumber 
 * @param {Array} occupants 
 * @returns An Office object that inherits Room
 */
function Office(buildingName, roomNumber, occupants) {
    let newOffice = new Room(buildingName, roomNumber);
    newOffice.occupants = occupants;
    newOffice.isOccupied = function() { return this.occupants.length > 0; }
    return newOffice;
}


/**
 * A constructor for a Classroom object - a specialised type of Room
 * @param {string} buildingName 
 * @param {number | string} roomNumber 
 * @param {number} numSeats 
 * @param {Boolean} hasProjector 
 * @returns A Classroom object
 */
function Classroom(buildingName, roomNumber, numSeats, hasProjector) {
    let newClassroom = new Room(buildingName, roomNumber);
    newClassroom.numSeats = numSeats;
    newClassroom.hasProjector = hasProjector;
    newClassroom.isSuitable = function(requiredSeats, projectorRequired) { return this.numSeats >= requiredSeats && (this.hasProjector || !projectorRequired)}
    return newClassroom;
}