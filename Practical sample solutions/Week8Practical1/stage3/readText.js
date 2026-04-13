const storedText = sessionStorage.getItem("W8P1");
if (storedText !== null) {
    const showElements = document.getElementsByClassName("show-text");
    for (const elem of showElements) {
        elem.innerText = storedText;
    }
}