// Define all possible questions for the quiz
const quizData = [
    {
        question: "Which of the following statements is true about Insertion Sort?",
        answers: [
            { text: "A) Insertion Sort is more efficient than Quick Sort for large datasets", correct: false },
            { text: "B) Insertion Sort is inefficient for small datasets", correct: false },
            { text: "C) Insertion Sort has a better worst-case time complexity than Merge Sort", correct: false },
            { text: "D) Insertion Sort is efficient for datasets that are already mostly sorted", correct: true },
        ],
    },
    {
        question: "What is the exact number of comparisons made in Insertion Sort for a sorted array of n elements?",
        answers: [
            { text: "A) n - 1", correct: true },
            { text: "B) n", correct: false },
            { text: "C) n log n", correct: false },
            { text: "D) (n^2)/2", correct: false },
        ],
    },
    {
        question: "In an Insertion Sort implementation, if the input array is sorted in reverse order, how many swaps will be performed?",
        answers: [
            { text: "A) n", correct: false },
            { text: "B) n^2", correct: false },
            { text: "C) (n^2)/2", correct: true },
            { text: "D) n log n", correct: false },
        ],
    },
    {
        question: "Which of the following gives the tightest upper bound on the time complexity of Insertion Sort for an array sorted in reverse order?",
        answers: [
            { text: "A) O(n log n)", correct: false },
            { text: "B) O(n^2)", correct: true },
            { text: "C) O(n)", correct: false },
            { text: "D) O(n^3)", correct: false },
        ],
    },
    {
        question: "In Insertion Sort, what happens if we increase the size of the input array to twice its original size?",
        answers: [
            { text: "A) The time complexity increases linearly", correct: false },
            { text: "B) The time complexity increases quadratically", correct: true },
            { text: "C) The space complexity doubles", correct: false },
            { text: "D) The algorithm performs fewer comparisons", correct: false },
        ],
    },
    {
        question: "How can the best case time complexity of Insertion Sort be described?",
        answers: [
            { text: "A) O(n log n)", correct: false },
            { text: "B) O(n)", correct: true },
            { text: "C) O(n^2)", correct: false },
            { text: "D) O(1)", correct: false },
        ],
    },
    {
        question: "Which of the following properties makes Insertion Sort adaptive?",
        answers: [
            { text: "A) It sorts data without extra space", correct: false },
            { text: "B) It performs fewer operations for nearly sorted data", correct: true },
            { text: "C) It can switch to another sorting algorithm", correct: false },
            { text: "D) It sorts data recursively", correct: false },
        ],
    },
    {
        question: "In which scenario would Insertion Sort outperform Merge Sort?",
        answers: [
            { text: "A) When the dataset is large and random", correct: false },
            { text: "B) When the dataset contains distinct elements in reverse order", correct: false },
            { text: "C) When the dataset is small and nearly sorted", correct: true },
            { text: "D) When the dataset has many duplicate elements", correct: false },
        ],
    },
    {
        question: "Which sorting algorithm shares the same time complexity as Insertion Sort in the worst case?",
        answers: [
            { text: "A) Heap Sort", correct: false },
            { text: "B) Quick Sort", correct: false },
            { text: "C) Bubble Sort", correct: true },
            { text: "D) Merge Sort", correct: false },
        ],
    },
    {
        question: "What is the space complexity of Insertion Sort, assuming the sort is performed in-place?",
        answers: [
            { text: "A) O(n)", correct: false },
            { text: "B) O(n log n)", correct: false },
            { text: "C) O(1)", correct: true },
            { text: "D) O(n^2)", correct: false },
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
