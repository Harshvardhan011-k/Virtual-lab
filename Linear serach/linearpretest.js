// Define all possible questions for the quiz
const quizData = [
    {
        question: "What is Linear Search?",
        answers: [
            { text: "A) A searching algorithm that checks each element sequentially", correct: true },
            { text: "B) A searching algorithm that divides the array into two halves", correct: false },
            { text: "C) A method to sort data", correct: false },
            { text: "D) A method to randomly access elements", correct: false },
        ],
    },
    {
        question: "What is the time complexity of Linear Search in the worst case?",
        answers: [
            { text: "A) O(log n)", correct: false },
            { text: "B) O(n)", correct: true },
            { text: "C) O(1)", correct: false },
            { text: "D) O(n^2)", correct: false },
        ],
    },
    {
        question: "Which of the following is true for Linear Search?",
        answers: [
            { text: "A) It works only on sorted arrays", correct: false },
            { text: "B) It works on both sorted and unsorted arrays", correct: true },
            { text: "C) It works faster than binary search", correct: false },
            { text: "D) It requires O(n^2) space", correct: false },
        ],
    },
    {
        question: "What is the best case scenario for Linear Search?",
        answers: [
            { text: "A) The element is found at the last position", correct: false },
            { text: "B) The element is not present in the array", correct: false },
            { text: "C) The element is found at the first position", correct: true },
            { text: "D) The array is empty", correct: false },
        ],
    },
    {
        question: "What type of data structure can Linear Search be applied to?",
        answers: [
            { text: "A) Only arrays", correct: false },
            { text: "B) Arrays, linked lists, and any sequential data structure", correct: true },
            { text: "C) Only sorted arrays", correct: false },
            { text: "D) Only linked lists", correct: false },
        ],
    },
    {
        question: "Which of the following describes the worst-case scenario for Linear Search?",
        answers: [
            { text: "A) The element is not present in the array", correct: true },
            { text: "B) The element is present at the first position", correct: false },
            { text: "C) The array is empty", correct: false },
            { text: "D) The element is present at the middle", correct: false },
        ],
    },
    {
        question: "How does Linear Search compare to Binary Search in terms of efficiency?",
        answers: [
            { text: "A) Linear search is more efficient on large datasets", correct: false },
            { text: "B) Binary search is more efficient on sorted datasets", correct: true },
            { text: "C) Linear search is faster when the array is sorted", correct: false },
            { text: "D) Both have the same time complexity", correct: false },
        ],
    },
    {
        question: "What is the space complexity of Linear Search?",
        answers: [
            { text: "A) O(n)", correct: false },
            { text: "B) O(1)", correct: true },
            { text: "C) O(n log n)", correct: false },
            { text: "D) O(n^2)", correct: false },
        ],
    },
    {
        question: "Which of the following is a drawback of Linear Search?",
        answers: [
            { text: "A) It requires sorted data", correct: false },
            { text: "B) It is inefficient for large datasets", correct: true },
            { text: "C) It cannot be used for unsorted data", correct: false },
            { text: "D) It has a high space complexity", correct: false },
        ],
    },
    {
        question: "In which case would you prefer to use Linear Search over Binary Search?",
        answers: [
            { text: "A) When the dataset is large and sorted", correct: false },
            { text: "B) When the dataset is small or unsorted", correct: true },
            { text: "C) When you need logarithmic time complexity", correct: false },
            { text: "D) When the dataset is sorted and large", correct: false },
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