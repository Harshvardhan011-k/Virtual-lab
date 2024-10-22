// Define all possible questions for the quiz
const quizData = [
    {
        question: "In Insertion Sort, where is the current element inserted?",
        answers: [
            { text: "A) Into its correct position in the already sorted part of the array", correct: true },
            { text: "B) Into the beginning of the array", correct: false },
            { text: "C) Into a random position", correct: false },
            { text: "D) Into the middle of the array", correct: false },
        ],
    },
    {
        question: "Which type of sorting algorithm is Insertion Sort?",
        answers: [
            { text: "A) Divide and conquer", correct: false },
            { text: "B) Comparison-based", correct: true },
            { text: "C) Non-comparison-based", correct: false },
            { text: "D) Recursive", correct: false },
        ],
    },
    {
        question: "What is the worst-case scenario for Insertion Sort?",
        answers: [
            { text: "A) When the array is already sorted", correct: false },
            { text: "B) When the array is sorted in reverse order", correct: true },
            { text: "C) When the array contains duplicate elements", correct: false },
            { text: "D) When the array has only one element", correct: false },
        ],
    },
    {
        question: "Why is Insertion Sort considered stable?",
        answers: [
            { text: "A) It requires no extra memory", correct: false },
            { text: "B) It maintains the relative order of equal elements", correct: true },
            { text: "C) It is fast for large datasets", correct: false },
            { text: "D) It always performs in O(n log n)", correct: false },
        ],
    },
    {
        question: "Which of the following is the best case for Insertion Sort?",
        answers: [
            { text: "A) When the array is sorted in descending order", correct: false },
            { text: "B) When the array is already sorted in ascending order", correct: true },
            { text: "C) When the array has only one element", correct: false },
            { text: "D) When the array has all equal elements", correct: false },
        ],
    },
    {
        question: "Why does Insertion Sort have a quadratic time complexity in the worst case?",
        answers: [
            { text: "A) Because it divides the array into halves", correct: false },
            { text: "B) Because each element might need to be compared to every other element", correct: true },
            { text: "C) Because it uses recursion", correct: false },
            { text: "D) Because it swaps multiple elements at once", correct: false },
        ],
    },
    {
        question: "What is the time complexity of Insertion Sort in the best case?",
        answers: [
            { text: "A) O(n^2)", correct: false },
            { text: "B) O(log n)", correct: false },
            { text: "C) O(n)", correct: true },
            { text: "D) O(n log n)", correct: false },
        ],
    },
    {
        question: "Which sorting algorithm is most similar to Insertion Sort in terms of performance on small datasets?",
        answers: [
            { text: "A) Merge Sort", correct: false },
            { text: "B) Bubble Sort", correct: true },
            { text: "C) Quick Sort", correct: false },
            { text: "D) Radix Sort", correct: false },
        ],
    },
    {
        question: "What makes Insertion Sort efficient for nearly sorted data?",
        answers: [
            { text: "A) It has a quadratic time complexity", correct: false },
            { text: "B) It performs fewer shifts and comparisons in such cases", correct: true },
            { text: "C) It uses divide and conquer", correct: false },
            { text: "D) It requires additional space to store sorted elements", correct: false },
        ],
    },
    {
        question: "Is Insertion Sort an in-place algorithm?",
        answers: [
            { text: "A) Yes, because it sorts the array without needing extra space", correct: true },
            { text: "B) No, because it requires additional memory", correct: false },
            { text: "C) Yes, because it recursively divides the array", correct: false },
            { text: "D) No, because it uses extra space for storing temporary values", correct: false },
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
