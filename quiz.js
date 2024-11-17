const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];
let quizData = [];

function loadQuiz() {
    fetch('quiz_info/skeleton_quiz.json')
        .then(response => response.json())
        .then(data => {
            quizData = data.quizData;
            displayQuestions();
        })
        .catch(error => console.error('Error loading quiz data:', error));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestions() {
    quizContainer.innerHTML = '';
    quizData.forEach((questionData, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question card mb-4';
        questionElement.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${index + 1}. ${questionData.question}</h5>
                <div class="options">
                    ${questionData.options.map((option, optionIndex) => `
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="q${index}" id="q${index}_option${optionIndex}" value="${option}">
                            <label class="form-check-label" for="q${index}_option${optionIndex}">${option}</label>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        quizContainer.appendChild(questionElement);
    });
}

function checkAnswers() {
    score = 0;
    incorrectAnswers = [];

    quizData.forEach((questionData, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption) {
            if (selectedOption.value === questionData.answer) {
                score++;
            } else {
                incorrectAnswers.push({
                    question: questionData.question,
                    incorrectAnswer: selectedOption.value,
                    correctAnswer: questionData.answer,
                });
            }
        }
    });

    displayResult();
}

function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestions();
}

function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
    resultContainer.style.display = 'block';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">Question: ${incorrectAnswers[i].question}</h5>
                    <p class="card-text"><strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}</p>
                    <p class="card-text"><strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}</p>
                </div>
            </div>
        `;
    }

    resultContainer.innerHTML = `
        <h4 class="mb-3">You scored ${score} out of ${quizData.length}!</h4>
        <h5 class="mb-3">Incorrect Answers:</h5>
        ${incorrectAnswersHtml}
    `;
}

submitButton.addEventListener('click', checkAnswers);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

loadQuiz();