class Card {
    #image;
    #value;
    #suit;

    /**
     * Creates a new playing card
     * @param {number} value 
     * @param {string} suit 
     */
    constructor(value, suit) {
        this.#value = value;
        this.#suit = suit;
        this.#image = "images/" + value + "_of_" + suit + ".png";
    }

    /**
     * Gets the value of the card
     * @returns {number}
     */
    getValue() {
        return this.#value;
    }

    /**
     * Gets the suit of the card
     * @returns {number}
     */
    getSuit() {
        return this.#suit;
    }

    /**
     * Gets the path to the image for this card
     * @returns {string}
     */
    getImage() {
        return this.#image;
    }

}

/**
 * Creates a new deck of cards and returns it as an array
 * @returns {Card[]} An array of Card objects
 */
function createDeck() {
    const cards = [];
    const suits = ["clubs", "diamonds", "hearts", "spades"];
    for (const suit of suits) {
        for (let i = 1; i < 14; i++) {
            cards.push(new Card(i, suit));
        }
    }
    return cards;
}

/**
 * Shuffles an array
 * @param {any[]} arr An array containing any data type
 */
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const swapIndex = Math.floor(Math.random() * i);
        let temp = arr[i];
        arr[i] = arr[swapIndex];
        arr[swapIndex] = temp;
    }
}

/**
 * Removes the deck from the display
 */
function clearDeck() {
    const deckArea = document.getElementById("deck");
    while (deckArea.hasChildNodes()) {
        deckArea.removeChild(deckArea.firstChild);
    }
}

/**
 * Display the deck of cards
 * @param {Card[]} cards An array of cards
 */
function displayDeck(cards) {
    clearDeck();
    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement("img");
        card.setAttribute("src", cards[i].getImage());
        card.setAttribute("alt", cards[i].getValue() + " of " + cards[i].getSuit());
        document.getElementById("deck").appendChild(card);
    }
}

/**
 * Filters the deck of cards
 * @param {string} filter Either "all" or the name of a suit
 * @returns {Card[]}
 */
function filterDeck(filter) {
    if (filter === "all") {
        return deck;
    }
    else {
        return deck.filter(function (card) {
            return card.getSuit() === filter
        });
    }
}

const deck = createDeck();
displayDeck(deck);

document.getElementById("shuffle").addEventListener("click", function () {
    shuffle(deck); // shuffle the whole deck, even if filtered
    displayDeck(filterDeck(document.getElementById("filter").value));
});

document.getElementById("sort-value").addEventListener("click", function () {
    deck.sort(function (a, b) {
        if (a.getValue() < b.getValue()) {
            return -1;
        } else if (a.getValue() === b.getValue()) {
            return 1;
        } else return 0;
    });
    displayDeck(filterDeck(document.getElementById("filter").value));
});

document.getElementById("sort-suit").addEventListener("click", function () {
    deck.sort(function (a, b) {
        if (a.getSuit() < b.getSuit()) {
            return -1;
        } else if (a.getSuit() === b.getSuit()) {
            return 1;
        } else return 0;
    });
    displayDeck(filterDeck(document.getElementById("filter").value));
});

document.getElementById("filter").addEventListener("change", function () {
    displayDeck(filterDeck(document.getElementById("filter").value));
})