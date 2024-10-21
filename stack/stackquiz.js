const quizData = [
    // Questions and answers data (same as provided earlier)
    {
        question: "What is the primary characteristic of a stack data structure?",
        answers: [
            { text: "A) First In, First Out (FIFO)", correct: false },
            { text: "B) Last In, First Out (LIFO)", correct: true },
            { text: "C) Last In, First Out (LILO)", correct: false },
            { text: "D) First In, Last Out (FILO)", correct: false },
        ],
    },
    {
        question: "Which of the following operations are allowed on a stack?",
        answers: [
            { text: "A) push, pop, peek", correct: true },
            { text: "B) insert, delete, search", correct: false },
            { text: "C) enqueue, dequeue, traverse", correct: false },
            { text: "D) add, remove, find", correct: false },
        ],
    },
    {
        question: "What does the push operation do in a stack??",
        answers: [
            { text: "A) Removes an element from the stack", correct: false },
            { text: "B) Inserts an element into the stack", correct: true },
            { text: "C) Returns the last element added to the stack", correct: false },
            { text: "D) Sorts the elements in the stack", correct: false },
        ],
    },
    {
        question: "What does the pop operation do in a stack?",
        answers: [
            { text: "A) Inserts an element into the stack", correct: false },
            { text: "B) Returns the bottom element of the stack", correct: false },
            { text: "C) Removes and returns the top element from the stack", correct: true },
            { text: "D) Deletes all elements from the stack", correct: false },
        ],
    },
    {
        question: "Which operation in a stack returns the element at the top without removing it?",
        answers: [
            { text: "A) push", correct: false },
            { text: "B) pop", correct: false },
            { text: "C) peek", correct: true },
            { text: "D) shift", correct: false },
        ],
    },
    {
        question: "What will happen if you attempt to pop an element from an empty stack?",
        answers: [
            { text: "A) The program will crash)", correct: false },
            { text: "B) The stack will return null", correct: false },
            { text: "c) An underflow error occurs", correct: true },
            { text: "D) It will return the bottom element", correct: false },
        ],
    },
    {
        question: "What is the time complexity of the push and pop operations in a stack implemented with an array?",
        answers: [
            { text: "A) O(n)", correct: false },
            { text: "B) O(log n)", correct: false },
            { text: "C) O(1)", correct: true },
            { text: "D) O(n^2)", correct: false },
        ],
    },
    {
        question: "Which of the following applications can be efficiently implemented using a stack?",
        answers: [
            { text: "A) Infix to postfix expression conversion", correct: false },
            { text: "B) Web page navigation (back/forward)", correct: false },
            { text: "C) Undo/redo functionality", correct: false },
            { text: "D) All of the above", correct: true },
        ],
    },
    {
        question: "What is a valid postfix expression for the infix expression A + B * C?",
        answers: [
            { text: "A) A B + C *", correct: false },
            { text: "B) A B C * +", correct: true },
            { text: "C) A + B * C", correct: false },
            { text: "D) A B C + *", correct: false },
        ],
    },
    {
        question: "What does a stack frame store during a function call?",
        answers: [
            { text: "A) Global variables and arguments", correct: false },
            { text: "B) Function arguments, local variables, and return address", correct: true },
            { text: "C) Only the function's return value", correct: false },
            { text: "D) CPU registers and global variables", correct: false },
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