const questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Paris', correct: true },
            { text: 'London', correct: false },
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false }
        ]
    },
    {
        question: 'Who is the CEO of Tesla?',
        answers: [
            { text: 'Jeff Bezos', correct: false },
            { text: 'Elon Musk', correct: true },
            { text: 'Bill Gates', correct: false },
            { text: 'Warren Buffet', correct: false }
        ]
    },
    {
        question: 'What is the largest planet in our solar system?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Jupiter', correct: true },
            { text: 'Mars', correct: false },
            { text: 'Saturn', correct: false }
        ]
    },
    {
        question: 'Which element has the chemical symbol O?',
        answers: [
            { text: 'Oxygen', correct: true },
            { text: 'Gold', correct: false },
            { text: 'Silver', correct: false },
            { text: 'Osmium', correct: false }
        ]
    },
    {
        question: 'What is the capital city of Japan?',
        answers: [
            { text: 'Seoul', correct: false },
            { text: 'Tokyo', correct: true },
            { text: 'Beijing', correct: false },
            { text: 'Bangkok', correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let username = '';

const welcomeContainer = document.getElementById('welcome');
const quizContainer = document.getElementById('quiz');
const scorecardContainer = document.getElementById('scorecard');

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');

const startQuizButton = document.getElementById('start-quiz-btn');
const restartButton = document.getElementById('restart-btn');

const usernameInput = document.getElementById('username-input');

startQuizButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        welcomeContainer.classList.add('hide');
        quizContainer.classList.remove('hide');
        startGame();
    } else {
        alert('Please enter your name.');
    }
});

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    resetState();
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            showScorecard();
        }
    }, 1000);
    scoreElement.innerText = score;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showScorecard() {
    quizContainer.classList.add('hide');
    scorecardContainer.classList.remove('hide');
    finalScoreElement.innerText = `${username}, your final score is ${score} out of ${questions.length}`;
}

restartButton.addEventListener('click', () => {
    scorecardContainer.classList.add('hide');
    welcomeContainer.classList.remove('hide');
});
