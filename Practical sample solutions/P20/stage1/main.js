// Write your code here
const calculateAverage = (...numbers) => {
    if (numbers.length === 0) {
        return NaN;
    }
    let total = 0;
    for (const number of numbers) {
        total += number;
    }
    return total / numbers.length;
}

function shout(message) { 
    return `${message.toUpperCase()}!!!`;
}

const doubleUp = array => {
    const length = array.length;
    for (let i = 0; i < length; i++) {
        array.push(array[i]);
    }
}

const doesNothing = () => {};

// DO NOT MODIFY CODE BELOW THIS LINE
const outputDiv = document.getElementById("test-output");

const createParagraph = innerText => {
    const newP = document.createElement("p");
    newP.innerText = innerText;
    return newP;
}

const testCalculateAverage = () => {
    const testCase1 = calculateAverage(5, 6, 10);
    const testCase2 = calculateAverage();
    const testCase3 = calculateAverage(10);
    if (testCase1 === 7) {
        outputDiv.appendChild(createParagraph("PASS! createAverage(5, 6, 10) returns 7"));
    } else {
        outputDiv.appendChild(createParagraph(`FAIL! createAverage(5, 6, 10) returns ${testCase1}. Expected 7.`));
    }
    if (isNaN(testCase2)) {
        outputDiv.appendChild(createParagraph("PASS! createAverage() returns NaN"));
    } else {
        outputDiv.appendChild(createParagraph(`FAIL! createAverage() returns ${testCase2}. Expected NaN.`));
    }
    if (testCase3 === 10) {
        outputDiv.appendChild(createParagraph("PASS! createAverage(10) returns 10"));
    } else {
        outputDiv.appendChild(createParagraph(`FAIL! createAverage(10) returns ${testCase3}. Expected 10.`));
    }
}

function testShout() {
    const testCase1 = shout("Hello");
    const testCase2 = shout("");
    if (testCase1 === "HELLO!!!") {
        outputDiv.appendChild(createParagraph("PASS! shout('Hello') returns 'HELLO!!!'"));
    } else {
        outputDiv.appendChild(createParagraph(`FAIL! shout('Hello') returns '${testCase1}'. Expected 'HELLO!!!'.`));
    }
    if (testCase2 === "!!!") {
        outputDiv.appendChild(createParagraph("PASS! shout('') returns '!!!'"));
    } else {
        outputDiv.appendChild(createParagraph(`FAIL! shout('') returns '${testCase2}'. Expected '!!!'.`));
    }
}

const arrayEquals = (arr1, arr2) => arr1.every((item, index) => arr2.length > index && arr2[index] === item) && arr2.every((item, index) => arr1.length > index && arr1[index] === item)

const testDoubleUp = () => {
    const testArray1 = [1, 2, 3];
    const expected1 = [1, 2, 3, 1, 2, 3];
    const testArray2 = ["a", "b"];
    const expected2 = ["a", "b", "a", "b"];
    doubleUp(testArray1);
    if (arrayEquals(testArray1, expected1)) {
        outputDiv.appendChild(createParagraph("PASS! doubleUp([1, 2, 3]) modifies the input array to be [1, 2, 3, 1, 2, 3]"));
    } else {
        outputDiv.appendChild(createParagraph(`FAIL! After calling doubleUp([1, 2, 3]), the input array is ${testArray1.toString()}. Expected ${expected1.toString()}.`));
    }
    doubleUp(testArray2);
    if (arrayEquals(testArray2, expected2)) {
        outputDiv.appendChild(createParagraph("PASS! doubleUp(['a', 'b']) modifies the input array to be ['a', 'b', 'a', 'b']"));
    } else {
        outputDiv.appendChild(createParagraph(`FAIL! After calling doubleUp(['a', 'b']), the input array is ${testArray2.toString()}. Expected ${expected2.toString()}.`));
    }
}

function tests() {
    try {
        testCalculateAverage();
    } catch (error) {
        outputDiv.appendChild(createParagraph("calculateAverage() not implemented"))
    }

    try {
        testShout();
    } catch (error) {
        console.log(error)
        outputDiv.appendChild(createParagraph("shout() not implemented"))
    }

    try {
        testDoubleUp();
    } catch (error) {
        console.log(error)
        outputDiv.appendChild(createParagraph("doubleUp() not implemented"))
    }
}

tests();