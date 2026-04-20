const CURRENT_USER = "AUser";
const TALKING_TO = "UserB";

const DB_URL = "https://script.google.com/macros/s/AKfycbyRme2-Yd8KmzeQIRMyOtyWFpmdBEuNvhGZe3cScuRxFhjlvHMuMwNGIYJF4JrcPAOE/exec";

/**
 * Get all messages from the database and display them.
 */
async function getMessages() {
    let messages = [];
    try {
        const response = await fetch(DB_URL + "?table=Messages");
        const content = await response.json();
        messages = JSON.parse(content.data);
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
    displayMessages(messages);
}


/**
 * Display all messages
 * @param {Object[]} messages 
 */
function displayMessages(messages) {
    const container = document.getElementById("messages-container");
    // remove all elements from container
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    for (const message of messages) {
        // Filter From and To fields to only show messages between CURRENT_USER and TALKING_TO
        if (
            (message.From === CURRENT_USER && message.To === TALKING_TO) ||
            (message.From === TALKING_TO && message.To === CURRENT_USER)
        ) {
            const messageElement = document.createElement("div");
            messageElement.classList.add("message");
            if (message.From === CURRENT_USER) {
                messageElement.classList.add("outgoing");
            } else {
                messageElement.classList.add("incoming");
            }
            const contentElement = document.createElement("div");
            contentElement.classList.add("message-content");
            const textElement = document.createElement("p");
            textElement.classList.add("message-text");
            textElement.textContent = message.Content;
            const timeElement = document.createElement("span");
            timeElement.classList.add("message-time");
            timeElement.textContent = message.DateTime;
            contentElement.appendChild(textElement);
            contentElement.appendChild(timeElement);
            messageElement.appendChild(contentElement);
            document.getElementById("messages-container").appendChild(messageElement);
        }
    }

    console.log("done")
}

// When a new message is entered in #input-field and the send button is clicked, add the message to the database and refresh the messages
document.getElementById("send-button").addEventListener("click", async () => {
    const inputField = document.getElementById("new-message");
    const newMessage = inputField.value.trim();
    if (newMessage === "") {
        return;
    }
    inputField.value = "";
    try {
        await fetch(`${DB_URL}?table=Messages`, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify({
                action: "add",
                data: {
                    From: CURRENT_USER,
                    To: TALKING_TO,
                    Content: newMessage,
                    DateTime: new Date().toLocaleString(),
                },
            }),
        });
        getMessages();
    } catch (error) {
        console.error("Error sending message:", error);
    }
});

getMessages();