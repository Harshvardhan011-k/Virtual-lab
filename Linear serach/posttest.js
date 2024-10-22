// Define all possible questions for the quiz
const quizData = [
    {
        question: "Which of the following is true about Linear Search?",
        answers: [
            { text: "A) It requires the array to be sorted", correct: false },
            { text: "B) It does not require the array to be sorted", correct: true },
            { text: "C) It works only on integers", correct: false },
            { text: "D) It can only find elements at odd positions", correct: false },
        ],
    },
    {
        question: "What is the basic strategy of Linear Search?",
        answers: [
            { text: "A) Divide the list into two parts", correct: false },
            { text: "B) Check each element from the beginning until the desired element is found", correct: true },
            { text: "C) Sort the array first", correct: false },
            { text: "D) Jump to the middle element and check", correct: false },
        ],
    },
    {
        question: "What happens when Linear Search does not find the target element?",
        answers: [
            { text: "A) It returns the index of the last checked element", correct: false },
            { text: "B) It returns -1", correct: true },
            { text: "C) It throws an error", correct: false },
            { text: "D) It continues searching indefinitely", correct: false },
        ],
    },
    {
        question: "In which case will Linear Search perform the fastest?",
        answers: [
            { text: "A) When the target element is at the end", correct: false },
            { text: "B) When the target element is at the middle", correct: false },
            { text: "C) When the target element is at the beginning", correct: true },
            { text: "D) When the array is empty", correct: false },
        ],
    },
    {
        question: "Which of the following is NOT a characteristic of Linear Search?",
        answers: [
            { text: "A) It has a time complexity of O(n)", correct: false },
            { text: "B) It can work on both unsorted and sorted arrays", correct: false },
            { text: "C) It requires auxiliary space of O(n)", correct: true },
            { text: "D) It checks each element one by one", correct: false },
        ],
    },
    {
        question: "Linear Search can be applied to which of the following types of data?",
        answers: [
            { text: "A) Arrays only", correct: false },
            { text: "B) Linked lists only", correct: false },
            { text: "C) Any sequential data structure", correct: true },
            { text: "D) Hash tables", correct: false },
        ],
    },
    {
        question: "Which of the following correctly describes the space complexity of Linear Search?",
        answers: [
            { text: "A) O(1)", correct: true },
            { text: "B) O(n)", correct: false },
            { text: "C) O(log n)", correct: false },
            { text: "D) O(n^2)", correct: false },
        ],
    },
    {
        question: "What is a major disadvantage of Linear Search?",
        answers: [
            { text: "A) It cannot be used with unsorted data", correct: false },
            { text: "B) It is inefficient for large datasets", correct: true },
            { text: "C) It requires extra memory", correct: false },
            { text: "D) It only works on numeric data", correct: false },
        ],
    },
    {
        question: "Which data structure could optimize searching better than Linear Search?",
        answers: [
            { text: "A) Stack", correct: false },
            { text: "B) Queue", correct: false },
            { text: "C) Binary Search Tree", correct: true },
            { text: "D) Linked List", correct: false },
        ],
    },
    {
        question: "Why might Linear Search still be preferred in some cases over Binary Search?",
        answers: [
            { text: "A) It is faster for all datasets", correct: false },
            { text: "B) It is easier to implement and does not require sorted data", correct: true },
            { text: "C) It has lower time complexity", correct: false },
            { text: "D) It can only be used on integers", correct: false },
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