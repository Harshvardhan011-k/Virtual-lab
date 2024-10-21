// Post-test Quiz Data (Division Method and Hashing Concepts)
const quizData = [
    {
        question: "What is the division method in hashing?",
        answers: [
            { text: "A) A method to split data into halves for faster retrieval", correct: false },
            { text: "B) A technique where the key is divided by a table size and the remainder is used as the hash index", correct: true },
            { text: "C) A way to convert data into a fixed-size value", correct: false },
            { text: "D) A method to handle collisions in hash tables", correct: false },
        ],
    },
    {
        question: "In the division method, what happens if two keys produce the same hash index?",
        answers: [
            { text: "A) The second key overwrites the first key", correct: false },
            { text: "B) A collision occurs and a collision resolution method must be used", correct: true },
            { text: "C) Both keys are stored at the same index", correct: false },
            { text: "D) The index is recalculated", correct: false },
        ],
    },
    {
        question: "What is separate chaining in hashing?",
        answers: [
            { text: "A) A method to store multiple elements in the same bucket using linked lists", correct: true },
            { text: "B) A method where each element is stored in a separate table", correct: false },
            { text: "C) A probing method to resolve collisions", correct: false },
            { text: "D) A way to split hash functions", correct: false },
        ],
    },
    {
        question: "Which of the following is NOT a collision resolution technique?",
        answers: [
            { text: "A) Linear probing", correct: false },
            { text: "B) Double hashing", correct: false },
            { text: "C) Quadratic probing", correct: false },
            { text: "D) Key shifting", correct: true },
        ],
    },
    {
        question: "What is the load factor of a hash table?",
        answers: [
            { text: "A) The ratio of the number of keys stored to the total table size", correct: true },
            { text: "B) The average number of collisions", correct: false },
            { text: "C) The number of hash functions used", correct: false },
            { text: "D) The number of key-value pairs stored in a single bucket", correct: false },
        ],
    },
    {
        question: "What is open addressing?",
        answers: [
            { text: "A) A way of storing elements at the next available position in case of collision", correct: true },
            { text: "B) A way to store multiple elements in the same bucket", correct: false },
            { text: "C) A method where the hash function is recalculated", correct: false },
            { text: "D) A method to sort hash table entries", correct: false },
        ],
    },
    {
        question: "Which collision resolution method finds the next available slot by incrementing the index linearly?",
        answers: [
            { text: "A) Quadratic probing", correct: false },
            { text: "B) Linear probing", correct: true },
            { text: "C) Double hashing", correct: false },
            { text: "D) Separate chaining", correct: false },
        ],
    },
    {
        question: "What is double hashing?",
        answers: [
            { text: "A) A method that uses two different hash functions", correct: true },
            { text: "B) A method where each key is hashed twice", correct: false },
            { text: "C) A method that resolves collisions by chaining", correct: false },
            { text: "D) A method that doubles the size of the hash table", correct: false },
        ],
    },
    {
        question: "How does the division method calculate the hash index?",
        answers: [
            { text: "A) By multiplying the key by a constant", correct: false },
            { text: "B) By dividing the key by a prime number and taking the remainder", correct: true },
            { text: "C) By finding the average of the digits", correct: false },
            { text: "D) By converting the key to a binary string", correct: false },
        ],
    },
    {
        question: "What is the time complexity for insertion and search in a hash table with separate chaining in the worst case?",
        answers: [
            { text: "A) O(1)", correct: false },
            { text: "B) O(n)", correct: true },
            { text: "C) O(log n)", correct: false },
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