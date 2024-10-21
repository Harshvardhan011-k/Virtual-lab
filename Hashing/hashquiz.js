// Final Test Quiz Data (Comprehensive Hashing Questions)
const quizData = [
    {
        question: "What is the key property of a good hash function?",
        answers: [
            { text: "A) It minimizes collisions", correct: true },
            { text: "B) It uses a simple algorithm", correct: false },
            { text: "C) It produces unique outputs for every input", correct: false },
            { text: "D) It can be reversed to get the original data", correct: false },
        ],
    },
    {
        question: "Why is it important to choose a prime number for the table size in the division method?",
        answers: [
            { text: "A) It improves the speed of the hash function", correct: false },
            { text: "B) It reduces the chances of collisions", correct: true },
            { text: "C) It simplifies the division process", correct: false },
            { text: "D) It makes the hash function easier to implement", correct: false },
        ],
    },
    {
        question: "In open addressing, what happens when a hash collision occurs?",
        answers: [
            { text: "A) The entry is stored in a linked list", correct: false },
            { text: "B) The next available slot is used based on a probing sequence", correct: true },
            { text: "C) The table size is increased", correct: false },
            { text: "D) The key is rehashed", correct: false },
        ],
    },
    {
        question: "What is linear probing?",
        answers: [
            { text: "A) A method where keys are stored in the next available slot", correct: true },
            { text: "B) A method where keys are inserted at random locations", correct: false },
            { text: "C) A method where keys are stored in a linked list", correct: false },
            { text: "D) A method where two hash functions are used", correct: false },
        ],
    },
    {
        question: "What does the term 'load factor' refer to in a hash table?",
        answers: [
            { text: "A) The number of hash functions in use", correct: false },
            { text: "B) The ratio of the number of entries to the number of buckets", correct: true },
            { text: "C) The total size of the hash table", correct: false },
            { text: "D) The frequency of hash collisions", correct: false },
        ],
    },
    {
        question: "Which of the following is NOT a property of a cryptographic hash function?",
        answers: [
            { text: "A) Pre-image resistance", correct: false },
            { text: "B) Collision resistance", correct: false },
            { text: "C) Avalanche effect", correct: false },
            { text: "D) Reversibility", correct: true },
        ],
    },
    {
        question: "How does quadratic probing resolve hash collisions?",
        answers: [
            { text: "A) By increasing the probe interval linearly", correct: false },
            { text: "B) By squaring the probe interval", correct: true },
            { text: "C) By chaining the collided elements", correct: false },
            { text: "D) By using a second hash function", correct: false },
        ],
    },
    {
        question: "What is the time complexity for insertion in a hash table with open addressing in the worst case?",
        answers: [
            { text: "A) O(1)", correct: false },
            { text: "B) O(n)", correct: true },
            { text: "C) O(log n)", correct: false },
            { text: "D) O(n^2)", correct: false },
        ],
    },
    {
        question: "Which of the following is a common use of hashing?",
        answers: [
            { text: "A) Sorting data", correct: false },
            { text: "B) Indexing in a database", correct: true },
            { text: "C) Compressing data", correct: false },
            { text: "D) Encrypting data", correct: false },
        ],
    },
    {
        question: "Which of the following is true about hash functions in cryptography?",
        answers: [
            { text: "A) They are designed to be fast and reversible", correct: false },
            { text: "B) They are one-way functions that are difficult to reverse", correct: true },
            { text: "C) They are primarily used for sorting data", correct: false },
            { text: "D) They cannot handle large amounts of data", correct: false },
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