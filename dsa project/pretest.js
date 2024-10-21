const quizData = [
    {
        question: "What is a linked list?",
        answers: [
            { text: "a) A linear data structure with nodes connected by pointers", correct: true },
            { text: "b) A collection of arrays", correct: false },
            { text: "c) A hierarchical data structure", correct: false },
            { text: "d) A type of stack", correct: false },
        ],
    },
    {
        question: "What are the two main parts of a node in a linked list?",
        answers: [
            { text: "a) Value and size", correct: false },
            { text: "b) Data and pointer/reference to next node", correct: true },
            { text: "c) Key and value", correct: false },
            { text: "d) Address and index", correct: false },
        ],
    },
    {
        question: "What is the time complexity of inserting a new node at the beginning of a linked list?",
        answers: [
            { text: "a) O(1)", correct: true },
            { text: "b) O(n)", correct: false },
            { text: "c) O(log n)", correct: false },
            { text: "d) O(n²)", correct: false },
        ],
    },
    {
        question: "How do you traverse a singly linked list?",
        answers: [
            { text: "a) From the tail to the head", correct: false },
            { text: "b) Using both head and tail simultaneously", correct: false },
            { text: "c) From the head node to the end using 'next' pointers", correct: true },
            { text: "d) By sorting the nodes first", correct: false },
        ],
    },
    {
        question: "What happens if you try to access the next element of the last node in a singly linked list?",
        answers: [
            { text: "a) It returns the previous node", correct: false },
            { text: "b) It causes an overflow", correct: false },
            { text: "c) It returns null or None", correct: true },
            { text: "d) It starts from the head again", correct: false },
        ],
    },
    {
        question: "What is a circular linked list?",
        answers: [
            { text: "a) A list where the last node links back to the head", correct: true },
            { text: "b) A linked list with multiple heads", correct: false },
            { text: "c) A binary tree stored as a list", correct: false },
            { text: "d) A list sorted in a circle", correct: false },
        ],
    },
    {
        question: "Which operation is easiest to perform on a singly linked list?",
        answers: [
            { text: "a) Inserting at the end", correct: false },
            { text: "b) Deleting from the middle", correct: false },
            { text: "c) Inserting at the head", correct: true },
            { text: "d) Reversing the entire list", correct: false },
        ],
    },
    {
        question: "How can you detect a cycle in a linked list?",
        answers: [
            { text: "a) Using two pointers: a slow and a fast pointer", correct: true },
            { text: "b) Sorting the linked list", correct: false },
            { text: "c) Checking the size of the list", correct: false },
            { text: "d) Using a binary search algorithm", correct: false },
        ],
    },
    {
        question: "Which data structure is used to implement a doubly linked list?",
        answers: [
            { text: "a) Nodes with only one pointer", correct: false },
            { text: "b) Nodes with two pointers: next and previous", correct: true },
            { text: "c) Arrays", correct: false },
            { text: "d) Stacks", correct: false },
        ],
    },
    {
        question: "What is the main advantage of a doubly linked list over a singly linked list?",
        answers: [
            { text: "a) Requires less memory", correct: false },
            { text: "b) Can be traversed in both directions", correct: true },
            { text: "c) More efficient for sorting", correct: false },
            { text: "d) Easier to implement recursion", correct: false },
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