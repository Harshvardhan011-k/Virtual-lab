const quizData = [
    {
        question: "A linked list is also known as:",
        answers: [
            { text: "a) A dynamic data structure", correct: true },
            { text: "b) A stack-based structure", correct: false },
            { text: "c) A queue-based structure", correct: false },
            { text: "d) A circular array", correct: false },
        ],
    },
    {
        question: "Which operation is used to add an element at the head of a linked list?",
        answers: [
            { text: "a) Insert at tail", correct: false },
            { text: "b) Insert at head", correct: true },
            { text: "c) Delete from head", correct: false },
            { text: "d) Traverse", correct: false },
        ],
    },
    {
        question: "If the linked list is empty and you try to delete a node, what is this situation called?",
        answers: [
            { text: "a) Overflow", correct: false },
            { text: "b) Underflow", correct: true },
            { text: "c) Null Reference", correct: false },
            { text: "d) Memory Error", correct: false },
        ],
    },
    {
        question: "What will be the output if the following sequence of operations is performed on an empty linked list? insert(1), insert(2), delete(), insert(3), delete()",
        answers: [
            { text: "a) 1", correct: false },
            { text: "b) 2", correct: false },
            { text: "c) 1,3", correct: false },
            { text: "d) 3", correct: true },
        ],
    },
    {
        question: "In which of the following applications are linked lists not used?",
        answers: [
            { text: "a) Dynamic memory allocation", correct: false },
            { text: "b) Implementation of stacks and queues", correct: false },
            { text: "c) Sorting using quicksort", correct: true },
            { text: "d) Polynomial representation", correct: false },
        ],
    },
    {
        question: "What is the time complexity of accessing an element in a singly linked list?",
        answers: [
            { text: "a) O(1)", correct: false },
            { text: "b) O(n)", correct: true },
            { text: "c) O(log n)", correct: false },
            { text: "d) O(n log n)", correct: false },
        ],
    },
    {
        question: "Which of the following is an example of a linked list application?",
        answers: [
            { text: "a) Implementing undo functionality in text editors", correct: true },
            { text: "b) Breadth-first search (BFS)", correct: false },
            { text: "c) Sorting an array", correct: false },
            { text: "d) Implementing a binary search tree", correct: false },
        ],
    },
    {
        question: "If elements 'A', 'B', and 'C' are inserted into a linked list in that order, and then a delete operation is performed at the head, which element will be removed?",
        answers: [
            { text: "a) A", correct: true },
            { text: "b) B", correct: false },
            { text: "c) C", correct: false },
            { text: "d) None", correct: false },
        ],
    },
    {
        question: "Which data structure is used to implement breadth-first search (BFS)?",
        answers: [
            { text: "A) Queue", correct: true },
            { text: "B) Stack", correct: false },
            { text: "C) Priority Queue", correct: false },
            { text: "D) Heap", correct: false },
        ],
    },
    {
        question: "What is a common use of a linked list in memory management?",
        answers: [
            { text: "a) Tracking free memory blocks", correct: true },
            { text: "b) Managing function return addresses", correct: false },
            { text: "c) Storing recursion depth", correct: false },
            { text: "d) Allocating fixed-sized memory", correct: false },
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