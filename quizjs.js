const questions = [
    {
        question: "What is the correct syntax to print a message in the console?",
        options: [
            "console.log('message')",
            "print('message')",
            "log.console('message')",
            "console.print('message')"
        ],
        correctAnswer: 0,
        hint: "This method is commonly used for debugging in JavaScript."
    },
    {
        question: "Which data type is NOT primitive in JavaScript?",
        options: [
            "String",
            "Object",
            "Number",
            "Boolean"
        ],
        correctAnswer: 1,
        hint: "This type can hold multiple values in key-value pairs."
    },
    {
        question: "How do you declare a variable in JavaScript?",
        options: [
            "variable x;",
            "var x;",
            "x = variable;",
            "declare x;"
        ],
        correctAnswer: 1,
        hint: "This was the traditional way before ES6 introduced new keywords."
    },
    {
        question: "Which keyword is used to define a constant in JavaScript?",
        options: [
            "let",
            "const",
            "constant",
            "var"
        ],
        correctAnswer: 1,
        hint: "This keyword ensures the variable cannot be reassigned."
    },
    {
        question: "What is the output of: `typeof null`?",
        options: [
            "'null'",
            "'undefined'",
            "'object'",
            "'string'"
        ],
        correctAnswer: 2,
        hint: "This is considered a bug in JavaScript."
    },
    {
        question: "Which method is used to join two or more arrays in JavaScript?",
        options: [
            "merge()",
            "concat()",
            "join()",
            "combine()"
        ],
        correctAnswer: 1,
        hint: "This method returns a new array and doesn’t modify existing arrays."
    },
    {
        question: "How do you write a single-line comment in JavaScript?",
        options: [
            "# This is a comment",
            "// This is a comment",
            "/* This is a comment */",
            "` This is a comment"
        ],
        correctAnswer: 1,
        hint: "It starts with two forward slashes."
    },
    {
        question: "What will `Boolean('false')` return?",
        options: [
            "false",
            "true",
            "undefined",
            "null"
        ],
        correctAnswer: 1,
        hint: "Any non-empty string evaluates to true in JavaScript."
    },
    {
        question: "Which function is used to parse a string to an integer?",
        options: [
            "parseInt()",
            "Number()",
            "toInteger()",
            "parseNumber()"
        ],
        correctAnswer: 0,
        hint: "This function takes a string and an optional radix parameter."
    },
    {
        question: "What is the purpose of `isNaN()` in JavaScript?",
        options: [
            "To check if a variable is a number",
            "To check if a value is NaN",
            "To convert a value to NaN",
            "To find the square root of NaN"
        ],
        correctAnswer: 1,
        hint: "This function checks if a value is 'Not-a-Number'."
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

const quizContainer = document.getElementById("quiz");
const timerElement = document.getElementById("time-left");
const progressBar = document.querySelector(".progress-bar");
const hintBox = document.getElementById("hint-box");
const hintButton = document.getElementById("hint-button");
const nextButton = document.getElementById("next");

// Load the first question
loadQuestion();

hintButton.addEventListener("click", () => {
    hintBox.style.display = hintBox.style.display === "none" ? "block" : "none"; // Toggle hint visibility
});
hintButton.addEventListener("click", () => {
    const currentHint = questions[currentQuestionIndex].hint;
    hintBox.textContent = currentHint; // Set the hint text
    hintBox.style.display = "block"; // Show the hint box
});
// Add an event listener to the hint button
hintButton.addEventListener("click", () => {
    console.log("Hint button clicked");

    if (currentHint) {
        hintBox.textContent = currentHint; // Set the hint text

        // Toggle visibility
        if (hintBox.style.display === "none") {
            hintBox.style.display = "block"; // Show hint box
        } else {
            hintBox.style.display = "none"; // Hide hint box
        }
    } else {
        console.error("No hint available for the current question.");
    }
});

// Load a question
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        clearInterval(timer);
        showResults();
        return;
    }

    const question = questions[currentQuestionIndex];
    quizContainer.innerHTML = `
        <div class="question-container">
            <p class="h5">${question.question}</p>
            <div class="options">
                ${question.options
                    .map(
                        (option, index) => `
                <label>
                    <input type="radio" name="option" value="${index}"> ${option}
                </label><br>`
                    )
                    .join("")}
            </div>
        </div>
    `;
    updateProgressBar();
    resetTimer();
    hintBox.style.display = "none"; // Hide hint on new question
    updateButtonText();
}

// Reset and start timer
function resetTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            validateAnswer(-1); // No answer selected
            nextQuestion();
        }
    }, 1000);
}

// Validate answer
function validateAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correctAnswer;
    if (selectedIndex === correctIndex) {
        score += 10;
    }
}

// Update button text based on the current question
function updateButtonText() {
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = "Submit"; // Change to Submit for the last question
    } else {
        nextButton.textContent = "Next"; // Show Next for other questions
    }
}

// Move to next question
nextButton.addEventListener("click", () => {
    const selectedOption = document.querySelector("input[name='option']:checked");
    const selectedIndex = selectedOption ? parseInt(selectedOption.value) : -1;
    validateAnswer(selectedIndex);
    nextQuestion();
});

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

// Update progress bar
function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function showResults() {
    let feedback = "";
    if (score >= 80) {
        feedback = "Excellent! You did a great job!";
    } else if (score >= 50) {
        feedback = "Good effort! Keep practicing.";
    } else {
        feedback = "You can do better. Try again!";
    }

    quizContainer.innerHTML = `
        <div class="h3">Quiz Completed!</div>
        <p>Your score: <strong>${score}</strong></p>
        <p>${feedback}</p>
        <button id="retake" class="btn btn-primary mt-3">Retake Quiz</button>
        <button id="home" class="btn btn-secondary mt-3">Back to Home</button>
            <div> 
        <button id="Get_certificate" class="btn btn-primary mt-3">Get Certificate</button>
        </div>
    `;

    document.getElementById("retake").addEventListener("click", () => {
        currentQuestionIndex = 0;
        score = 0;
        nextButton.style.display = "inline-block"; // Make the Next button visible
        hintButton.style.display = "inline-block"; // Make the Hint button visible
        timerElement.style.display = "block"; // Show the timer
        loadQuestion();
    });

    document.getElementById("home").addEventListener("click", () => {
        window.location.href = "1st.html"; // Redirect to home page
    });

    nextButton.style.display = "none";
    hintButton.style.display = "none";
    timerElement.style.display = "none";

    document.getElementById("Get_certificate").addEventListener("click",() =>{
        window.location.href="Certificate.html"
    });
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        clearInterval(timer);
        showResults();
        return;
    }

    const question = questions[currentQuestionIndex];
    quizContainer.innerHTML = `
        <div class="question-container">
            <p class="h5">${question.question}</p>
            <div class="options">
                ${question.options
                    .map(
                        (option, index) => `
                <label>
                    <input type="radio" name="option" value="${index}"> ${option}
                </label><br>`
                    )
                    .join("")}
            </div>
        </div>
    `;

    updateProgressBar();
    resetTimer();
    hintBox.style.display = "none"; // Hide hint on new question
    updateButtonText();
}
