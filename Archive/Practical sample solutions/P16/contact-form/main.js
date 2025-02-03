/**
 * Event handler called by the child question
 * @param {Event} event 
 */
function childOptionChanged(event) {
    const input = document.getElementById("child-ages");
    const label = document.getElementById("child-ages-label");
    if (event.target.value === "yes") {
        input.style.display = "inline-block";
        label.style.display = "inline-block";
        // Set the follow on question to required
        input.setAttribute("required", true);
    } else {
        input.style.display = "none";
        label.style.display = "none";
        // Remove the required attribute
        input.removeAttribute("required");
    }
}

/**
 * Event handler called by the pet question
 * @param {Event} event 
 */
function petOptionChanged(event) {
    const speciesList = document.getElementById("other-pets");
    if (event.target.value === "yes") {
        speciesList.style.display = "block";
        // We are not setting the required attribute because this doesn't work for checkbox groups - validation must be performed with JavaScript
    } else {
        speciesList.style.display = "none";
    }
}

/**
 * Basic validation for the fullname field
 * @returns {boolean} true if the name is not empty, false otherwise
 */
function validateName() {
    if (document.getElementById("fullname").value === "") {
        document.getElementById("name-feedback").innerHTML = '<p>Please enter your name.</p>';
        return false;
    }
    return true;
}


/**
 * Basic validation for the email input
 * @returns {boolean} true if the email input contains an @ and ., false otherwise
 */
function validateEmail() {
    const emailValue = document.getElementById("email").value;
    // Very basic validation!
    if (emailValue === "" || emailValue.indexOf("@") <= 0 || emailValue.indexOf(".") <= 0) {
        document.getElementById("email-feedback").innerHTML = '<p>Please enter a valid email address.</p>';
        return false;
    }
    return true;
}

/**
 * Ensure that a required radio group has a selected option
 * @param {string} name The HTML name of the radio group
 * @returns {boolean} True if an option has been selected, false otherwise.
 */
function validateRadio(name) {
    // This code converts the HTMLCollection returned by the selector to an array and then checks that at least one option is checked. Lookup the array filter method... it's very handy!
    if (Array.from(document.getElementsByName(name)).filter(function (input) { return input.checked} ).length === 0) {
        document.getElementById(name + "-feedback").innerHTML = '<p>Please answer this question.</p>';
        return false;
    }
    return true;
}

/**
 * Validate the follow up question to the child question
 * @returns {boolean}
 */
function validateChildren() {
    const kidsAnswered = validateRadio("children");
    if (!kidsAnswered) {
        return false;
    }
    if (document.getElementById("children-yes").checked && document.getElementById("child-ages").value === "") {
        // Optional stage 2
        document.getElementById("ages-feedback").innerHTML = '<p>Please provide the approximate ages of the children.</p>';
        return false;
    }
    return true;
}


/**
 * Validate the follow up question to the pets question
 * @returns {boolean}
 */
function validatePets() {
    const petsAnswered = validateRadio("pets");
    if (!petsAnswered) {
        return false;
    }
    if (document.getElementById("pets-yes").checked) {
        let speciesProvided = false;
        for (let species of document.getElementsByName("species")) {
            if (species.checked) {
                speciesProvided = true;
                break;
            }
        }
        if (!speciesProvided) {
            // Optional stage 2
            document.getElementById("species-feedback").innerHTML = '<p>Please indicate the species of your other pet(s).</p>';
            return false;
        }
    }
    return true;
}


/**
 * Clear all feedback shown to the user
 */
function clearAllFeedback() {
    for (let element of document.getElementsByClassName("invalid-feedback")) {
        element.innerHTML = '';
    }
}


/**
 * Store the form values in local storage
 */
function storeAnswers() {
    // Get previously saved data from local storage. If there is no data in local storage, storedData will be an empty array
    const storedData = localStorage.getItem("P16-contact") !== null ? JSON.parse(localStorage.getItem("P16-contact")) : [];
    // Begin with required fields that have no follow up questions
    const info = {
        fullName: document.getElementById("fullname").value,
        email: document.getElementById("email").value,
        outsideSpace: document.getElementById("outdoor-yes").checked
    }
    // Add the rest of the info, only if provided
    if (document.getElementById("phone").value.length > 0) {
        info.phone = document.getElementById("phone").value;
    }
    // If the user has kids, store their ages. Otherwise, store as "none"
    info.children = document.getElementById("children-yes").checked ? document.getElementById("child-ages").value : "None";
    if (document.getElementById("pets-yes").checked) {
        info.otherPets = Array.from(document.getElementsByName("species")).filter(species => species.checked).map(species => species.value);
        // The above line is equivalent to the following code
        /*
        info.otherPets = [];
        for (let species of document.getElementsByName("species")) {
            if (species.checked) {
                info.otherPets.push(species.value);
            }
        }
        */
    }
    storedData.push(info)
    localStorage.setItem("P16-contact", JSON.stringify(storedData));
}


// On submit - validate entries. 
document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();
    // Related to stage 2 - clear all feedback messages
    clearAllFeedback();
    /** Stage 1 validation */
    const kids = validateChildren();
    const pets = validatePets();
    /** Optional stage 2 validation */
    const name = validateName();
    const email = validateEmail();
    const outdoor = validateRadio("outdoor");
    if (kids && pets && name && email && outdoor) {
        storeAnswers();
    }
});

const children = document.getElementsByName("children");
for (let childOption of children) {
    childOption.addEventListener("change", childOptionChanged);
}

const pets = document.getElementsByName("pets");
for (let petOption of pets) {
    petOption.addEventListener("change", petOptionChanged);
}