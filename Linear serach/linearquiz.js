// Define all possible questions for the quiz
const quizData = [
    {
        question: "What is the time complexity of Linear Search in the worst-case scenario?",
        answers: [
            { text: "A) O(1)", correct: false },
            { text: "B) O(n)", correct: true },
            { text: "C) O(log n)", correct: false },
            { text: "D) O(n^2)", correct: false },
        ],
    },
    {
        question: "What is the primary advantage of Linear Search?",
        answers: [
            { text: "A) It works faster than Binary Search", correct: false },
            { text: "B) It is simple and does not require sorted data", correct: true },
            { text: "C) It uses recursion to find elements", correct: false },
            { text: "D) It requires less memory than Binary Search", correct: false },
        ],
    },
    {
        question: "Which condition will stop a Linear Search algorithm from continuing?",
        answers: [
            { text: "A) The search reaches the middle of the array", correct: false },
            { text: "B) The target element is found or the end of the array is reached", correct: true },
            { text: "C) The search finds a larger value than the target", correct: false },
            { text: "D) The search encounters a negative number", correct: false },
        ],
    },
    {
        question: "For which type of datasets is Linear Search most efficient?",
        answers: [
            { text: "A) Large datasets", correct: false },
            { text: "B) Small or unsorted datasets", correct: true },
            { text: "C) Sorted datasets", correct: false },
            { text: "D) Datasets with duplicate values", correct: false },
        ],
    },
    {
        question: "What is a key drawback of Linear Search?",
        answers: [
            { text: "A) It only works for sorted arrays", correct: false },
            { text: "B) It has a time complexity of O(n)", correct: true },
            { text: "C) It cannot find multiple occurrences of an element", correct: false },
            { text: "D) It requires extra space for an auxiliary array", correct: false },
        ],
    },
    {
        question: "What is the best case time complexity for Linear Search?",
        answers: [
            { text: "A) O(n)", correct: false },
            { text: "B) O(1)", correct: true },
            { text: "C) O(log n)", correct: false },
            { text: "D) O(n^2)", correct: false },
        ],
    },
    {
        question: "Linear Search is particularly inefficient when...",
        answers: [
            { text: "A) The dataset is large", correct: true },
            { text: "B) The dataset is small", correct: false },
            { text: "C) The array has only one element", correct: false },
            { text: "D) The dataset contains negative values", correct: false },
        ],
    },
    {
        question: "Which of the following is a practical use case for Linear Search?",
        answers: [
            { text: "A) Searching in a small, unsorted array", correct: true },
            { text: "B) Searching in a large, sorted array", correct: false },
            { text: "C) Searching in a binary search tree", correct: false },
            { text: "D) Searching in a graph", correct: false },
        ],
    },
    {
        question: "How does Linear Search differ from Binary Search?",
        answers: [
            { text: "A) Linear Search requires sorted data while Binary Search does not", correct: false },
            { text: "B) Linear Search checks each element one by one, while Binary Search divides the search space", correct: true },
            { text: "C) Linear Search is recursive while Binary Search is iterative", correct: false },
            { text: "D) Linear Search has better time complexity than Binary Search", correct: false },
        ],
    },
    {
        question: "In Linear Search, what is done when the target element is found?",
        answers: [
            { text: "A) The search continues until the end", correct: false },
            { text: "B) The search stops immediately", correct: true },
            { text: "C) The search skips one element and checks again", correct: false },
            { text: "D) The search restarts from the beginning", correct: false },
        ],
    },
];

// Select the HTML elements
const questionContainer = document.querySelector("#question-container");
const resultsContainer = document.querySelector(".results");
const submitButton = document.querySelector("#submit-quiz");
const restartButton = document.querySelector("#restart");
const totalSpan = document.querySelector("#total");
const correctSpan = document.querySelector("#correct");

const answerLabels = ["A", "B", "C", "D"];

// Function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to select 5 random questions from the quizData
function getRandomQuestions(data) {
    const shuffled = shuffleArray(data);
    return shuffled.slice(0, 5);
}

// Function to populate the HTML with 5 random questions and answer options
function showQuestions() {
    const randomQuestions = getRandomQuestions(quizData);
    questionContainer.innerHTML = randomQuestions.map((question, index) => `
        <div class="question-block">
            <p>${index + 1}. ${question.question}</p>
            <ul>
                ${question.answers.map((answer, i) => `
                    <li>
                        <button class="answer-btn" data-question="${index}" data-correct="${answer.correct}">
                            <span>${answerLabels[i]}</span> ${answer.text}
                        </button>
                    </li>
                `).join("")}
            </ul>
            <p class="error-message" id="error-${index}"></p>
        </div>
    `).join("");
}

// Function to calculate the result based on the selected answers
function calculateResults() {
    let allAnswered = true;
    const answerButtons = document.querySelectorAll(".answer-btn");
    let numCorrect = 0;

    // Clear previous error messages
    document.querySelectorAll(".error-message").forEach(msg => msg.textContent = "");

    answerButtons.forEach(button => {
        if (button.classList.contains("selected")) {
            const questionIndex = button.getAttribute("data-question");
            const isCorrect = button.getAttribute("data-correct") === "true";

            if (isCorrect) {
                numCorrect++;
            }
        } else {
            // If a question has not been answered
            const questionIndex = button.getAttribute("data-question");
            const errorMessage = document.querySelector(`#error-${questionIndex}`);
            if (!document.querySelector(`.answer-btn[data-question="${questionIndex}"].selected`)) {
                errorMessage.textContent = "This is required";
                allAnswered = false;
            }
        }
    });

    if (allAnswered) {
        totalSpan.textContent = 5; // Update to show the total number of selected random questions
        correctSpan.textContent = numCorrect;

        // Hide questions section and show results
        document.querySelector(".questions").style.display = "none";
        resultsContainer.style.display = "block";
    }
}

// Function to restart the quiz
function restartQuiz() {
    resultsContainer.style.display = "none";
    document.querySelector(".questions").style.display = "block";
    showQuestions();
}

// Add event listeners
submitButton.addEventListener("click", calculateResults);
restartButton.addEventListener("click", restartQuiz);

// Initialize the quiz display
showQuestions();

// Add event listener to answer buttons for selection logic
questionContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("answer-btn")) {
        const allAnswers = e.target.parentElement.parentElement.querySelectorAll(".answer-btn");
        allAnswers.forEach(btn => btn.classList.remove("selected"));
        e.target.classList.add("selected");
    }
});