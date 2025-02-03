/**
 * I chose a class as my data structure rather than using an object literal or an object 
 * constructor function because I wanted to keep some properties and behaviour private.
 */
class Question {
    // All instance variables are private so they can't be changed by outside code
    #operators = ["+", "-", "*", "/"];
    #correctFeedback = ["Very good!", "Excellent!", "Nice work!", "Keep it up!"];
    #incorrectFeedback = ["I'm sorry that's wrong, please try again.", "Incorrect, please try again.", "That's not right, but don't give up!", "Good try, but you're wrong. Try again."];
    #text;
    #correctAnswer

    /**
     * Creates a random maths question
     */
    constructor() {
        const operator = this.#operators[this.#randomInt(0, 4)];
        const firstNum = this.#randomInt(1, 11);
        const secondNum = this.#randomInt(1, 11);
        this.#text = "What is " + firstNum + " " + operator + " " + secondNum + "?";
        this.#correctAnswer = this.#calculateCorrectAnswer(operator, firstNum, secondNum);
    }

    /**
     * Generates a random integer between min and max (excluding max)
     * This method is private because it is only needed internally.
     * @param {number} min The minimum acceptable number
     * @param {number} max The maximum number (not included)
     * @returns A random integer
    */
    #randomInt(min, max) {
        const randomNum = Math.random() * (max - min);
        return Math.floor(randomNum + min);
    }

    /**
     * Calculates the correct answer for this question. This method is private because it is not needed by outside code.
     * @param {string} operator +, -, *, or /
     * @param {number} firstNum The first number in the question
     * @param {number} secondNum The second number in the question
     * @returns The correct answer
     */
    #calculateCorrectAnswer(operator, firstNum, secondNum) {
        switch (operator) {
            case "+":
                return firstNum + secondNum;
            case "-":
                return firstNum - secondNum;
            case "*":
                return firstNum * secondNum;
            case "/":
                return this.#roundTo2DP(firstNum / secondNum);
            default:
                // NaN is a special data type meaning "Not a Number"
                return NaN;
        }
    }

    /**
     * A private helper method to round a number to two decimal places
     * @param {number} number 
     * @returns The number rounded to two decimal places
     */
    #roundTo2DP(number) {
        return Math.round(number * 100) / 100;
    }

    /**
     * Gets the question text
     * @returns The question text
     */
    getText() {
        return this.#text;
    }

    /**
     * Checks if the user's answer matches the correct answer.
     * @param {string} answer The user's answer
     * @returns true if the user's answer is correct, false otherwise.
     */
    checkAnswer(answer) {
        return this.#correctAnswer === this.#roundTo2DP(parseFloat(answer));
    }

    /**
     * Gets a random feedback string for the user's answer
     * @param {string} answer The user's answer
     * @returns A feedback message
     */
    getFeedbackForAnswer(answer) {
        if (this.checkAnswer(answer)) {
            return this.#correctFeedback[this.#randomInt(0, this.#correctFeedback.length)];
        }
        return this.#incorrectFeedback[this.#randomInt(0, this.#incorrectFeedback.length)];
    }
}

/** Generate and show questions, and track answers */

let questionsAnswered = 0;
let currentQuestion;

/**
 * Updates the progress message
 */
function updateProgress() {
    document.getElementById("progress").innerHTML = "<p>You have answered " + questionsAnswered + " question(s) so far.</p>";
}

/**
 * Displays a new question
 */
function showQuestion() {
    currentQuestion = new Question();
    document.getElementById("question").innerText = currentQuestion.getText();
    document.getElementById("feedback").innerHTML = "";
    document.getElementById("answer").value = "";
}

document.getElementById("check-answer").addEventListener("click", function () {
    const answer = document.getElementById("answer").value;
    document.getElementById("feedback").innerHTML = "<p>" + currentQuestion.getFeedbackForAnswer(answer) + "</p>";
    if (currentQuestion.checkAnswer(answer)) {
        questionsAnswered++;
        updateProgress();
    }
});

document.getElementById("new-question").addEventListener("click", showQuestion);

showQuestion();