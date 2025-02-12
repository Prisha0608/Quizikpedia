const questions = [
    {
        question: "What does CSS stand for?",
        options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets"
        ],
        correctAnswer: 1,
        hint: "It's used to describe the presentation of HTML documents."
    },
    {
        question: "Which property is used to change the background color in CSS?",
        options: [
            "color",
            "background",
            "background-color",
            "bg-color"
        ],
        correctAnswer: 2,
        hint: "This property specifies the color behind the content."
    },
    {
        question: "What is the correct syntax to link an external CSS file in HTML?",
        options: [
            "< style src='style.css' >",
            "< link rel='stylesheet' href='style.css' >",
            "< stylesheet>style.css</stylesheet >",
            "< link src='style.css' >"
        ],
        correctAnswer: 1,
        hint: "It is written within the <head> tag."
    },
    {
        question: "Which CSS property is used to change the text color?",
        options: [
            "font-color",
            "text-color",
            "color",
            "text-style"
        ],
        correctAnswer: 2,
        hint: "It defines the color of the text content."
    },
    {
        question: "What is the default position value in CSS?",
        options: [
            "absolute",
            "relative",
            "fixed",
            "static"
        ],
        correctAnswer: 3,
        hint: "It's the default position and doesn't affect element positioning."
    },
    {
        question: "Which property is used to control the spacing between lines of text?",
        options: [
            "letter-spacing",
            "line-height",
            "text-indent",
            "margin"
        ],
        correctAnswer: 1,
        hint: "It defines the vertical space between lines of text."
    },
    {
        question: "Which unit is NOT relative in CSS?",
        options: [
            "em",
            "px",
            "%",
            "rem"
        ],
        correctAnswer: 1,
        hint: "This unit represents absolute pixels."
    },
    {
        question: "Which property is used to make a font bold?",
        options: [
            "font-style",
            "font-weight",
            "font-bold",
            "text-weight"
        ],
        correctAnswer: 1,
        hint: "It can take values like 'normal', 'bold', or 'lighter'."
    },
    {
        question: "Which property is used to control the visibility of an element?",
        options: [
            "display",
            "visibility",
            "opacity",
            "hidden"
        ],
        correctAnswer: 1,
        hint: "It can have values like 'visible' and 'hidden'."
    },
    {
        question: "Which property is used to create space inside an element's border?",
        options: [
            "margin",
            "padding",
            "border-spacing",
            "spacing"
        ],
        correctAnswer: 1,
        hint: "It creates inner space between the content and border."
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
