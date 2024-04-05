// This data has the same format as the API data, and will be used if the fetch fails
const emergencyPlaceholderData = {
    activity: "Check your internet connection",
    type: "Household",
    participants: 1,
    price: 0
}

function getPriceRange (price) {
    const CHEAP = 0.3;
    const MID_RANGE = 0.6;
    if (price <= CHEAP)
        return "£";
    else if (price <= MID_RANGE)
        return "££";
    else
        return "£££";
}

function getNewActivity() {
    // Optional but a good idea for UX purposes (show the spinner and hide the content)
    document.getElementById("loading").style.display = "flex";
    document.getElementById("data").style.display = "none";

    fetch("https://www.boredapi.com/api/activity")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // This code will execute if the api returns data
            showActivity(data.activity, data.type, data.participants, data.price);

        })
        .catch(function (error) {
            // This code will execute if there is a network error i.e. no internet
            console.log(error);
            // Show the placeholder data in place of real data
            showActivity(emergencyPlaceholderData.activity, emergencyPlaceholderData.type, emergencyPlaceholderData.participants, emergencyPlaceholderData.price);
        })
        .finally(function () {
            // This code will execute in both cases - network error OR api returns data
            setTimeout(() => {
                document.getElementById("loading").style.display = "none";
                document.getElementById("data").style.display = "block";
            }, 500)
        });
}

function showActivity(activity, type, numPeople, price) {
    document.getElementById("activity-text").innerText = activity;
    document.getElementById("activity-type").innerText = type;
    document.getElementById("participants-sr").innerText = "Number of people: " + numPeople;
    document.getElementById("activity-price").innerText = getPriceRange(price);
    const participantArea = document.getElementById("num-participants")
    while (participantArea.children.length > 0) {
        participantArea.removeChild(participantArea.firstChild);
    }
    for (let i = 0; i < numPeople; i++) {
        const icon = document.createElement("i");
        icon.setAttribute("class", "fa-solid fa-user");
        participantArea.appendChild(icon);
    }
}

document.getElementById("button").addEventListener("click", getNewActivity);

getNewActivity();