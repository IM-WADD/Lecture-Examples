const SQUARES = 3;
const tiles = document.getElementsByClassName("tile");
let emptyPos = SQUARES * SQUARES - 1; // The currently empty cell in the grid

/**
 * The event handler called when a tile is clicked.
 * Works out if the clicked tile can move to an empty space and carries out the 
 * move if it is possible.
 * @param {Event} event The JS event.
 */
function tileSelected(event) {
    // event.preventDefault();
    const tile = event.target;
    // Work out the grid cell number using the id of the clicked tile
    const currentPos = tile.parentElement.id.replace("pos", "");
    
    const colEmpty = getCol(emptyPos);
    const rowEmpty = getRow(emptyPos);
    const colCurr = getCol(currentPos);
    const rowCurr = getRow(currentPos);

    if (canMove(rowCurr, rowEmpty, colCurr, colEmpty)) {
        move(tile, currentPos, rowCurr, rowEmpty, colCurr, colEmpty);
    }
}

/**
 * Checks if the grid cell at row1, col1 is next to the grid cell at row2, col2. Returns 
 * true if the two cells are adjacent, which means that the tile in row1, col1 could move 
 * to the cell in row2, col2.
 * @param {number} row1 
 * @param {number} row2 
 * @param {number} col1 
 * @param {number} col2 
 * @returns {boolean}
 */
function canMove(row1, row2, col1, col2){
    const rowDiff = Math.abs(row1 - row2);
    const colDiff = Math.abs(col1 - col2);
    if (rowDiff == 1 && colDiff == 0 || rowDiff == 0 && colDiff == 1) {
        return true;
    }
    return false;
}


/**
 * Helper function to calculate the board row from the tile position id
 * @param {number} pos The tile's position id
 * @returns {number} The row number
 */
function getRow(pos) {
    return Math.floor(pos/SQUARES);
}


/**
 * Helper function to calculate the board column from the tile position id
 * @param {number} pos The tile's position id
 * @returns {number} The column number
 */
function getCol(pos) {
    return pos % SQUARES;
}


/**
 * Moves a tile from one grid cell to another.
 * Note: the animation is carried out manually using JavaScript rather than CSS. A timer 
 * is used to gradually move the tile one pixel at a time.
 * @param {HTMLElement} tile The tile to move
 * @param {number} from The tile's current position (from the parent id)
 * @param {number} rowCurr The row the tile is currently in
 * @param {number} rowEmpty The row the tile should move to
 * @param {number} colCurr The column the tile is currently in
 * @param {number} colEmpty The column the tile should move to
 */
function move(tile, from, rowCurr, rowEmpty, colCurr, colEmpty) {
    let timeCount = 0;
    
    let id = setInterval(function() { 
        // call the shit() nested function (see below) every 5 milliseconds
        shift();
    }, 5);
    
    let left = 0;
    let top = 0;

    /**
     * The animation function. Moves the tile one pixel at a time.
     */
    function shift() {
        // If in position, stop animation
        if (timeCount == tile.offsetWidth) {
            clearInterval(id);
            document.getElementById("pos" + emptyPos).appendChild(tile);
            tile.style.left = '0px';
            tile.style.top = '0px';
            emptyPos = from;
        } 
        // Continue the animation
        else {
            timeCount++; 
            if (rowCurr < rowEmpty) {
                top += 1;
                tile.style.top = top + 'px'; 
            }
            else if (rowCurr > rowEmpty) {
                top -= 1;
                tile.style.top = top + 'px'; 
            }
            else if (colCurr < colEmpty) {
                left += 1;
                tile.style.left = left + 'px';
            } else {
                left -= 1;
                tile.style.left = left + 'px'; 
            }
        }
    }
}

/**
 * Shuffle the tiles.
 */
function shuffle() {
    const MOVES = 25;
    for (let m = 0; m < MOVES; m++) {
        let moved = false;
        let colEmpty = getCol(emptyPos);
        let rowEmpty = getRow(emptyPos);
        
        while (!moved) {
            // Pick a random tile
            tileIndex = Math.floor(Math.random() * Math.floor(tiles.length));
            let currentPos = tiles[tileIndex].parentElement.id.replace("pos", "");
            let colCurr = getCol(currentPos);
            let rowCurr = getRow(currentPos);
            if (canMove(rowCurr, rowEmpty, colCurr, colEmpty)) {
                document.getElementById("pos" + emptyPos).appendChild(tiles[tileIndex]);
                emptyPos = currentPos;
                moved = true;
            }
        }
    }
}


/**
 * Puts the tiles in their correct positions.
 */
function reset() {
    const tileContainers = document.getElementsByClassName("tile-container");
    for (const container of tileContainers) {
        const posNum = container.id.replace("pos", "");
        // find the tile that should be in this container
        const correctTileImg = document.getElementById("img" + posNum);
        if (correctTileImg) {
            const correctTile = correctTileImg.parentElement;
            container.appendChild(correctTile);
        }
    }
    emptyPos = SQUARES * SQUARES - 1;
}


// Add event listeners to the tiles to move when selected
for(let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", function (e) { 
        tileSelected(e)
    });
}

// Add event listener to the shuffle button
document.getElementById("shuffle-board").addEventListener("click", shuffle);
document.getElementById("show-finished").addEventListener("click", reset);

// Shuffle the board
shuffle();