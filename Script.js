const questions = [
    {
        question: "What is 7 x 0?",
        options: ["3.5", "0", "7", "14", "49"],
        answer: "0",
        correctExplanation: "Correct, Anything times 0 is 0",
        incorrectExplanation: "7 x 0 = 0, anything timed by 0 is 0",
    },
    {
        question: "What is the Capital city of Australia?",
        options: ["Melbourne", "Canberra", "Sydney", "Brisbane", "Perth"],
        answer: "Canberra",
        correctExplanation: "Correct, Sydney is the largest city, followed by Melbourne, Brisbane, and Perth, Canberra may be the capital but its only the eighth largest city",
        incorrectExplanation: "Incorrect: Canberra is the Capital and eighth largest city, Sydney is the largest city, Melbourne is second largest, Brisbane is third largest, and Perth is fourth largest",
    },
    {
        question: "How many Earths could fit inside Uranus?",
        options: ["2", "16", "29", "40", "63"],
        answer: "63",
        correctExplanation: "I guess you knew Uranus was so big",
        incorrectExplanation: "Uranus is so big that 63 Earths could fit inside it"
    },
    {
        question: "What is the air-speed velocity of an unladen swallow?",
        options: ["African or European?", "11 m/s", "24 m/s", "42 m/s"],
        answer: "African or European?",
        correctExplanation: "What do you mean? An African or European swallow? - *you pass*",
        incorrectExplanation: "What?! i don't know that - AAAAAAAHH - *you're thrown off a cliff*",
    },
    {
        question: "What is the answer to the ultimate question of life, the universe, and everything?",
        options: ["24", "16", "42", "6"],
        answer: "42",
        correctExplanation: "You may not like it after processing this answer for 7.5 million years, but there it is",
        incorrectExplanation: "The answer to the ultimate question of life, the universe, and everything is 42",
    },
    {
        question: "What word is always spelled incorrectly in every dictionary?",
        options: ["Misspelled", "Incorrectly", "Wrong", "Mistake"],
        answer: "Incorrectly",
        correctExplanation: "Correct: You'd be both correct and incorrect if you chose incorrectly",
        incorrectExplanation: "Incorrect: Incorrectly is spelt incorrectly",
    },
    {
        question: "What is the longest word in the English language?",
        options: ["Pneumonoultramicroscopicsilicovolcanoconiosis", "Antidisestablishmentarianism", "Hippopotomonstrosesquippedaliophobia", "Supercalifragilisticexpialidocious"],
        answer: "Pneumonoultramicroscopicsilicovolcanoconiosis",
        explanation: "Pneumonoultramicroscopicsilicovolcanoconiosis is the longest word in the English language",
        correctExplanation: "Well done, you have eyes that work",
        incorrectExplanation: "Incorrect: Pneumonoultramicroscopicsilicovolcanoconiosis is the longest word in the English language, but that should have been obvious",
    },
    {
        question: "What goes up but never comes down?",
        options: ["Age", "An Elevator", "Rain", "Fuel prices"],
        answer: "Age",
        correctExplanation: "Correct: Age is the one thing we all can't run from",
        incorrectExplanation: "Incorrect: Age is the correct answer, sometimes fuel prices decline",
    },
    {
        question: "What has keys but can't open locks?",
        options: ["Keyboard", "Piano", "Lock", "Computer"],
        answer: "Piano",
        correctExplanation: "Piano is correct",
        incorrectExplanation: "Incorrect: A keyboard can unlock a computer, a computer has a keyboard, and a lock can be unlocked by a key. A piano has keys but can't open locks",
    },
    {
        question: "What has a head, a tail, is brown, and has no legs?",
        options: ["Penny", "A tree", "Dog", "A Conga line"],
        answer: "Penny",
        correctExplanation: "Correct, now toss that coin to your Witcher",
        incorrectExplanation: "Incorrect: A penny has a head and a tail, is brown, and has no legs",
    },
    {
        question: "Schrodinger's cat is an example of what?",
        options: ["Quantum Physics", "Relativity", "Astrophysics", "Thermodynamics"],
        answer: "Quantum Physics",
        correctExplanation: "Correct: The cat is both dead and alive until you open the box",
        incorrectExplanation: "Incorrect: Schrodinger's cat is a famous example of quantum physics, it is a thought experiment that illustrates the concept of superposition. For example: The coin you toss to your Witcher, while it's spinning in the air it's both heads and tails up until they catch it and see which side is up; it's only when you observe it, that it settles into one definite state. ",
    },
    {
        question: "Which is the only mammal capable of *true flight*?",
        options: ["Bat", "Bird", "Butterfly", "Bee"],
        answer: "Bat",
        correctExplanation: "Correct: Well spotted",
        incorrectExplanation: "Incorrect: Bats are the only mammals on the list"
    },
    {
        question: "According to the Guinness world book of records, what is the best selling copyrighted book of all time?",
        options: ["Harry Potter", "Guinness world book of records", "The Bible", "The Quran", "The Lord of the rings", "Don Quixote"],
        answer: "Guinness world book of records",
        correctExplanation: "You're correct: Didn't fancy clicking The Bible then? The Bible is the most sold book of all time, but for the most part it's not copyrighted",
        incorrectExplanation: "Incorrect: While the Bible is considered the best-selling book overall, it is not considered a copyrighted work. So when looking at solely copyrighted books, the Guinness World Book of Records holds the top spot. "
    },
    {
        question: "How many months have 28 days?",
        options: ["1", "6", "12", "2"],
        answer: "12",
        correctExplanation: "Alright smartass",
        incorrectExplanation: "Incorrect, all months have 28 days"
    },
];


