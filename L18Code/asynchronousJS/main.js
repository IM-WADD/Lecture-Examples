function operation1() {
    console.log("operation 1 complete");
}

async function operation2() {
    console.log("operation 2 start");
    const output = document.getElementById("output");
    try {
        const response = await fetch("http://shibe.online/api/shibes?count=1");
        const urls = await response.json();
        output.innerHTML = `<img src="${urls[0]}" alt="A random Shiba Inu"/>`;
        console.log("operation 2 complete");
    }
    catch (error) {
        console.log("operation 2 failed:", error);
    }
}

function operation3() {
    console.log("operation 3 complete")
}

operation1();
operation2();
operation3();