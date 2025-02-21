/**
 * Converts a numeric price to a string representing expensiveness
 * @param {number} price 
 * @returns {string}
 */
function getPriceRange(price) {
    const CHEAP = 0.3;
    const MID_RANGE = 0.6;
    if (price <= CHEAP)
        return "£";
    else if (price <= MID_RANGE)
        return "££";
    else
        return "£££";
}

/**
 * Get a new activity from the API
 */
function getNewActivity() {
    // Optional but a good idea for UX purposes (show the spinner and hide the content)
    document.getElementById("loading").style.display = "flex";
    document.getElementById("data").style.display = "none";

    fetch("https://www.boredapi.com/api/activity")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            document.getElementById("activity-text").innerText = data.activity;
            document.getElementById("activity-type").innerText = data.type;
            document.getElementById("participants-sr").innerText = "Number of people: " + data.participants;
            document.getElementById("activity-price").innerText = getPriceRange(data.price);
            const participantArea = document.getElementById("num-participants")
            while (participantArea.children.length > 0) {
                participantArea.removeChild(participantArea.firstChild);
            }
            for (let i = 0; i < data.participants; i++) {
                const icon = document.createElement("i");
                icon.setAttribute("class", "fa-solid fa-user");
                participantArea.appendChild(icon);
            }

            // A fudge to keep the spinner on screen for at least half a second
            setTimeout(function () {
                document.getElementById("loading").style.display = "none";
                document.getElementById("data").style.display = "block";
            }, 500)
        });
}

document.getElementById("button").addEventListener("click", getNewActivity);

getNewActivity();