let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const answerModal = document.getElementById("answerModal");
const answerExplanation = document.getElementById("answerExplanation");
const nextQuestionButton = document.getElementById("nextQuestion");
const startScreen = document.getElementById("startScreen");
const startQuizButton = document.getElementById("startQuizButton");
const quizContainer = document.querySelector(".quiz-container");

// Wrap everything in a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {

    function loadQuestion() {
        const q = questions[currentQuestion];
        questionElement.textContent = q.question;
        optionsElement.innerHTML = "";

        q.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.addEventListener("click", () => checkAnswer(option));
            optionsElement.appendChild(button);
        });
    }

    function checkAnswer(selectedOption) {
        const q = questions[currentQuestion];
        let explanation = "";

        userAnswers.push({
            question: q.question,
            selectedAnswer: selectedOption,
            correctAnswer: q.answer,
            correct: selectedOption === q.answer
        });

        if (selectedOption === q.answer) {
            score++;
            explanation = q.correctExplanation;
        } else {
            explanation = q.incorrectExplanation;
        }

        answerExplanation.textContent = explanation;
        answerModal.style.display = "block";
    }

    function nextQuestion() {
        console.log("next question button clicked")
        console.log("nextQuestion called");
        console.log("currentQuestion before increment:", currentQuestion);
        currentQuestion++;
        console.log("currentQuestion after increment:", currentQuestion);
        console.log("questions.length:", questions.length);
        if (currentQuestion < questions.length) {
            console.log("Loading next question");
            answerModal.style.display = "none";
            loadQuestion();
        } else {
            console.log("Showing detailed results");
            showDetailedResults();
            answerModal.style.display = "none";
        }
    }

    function showDetailedResults() {
        questionElement.textContent = "";
        optionsElement.innerHTML = "";
        let resultsHTML = "<h2>Quiz Results</h2>";

        userAnswers.forEach(answer => {
            resultsHTML += `<p><strong>Question:</strong> ${answer.question}<br>`;
            resultsHTML += `<strong>Your Answer:</strong> ${answer.selectedAnswer}<br>`;
            resultsHTML += `<strong>Correct Answer:</strong> ${answer.correctAnswer}<br>`;
            resultsHTML += answer.correct ? "<span style='color: green;'>Correct</span></p>" : "<span style='color: red;'>Incorrect</span></p>";
        });

        resultElement.innerHTML = resultsHTML + `<p>Your score: ${score} out of ${questions.length}</p>`;
    }

    function showResult() {
        questionElement.textContent = "";
        optionsElement.innerHTML = "";
        resultElement.textContent = `Your score: ${score} out of ${questions.length}`;
    }

    // Event listener for start quiz button
    startQuizButton.addEventListener("click", function() {
        startScreen.style.display = "none";
        quizContainer.style.display = "block";
        loadQuestion();
    });

    // Add event listener to "Next Question" button
    nextQuestionButton.addEventListener("click", nextQuestion);
});