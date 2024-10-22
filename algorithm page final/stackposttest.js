const quizData = [
    // Questions and answers data (same as provided earlier)
    {
        question: "A stack is also known as:",
        answers: [
            { text: "a) FIFO (First In First Out)", correct: false },
            { text: "b) LIFO (Last In First Out)", correct: true },
            { text: "c) FILO (First In Last Out)", correct: false },
            { text: "d) LILO (Last In Last Out)", correct: false },
        ],
    },
    {
        question: "Which operation is used to remove an element from the top of a stack?",
        answers: [
            { text: "a) Peek", correct: false },
            { text: "b) Push", correct: false },
            { text: "c) Pop ", correct: true },
            { text: "d) Insert", correct: false },
        ],
    },
    {
        question: "If the stack is empty and a pop operation is attempted, what is this situation called?",
        answers: [
            { text: "a) Overflow", correct: false },
            { text: "b) Underflow", correct: true },
            { text: "c) Empty Stack", correct: false },
            { text: "d) Null Exception", correct: false },
        ],
    },
    {
        question: "What will be the output if the following sequence of operations is performed on an empty stack? push(1), push(2), pop(), push(3), pop()",
        answers: [
            { text: "a) 1", correct: false },
            { text: "b) 2", correct: false },
            { text: "c) 1,3", correct: false },
            { text: "d) 3 ", correct: true },
        ],
    },
    {
        question: "In which of the following applications, stacks are not used?",
        answers: [
            { text: "a) Function calls ", correct: false },
            { text: "b) Binary Search ", correct: true},
            { text: "c)  Parenthesis matching", correct: false },
            { text: "d) Memory management", correct: false },
        ],
    },
    {
        question: "Which of the following is the time complexity of the pop operation in a stack implemented using an array?",
        answers: [
            { text: "a) O(n)", correct: false },
            { text: "b) a) O(1) ", correct: true },
            { text: "c) O(log n)", correct: false},
            { text: "d)  O(n log n)", correct: false },
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
        question: "What is a common use of the stack in recursion?",
        answers: [
            { text: "a) Storing function return addresses", correct: true},
            { text: "b) Sorting elements", correct: false },
            { text: "c) Traversing graphs", correct: false },
            { text: "d) Storing heap memory allocations", correct: false },
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