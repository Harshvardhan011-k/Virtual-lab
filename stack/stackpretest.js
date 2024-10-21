const quizData = [
    // Questions and answers data (same as provided earlier)
    {
        question: "What is a stack?",
        answers: [
            { text: "a) A linear data structure that follows First In First Out (FIFO)", correct: false },
            { text: "b) A linear data structure that follows Last In First Out (LIFO)", correct: true },
            { text: "c) A non-linear data structure", correct: false },
            { text: "d) A collection of linked elements)", correct: false },
        ],
    },
    {
        question: "Which of the following operations can be performed on a stack?",
        answers: [
            { text: "a) Insert and delete at both ends", correct: false },
            { text: "b) Enqueue and dequeue", correct: false },
            { text: "c) Push and pop ", correct: true },
            { text: "d) Traverse and sort", correct: false },
        ],
    },
    {
        question: "What is the time complexity of the push operation on a stack?",
        answers: [
            { text: "a) O(1) (Correct)", correct: true },
            { text: "b) O(n)", correct: false },
            { text: "c) O(log n)", correct: false },
            { text: "d) O(n²)", correct: false },
        ],
    },
    {
        question: "In a stack, the pop() operation removes the element from:",
        answers: [
            { text: "a) The front of the stack", correct: false },
            { text: "b) The bottom of the stack", correct: false },
            { text: "c) The middle of the stack", correct: false },
            { text: "d) The top of the stack ", correct: true },
        ],
    },
    {
        question: "What happens when you try to pop() from an empty stack?",
        answers: [
            { text: "a) The stack overflows", correct: false },
            { text: "b) The stack underflows ", correct: true},
            { text: "c) The stack resets", correct: false },
            { text: "d) The last inserted item is returned", correct: false },
        ],
    },
    {
        question: "What data structure is commonly used to implement recursion?",
        answers: [
            { text: "a) Queue", correct: false },
            { text: "b) Stack ", correct: true },
            { text: "c) Linked List", correct: false},
            { text: "d) Binary Tree", correct: false },
        ],
    },
    {
        question: "Which of the following is an example of stack usage?",
        answers: [
            { text: "a) Reversing a word ", correct: true },
            { text: "b) Breadth-first search)", correct: false },
            { text: "c) Sorting an array", correct: false },
            { text: "d) Implementing a queue", correct: false },
        ],
    },
    {
        question: "f the elements 'A', 'B', 'C' are pushed onto a stack in that order, and then a pop() operation is performed, what will be removed?",
        answers: [
            { text: "a) A", correct: false },
            { text: "b) B", correct: false },
            { text: "c) C ", correct: true },
            { text: "d) None", correct: false},
        ],
    },
    {
        question: " Which data structure is used in the depth-first search (DFS) algorithm?",
        answers: [
            { text: "A) Queue", correct: false },
            { text: "B) Stack", correct: true },
            { text: "C) Priority Queue", correct: false },
            { text: "D) Heap", correct: false },
        ],
    },
    {
        question: "A stack can be implemented using which of the following data structures?",
        answers: [
            { text: "a) Linked List ", correct: true},
            { text: "b) Binary Search Tree", correct: false },
            { text: "c) Graph", correct: false },
            { text: "D) Hash Table", correct: false },
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