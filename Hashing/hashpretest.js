// Pretest Quiz Data (Basic Hashing Questions)
const quizData = [
    {
        question: "What is hashing?",
        answers: [
            { text: "A) A way to store data in sorted order", correct: false },
            { text: "B) A technique to convert data into a fixed-size value or key", correct: true },
            { text: "C) A method to encrypt data", correct: false },
            { text: "D) A type of data structure", correct: false },
        ],
    },
    {
        question: "What is the main purpose of a hash function?",
        answers: [
            { text: "A) To compress data", correct: false },
            { text: "B) To map data of arbitrary size to a fixed size", correct: true },
            { text: "C) To search for data", correct: false },
            { text: "D) To encrypt data", correct: false },
        ],
    },
    {
        question: "What is a hash collision?",
        answers: [
            { text: "A) When two hash functions produce different results for the same input", correct: false },
            { text: "B) When two different inputs produce the same hash output", correct: true },
            { text: "C) When a hash function fails to produce a hash", correct: false },
            { text: "D) When a hash table is full", correct: false },
        ],
    },
    {
        question: "Which of the following is a popular hash function used in many programming applications?",
        answers: [
            { text: "A) SHA-256", correct: false },
            { text: "B) MD5", correct: false },
            { text: "C) CRC32", correct: false },
            { text: "D) All of the above", correct: true },
        ],
    },
    {
        question: "What is a hash table?",
        answers: [
            { text: "A) A table where hash values are stored", correct: false },
            { text: "B) A data structure that stores key-value pairs and uses a hash function to index the keys", correct: true },
            { text: "C) A table that stores sorted data", correct: false },
            { text: "D) A table used for encrypting data", correct: false },
        ],
    },
    {
        question: "What is the time complexity of searching for an element in a hash table on average?",
        answers: [
            { text: "A) O(1)", correct: true },
            { text: "B) O(log n)", correct: false },
            { text: "C) O(n)", correct: false },
            { text: "D) O(n^2)", correct: false },
        ],
    },
    {
        question: "What is the load factor in a hash table?",
        answers: [
            { text: "A) The number of keys stored in the hash table", correct: false },
            { text: "B) The ratio of the number of entries to the number of buckets", correct: true },
            { text: "C) The total size of the hash table", correct: false },
            { text: "D) The number of hash functions used", correct: false },
        ],
    },
    {
        question: "Which collision resolution technique uses a linked list to handle collisions?",
        answers: [
            { text: "A) Open addressing", correct: false },
            { text: "B) Separate chaining", correct: true },
            { text: "C) Double hashing", correct: false },
            { text: "D) Linear probing", correct: false },
        ],
    },
    {
        question: "Which collision resolution method uses probing to find the next available slot in the hash table?",
        answers: [
            { text: "A) Separate chaining", correct: false },
            { text: "B) Quadratic probing", correct: false },
            { text: "C) Linear probing", correct: true },
            { text: "D) Cuckoo hashing", correct: false },
        ],
    },
    {
        question: "In cryptographic hashing, what property ensures that it is computationally infeasible to find two different inputs that produce the same hash output?",
        answers: [
            { text: "A) Pre-image resistance", correct: false },
            { text: "B) Collision resistance", correct: true },
            { text: "C) Avalanche effect", correct: false },
            { text: "D) Uniform distribution", correct: false },
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
