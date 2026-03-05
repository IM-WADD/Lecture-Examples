/**
 * The event handler for changes to the "children" radio button selection.
 * Displays the follow up question if "yes" is selected, and hides it if "no" is selected.
 * @param {*} event 
 */
function childOptionChanged(event) {
    const input = document.getElementById("child-ages");
    const label = document.getElementById("child-ages-label");
    // Check which radio button was selected
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
 * The event handler for changes to the "pets" radio button selection.
 * Displays the follow up question if "yes" is selected, and hides it if "no" is selected.
 * @param {*} event 
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
 * Checks the fullname field is not empty. If it is, displays feedback prompting the user to enter their name.
 */
function validateName() {
    if (document.getElementById("fullname").value === "") {
        document.getElementById("name-feedback").innerHTML = '<p>Please enter your name.</p>';
    }
}

/**
 * Checks the email field matches the expectations for an email address. If the format is wrong, displays 
 * feedback prompting the user to enter a valid email.
 */
function validateEmail() {
    const emailValue = document.getElementById("email").value;
    // Very basic validation!
    if (emailValue === "" || emailValue.indexOf("@") <= 0 || emailValue.indexOf(".") <= 0) {
        document.getElementById("email-feedback").innerHTML = '<p>Please enter a valid email address.</p>';
    }
}

/**
 * Checks that an option in a radio button group has been selected
 * @param {string} name The name attribute of the radio button group.
 */
function validateRadio(name) {
    const radios = document.getElementsByName(name);
    let somethingSelected = false;
    for (const option of radios) {
        if (option.checked) {
            somethingSelected = true;
            break;
        }
    }
    if (!somethingSelected) {
        document.getElementById(name + "-feedback").innerHTML = '<p>Please answer this question.</p>';
    }
}

/**
 * Checks that the children question has been answers and, if necessary, checks that the follow up question
 * has also been answered.
 */
function validateChildren() {
    validateRadio("children");
    if (document.getElementById("children-yes").checked && document.getElementById("child-ages").value === "") {
        console.log("User has children but has not provided ages!");
        // Optional stage 2
        document.getElementById("ages-feedback").innerHTML = '<p>Please provide the approximate ages of the children.</p>';
    }
}

/**
 * Checks that the pets question has been answers and, if necessary, checks that the follow up question
 * has also been answered.
 */
function validatePets() {
    validateRadio("pets");
    if (document.getElementById("pets-yes").checked) {
        let speciesProvided = false;
        for (let species of document.getElementsByName("species")) {
            if (species.checked) {
                speciesProvided = true;
                break;
            }
        }
        if (!speciesProvided) {
            console.log("User has other pets but has not provided species!");
            // Optional stage 2
            document.getElementById("species-feedback").innerHTML = '<p>Please indicate the species of your other pet(s).</p>';
        }
    }
}

/**
 * Gets rid of all error messages.
 */
function clearAllFeedback() {
    for (let element of document.getElementsByClassName("invalid-feedback")) {
        element.innerHTML = '';
    }
}


// On submit - validate entries. The following code uses an anonymous function for the event handler.
document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();
    // Related to stage 2 - clear all feedback messages
    clearAllFeedback();
    /** Stage 1 validation */
    validateChildren();
    validatePets();
    /** Optional stage 2 validation */
    validateName();
    validateEmail();
    validateRadio("outdoor");
});

const children = document.getElementsByName("children");
for (let childOption of children) {
    childOption.addEventListener("change", childOptionChanged);
}

const pets = document.getElementsByName("pets");
for (let petOption of pets) {
    petOption.addEventListener("change", petOptionChanged);
}