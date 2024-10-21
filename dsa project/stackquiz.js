const quizData = [
    {
        question: "What is a linked list?",
        answers: [
            { text: "A) A sequence of elements stored in contiguous memory", correct: false },
            { text: "B) A data structure consisting of nodes linked through pointers", correct: true },
            { text: "C) A collection of elements with a fixed size", correct: false },
            { text: "D) A circular data structure", correct: false },
        ],
    },
    {
        question: "Which of the following is an advantage of a linked list over arrays?",
        answers: [
            { text: "A) Faster access to elements", correct: false },
            { text: "B) Fixed memory allocation", correct: false },
            { text: "C) Dynamic memory allocation", correct: true },
            { text: "D) Data stored contiguously", correct: false },
        ],
    },
    {
        question: "What is the time complexity of inserting a node at the beginning of a linked list?",
        answers: [
            { text: "A) O(1)", correct: true },
            { text: "B) O(n)", correct: false },
            { text: "C) O(log n)", correct: false },
            { text: "D) O(n^2)", correct: false },
        ],
    },
    {
        question: "What is a circular linked list?",
        answers: [
            { text: "A) A list where the last node points to the head", correct: true },
            { text: "B) A list where all nodes are connected to every other node", correct: false },
            { text: "C) A list where data is stored in a circular fashion", correct: false },
            { text: "D) A list where the head points to itself", correct: false },
        ],
    },
    {
        question: "What is the primary use of a doubly linked list?",
        answers: [
            { text: "A) Faster search operations", correct: false },
            { text: "B) Traversal in both directions", correct: true },
            { text: "C) Storing large data sets", correct: false },
            { text: "D) Handling circular dependencies", correct: false },
        ],
    },
    {
        question: "How is the end of a singly linked list identified?",
        answers: [
            { text: "A) When the node points back to the head", correct: false },
            { text: "B) When the next pointer is null", correct: true },
            { text: "C) When the size is reached", correct: false },
            { text: "D) When there is no data left", correct: false },
        ],
    },
    {
        question: "Which operation removes a node from the end of a linked list?",
        answers: [
            { text: "A) Dequeue", correct: false },
            { text: "B) Pop", correct: true },
            { text: "C) Shift", correct: false },
            { text: "D) Append", correct: false },
        ],
    },
    {
        question: "What is the primary drawback of linked lists?",
        answers: [
            { text: "A) Requires contiguous memory", correct: false },
            { text: "B) Difficult to insert elements", correct: false },
            { text: "C) Extra memory for storing pointers", correct: true },
            { text: "D) Fixed size", correct: false },
        ],
    },
    {
        question: "How do you traverse a linked list?",
        answers: [
            { text: "A) Using an index", correct: false },
            { text: "B) Iterating through each node using the next pointer", correct: true },
            { text: "C) Using recursion only", correct: false },
            { text: "D) By swapping adjacent nodes", correct: false },
        ],
    },
    {
        question: "Which type of linked list is used to implement LRU Cache?",
        answers: [
            { text: "A) Singly linked list", correct: false },
            { text: "B) Circular linked list", correct: false },
            { text: "C) Doubly linked list", correct: true },
            { text: "D) Skip list", correct: false },
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