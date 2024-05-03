class Artist {
    #name; // API field: artist_title
    #id; // API field: artist_id
    #displayText; // API field: artist_display

    /**
     * Create a new artist
     * @param {string} name The artist's name
     * @param {string} id The Art Institute ID for this artist
     * @param {string} displayText The display text for the artist
     */
    constructor(name, id, displayText) {
        this.#name = name;
        this.#id = id;
        this.#displayText = displayText;
    }

    /**
     * Gets the display text as a paragraph element
     * @returns {HTMLParagraphElement} A paragraph with the artist's display text and class "artist"
     */
    getDisplayElement() {
        const p = document.createElement("p");
        p.setAttribute("class", "artist");
        p.innerText = this.#displayText;
        return p;
    }
}

class Thumbnail {
    #imageId; // API field: image_id
    #altText; // API field: thumbnail.alt_text

    /**
     * Create a new Thumbnail for an artwork
     * @param {string} dataUrl The image as a data URL
     * @param {string} altText Alternative text description
     */
    constructor(imageId, altText) {
        this.#imageId = imageId;
        this.#altText = altText;
    }

    /**
     * Creates an HTML image to display the thumbnail
     * @returns {HTMLImageElement} An image element with class "thumbnail"
     */
    getDisplayElement() {
        const img = document.createElement("img");
        img.setAttribute("alt", this.#altText);
        img.setAttribute("class", "thumbnail");
        img.setAttribute("src", `https://www.artic.edu/iiif/2/${this.#imageId}/full/843,/0/default.jpg`);
        return img;
    }
}

class Artwork {
    #title; // API field: title
    #artist; // an Artist object
    #date; // API field: date_display
    #description; // API field: short_description
    #keywords; // API fields: term_titles
    #thumbnail; // a Thumbnail object

    /**
     * Creates a new Artwork
     * @param {string} title 
     * @param {Artist} artist
     * @param {string} date 
     * @param {string} description 
     * @param {string[]} keywords 
     * @param {Thumbnail} thumbnail 
     */
    constructor(title, artist, date, description, keywords, thumbnail) {
        this.#title = title;
        this.#artist = artist;
        this.#date = date;
        this.#description = description;
        this.#keywords = keywords;
        this.#thumbnail = thumbnail;
    }

    /**
     * Creates a div containing information about the artwork
     * @returns {HTMLDivElement} A div containing all text about the artwork
     */
    #getDescription() {
        const div = document.createElement("div");
        div.setAttribute("class", "info");
        const title = document.createElement("h3");
        title.innerText = this.#title;
        const date = document.createElement("p");
        date.setAttribute("class", "date");
        date.innerText = this.#date;
        const artist = this.#artist.getDisplayElement();
        const p = document.createElement("p");
        p.innerText = this.#description;
        div.appendChild(title);
        div.appendChild(date);
        div.appendChild(artist);
        div.appendChild(p);
        return div;
    }

    /**
     * Creates an HTML element to display the artwork
     * @returns {HTMLDivElement} A div with class "artwork"
     */
    getDisplayElement() {
        const container = document.createElement("div");
        container.setAttribute("class", "artwork");
        container.appendChild(this.#getDescription());
        container.appendChild(this.#thumbnail.getDisplayElement());
        return container;
    }

    matchesKeyword(search) {
        for (const term of this.#keywords) {
            if (term.toLowerCase().includes(search)) {
                return true;
            }
        }
        return false;
    }
}

const API = "https://api.artic.edu/api/v1/artworks?limit=100";
const submitButton = document.getElementById("submit");
const queryInput = document.getElementById("query");
const resultsDiv = document.getElementById("results");
let storedArtworks = [];

submitButton.addEventListener("click", event => {
    event.preventDefault();
    if (storedArtworks.length === 0) {
        getData();
    }
    else {
        console.log("filtered")
        showArtworks(storedArtworks);
    }
});

/**
 * Fetches artwork data from Chicago Art Institute API and uses it 
 * to populate the storedArtworks array
 */
const getData = () => {
    fetch(API).then(response => response.json())
              .then(data => {
                const artworks = data.data;
                // Convert the artworks to Artwork objects and store in the global array
                storedArtworks = artworks.filter(art => art.thumbnail !== null).map(art => {
                    // Create the Artist
                    const artist = new Artist(art.artist_title, art.artist_id, art.artist_display);
                    // Create the Thumbnail
                    const thumbnail = new Thumbnail(art.image_id, art.thumbnail.alt_text);
                    // Create the Artwork
                    const artwork = new Artwork(art.title, artist, art.date_display, art.short_description, art.term_titles, thumbnail);
                    // return the Artwork
                    return artwork;
                });
                showArtworks(storedArtworks);
              })
              .catch(error => console.log(error));
}

/**
 * Displays the artworks on the page
 * @param {Artwork[]} artworks 
 */
const showArtworks = artworks => {
    // Clear the current contents
    while (resultsDiv.children.length > 0) {
        resultsDiv.children[0].remove();
    }
    const heading = document.createElement("h2");
    heading.innerText = "Artworks";
    resultsDiv.append(heading);
    artworks.forEach(art => {
        if (queryInput.value.length === 0 || art.matchesKeyword(queryInput.value)) {
            resultsDiv.appendChild(art.getDisplayElement());
        }
    });
}