const rooms = []; // An array to store all room objects (including offices and classrooms)
const tableBody = document.getElementById("rooms");

/** DATA STRUCTURES */

/**
 * A class representing a room
 */
class Room {
    buildingName;
    roomNumber;

    /**
     * Creates a new Room
     * @param {string} buildingName 
     * @param {number | string} roomNumber 
     */
    constructor(buildingName, roomNumber) {
        this.buildingName = buildingName;
        this.roomNumber = roomNumber;
    }

    /**
     * Creates a string for display purposes.
     * @returns A formatted string representing the room
     */
    display() {
        return this.buildingName + "/" + this.roomNumber;
    }
}

/**
 * A class representing an office
 */
class Office extends Room {
    occupants;

    /**
     * Creates a new office
     * @param {string} buildingName 
     * @param {number | string} roomNumber 
     * @param {string[]} occupants 
     */
    constructor(buildingName, roomNumber, occupants) {
        super(buildingName , roomNumber);
        this.occupants = occupants
    }

    /**
     * Checks if the room has occupants 
     * @returns {Boolean}
     */
    isOccupied() {
        return this.occupants.length > 0;
    }
}

/**
 * A Classroom class
 */
class Classroom extends Room {
    numSeats;
    hasProjector;

    /**
     * Constructs a Classroom
     * @param {string} buildingName 
     * @param {string | number} roomNumber 
     * @param {number} numSeats The number of seats
     * @param {Boolean} hasProjector Does the room have a projector
     */
    constructor(buildingName, roomNumber, numSeats, hasProjector) {
        super(buildingName, roomNumber);
        this.numSeats = numSeats;
        this.hasProjector = hasProjector;
    }

    /**
     * Checks if the classroom is can accommodate the request
     * @param {number} requiredSeats Seats required
     * @param {Boolean} projectorRequired Whether a projector is required
     * @returns {Boolean}
     */
    isSuitable(requiredSeats, projectorRequired) {
        return this.numSeats >= requiredSeats && (this.hasProjector || !projectorRequired);
    }
}

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
    } else {
        newRoom = new Room(building, number);
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

