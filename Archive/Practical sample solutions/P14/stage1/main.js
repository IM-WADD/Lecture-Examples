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

function petOptionChanged(event) {
    const speciesList = document.getElementById("other-pets");
    if (event.target.value === "yes") {
        speciesList.style.display = "block";
        // We are not setting the required attribute because this doesn't work for checkbox groups - validation must be performed with JavaScript
    } else {
        speciesList.style.display = "none";
    }
}

function validateName() {
    if (document.getElementById("fullname").value === "") {
        document.getElementById("name-feedback").innerHTML = '<p>Please enter your name.</p>';
    }
}

function validateEmail() {
    const emailValue = document.getElementById("email").value;
    // Very basic validation!
    if (emailValue === "" || emailValue.indexOf("@") <= 0 || emailValue.indexOf(".") <= 0) {
        document.getElementById("email-feedback").innerHTML = '<p>Please enter a valid email address.</p>';
    }
}

function validateRadio(name) {
    // This code converts the HTMLCollection returned by the selector to an array and then checks that at least one option is checked. Lookup the array filter method... it's very handy!
    if (Array.from(document.getElementsByName(name)).filter(input => input.checked).length === 0) {
        document.getElementById(name + "-feedback").innerHTML = '<p>Please answer this question.</p>';
    }
}

function validateChildren() {
    validateRadio("children");
    if (document.getElementById("children-yes").checked && document.getElementById("child-ages").value === "") {
        console.log("User has children but has not provided ages!");
        // Optional stage 2
        document.getElementById("ages-feedback").innerHTML = '<p>Please provide the approximate ages of the children.</p>';
    }
}

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

function clearAllFeedback() {
    for (let element of document.getElementsByClassName("invalid-feedback")) {
        element.innerHTML = '';
    }
}


// On submit - validate entries. 
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