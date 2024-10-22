// Define all possible questions for the quiz
const quizData = [
    {
        question: "What is the worst-case time complexity of Insertion Sort?",
        answers: [
            { text: "A) O(n)", correct: false },
            { text: "B) O(n log n)", correct: false },
            { text: "C) O(n^2)", correct: true },
            { text: "D) O(log n)", correct: false },
        ],
    },
    {
        question: "What is the primary advantage of Insertion Sort?",
        answers: [
            { text: "A) It works well on large datasets", correct: false },
            { text: "B) It is simple and efficient for small datasets", correct: true },
            { text: "C) It can be easily parallelized", correct: false },
            { text: "D) It always performs faster than other sorting algorithms", correct: false },
        ],
    },
    {
        question: "How does Insertion Sort sort an array?",
        answers: [
            { text: "A) It splits the array in half and sorts both parts", correct: false },
            { text: "B) It repeatedly selects the smallest element and swaps it", correct: false },
            { text: "C) It builds the sorted array one element at a time", correct: true },
            { text: "D) It uses recursion to sort the elements", correct: false },
        ],
    },
    {
        question: "Which scenario provides the best case time complexity for Insertion Sort?",
        answers: [
            { text: "A) When the array is already sorted", correct: true },
            { text: "B) When the array is sorted in reverse order", correct: false },
            { text: "C) When the array contains duplicate elements", correct: false },
            { text: "D) When the array is randomly shuffled", correct: false },
        ],
    },
    {
        question: "What is the space complexity of Insertion Sort?",
        answers: [
            { text: "A) O(1)", correct: true },
            { text: "B) O(n)", correct: false },
            { text: "C) O(n log n)", correct: false },
            { text: "D) O(n^2)", correct: false },
        ],
    },
    {
        question: "In which scenario is Insertion Sort preferred over other algorithms like Quick Sort?",
        answers: [
            { text: "A) For large datasets", correct: false },
            { text: "B) When the dataset is already sorted or nearly sorted", correct: true },
            { text: "C) For datasets with many duplicate elements", correct: false },
            { text: "D) For datasets with strings instead of numbers", correct: false },
        ],
    },
    {
        question: "Which of the following best describes how Insertion Sort works?",
        answers: [
            { text: "A) It divides the array into two halves and merges them", correct: false },
            { text: "B) It swaps adjacent elements to sort the array", correct: false },
            { text: "C) It inserts each element into its correct position in the sorted part of the array", correct: true },
            { text: "D) It builds a heap and extracts the minimum element", correct: false },
        ],
    },
    {
        question: "What happens in each iteration of Insertion Sort?",
        answers: [
            { text: "A) The largest unsorted element is moved to the correct position", correct: false },
            { text: "B) The smallest unsorted element is moved to the correct position", correct: false },
            { text: "C) The next unsorted element is inserted into its correct position", correct: true },
            { text: "D) All elements are swapped simultaneously", correct: false },
        ],
    },
    {
        question: "What is the best-case time complexity of Insertion Sort?",
        answers: [
            { text: "A) O(n)", correct: true },
            { text: "B) O(n^2)", correct: false },
            { text: "C) O(log n)", correct: false },
            { text: "D) O(n log n)", correct: false },
        ],
    },
    {
        question: "Which of the following is a key disadvantage of Insertion Sort?",
        answers: [
            { text: "A) It is not stable", correct: false },
            { text: "B) It has a quadratic time complexity for large datasets", correct: true },
            { text: "C) It requires additional memory", correct: false },
            { text: "D) It does not work on integer arrays", correct: false },
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
