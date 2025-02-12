const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "HyperText Markup Language",
            "HyperText Machine Language",
            "HyperTool Markup Language",
            "HighText Markup Language"
        ],
        correctAnswer: 0,
        hint: "It's the standard language for creating web pages."
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: [
            "< style >",
            "< script >",
            "< link >",
            "< css >"
        ],
        correctAnswer: 0,
        hint: "It is used to embed CSS directly in the HTML document."
    },
    {
        question: "What tag is used to display an image in HTML?",
        options: [
            "< image >",
            "< img >",
            "< src >",
            "< picture >"
        ],
        correctAnswer: 1,
        hint: "It is used to display images in your HTML page."
    },
    {
        question: "Which attribute is used to specify the destination of a link?",
        options: [
            "target",
            "action",
            "href",
            "link"
        ],
        correctAnswer: 2,
        hint: "It is the most important attribute of the <a> tag."
    },
    {
        question: "Which of the following tags is used to define a table in HTML?",
        options: [
            "< table >",
            "< tab >",
            "< tr >",
            "< thead >"
        ],
        correctAnswer: 0,
        hint: "Use this tag to create a table structure in HTML."
    },
    {
        question: "What does the <head> element in HTML contain?",
        options: [
            "The body content of the page",
            "Metadata about the page, such as title and links to stylesheets",
            "The main content of the page",
            "Links to other websites"
        ],
        correctAnswer: 1,
        hint: "This section contains meta-information like title, charset, and links to CSS."
    },
    {
        question: "Which tag is used to define an ordered list in HTML?",
        options: [
            "< ul >",
            "< ol >",
            "< li >",
            "< dl >"
        ],
        correctAnswer: 1,
        hint: "Use this tag to create lists with numbered items."
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        options: [
            "< break >",
            "< br >",
            "< linebreak >",
            "< lb >"
        ],
        correctAnswer: 1,
        hint: "This tag is used to break text into multiple lines."
    },
    {
        question: "Which tag is used to define a form in HTML?",
        options: [
            "< form >",
            "< input >",
            "< button >",
            "< action >"
        ],
        correctAnswer: 0,
        hint: "This tag is used to collect user input."
    },
    {
        question: "Which HTML attribute is used to specify the width of an image?",
        options: [
            "height",
            "src",
            "width",
            "size"
        ],
        correctAnswer: 2,
        hint: "This attribute defines the horizontal size of the image."
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
