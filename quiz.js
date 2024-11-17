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
        questionElement.className = 'question';
        questionElement.innerHTML = `<p>${index + 1}. ${questionData.question}</p>`;

        const optionsElement = document.createElement('div');
        optionsElement.className = 'options';

        const shuffledOptions = [...questionData.options];
        shuffleArray(shuffledOptions);

        shuffledOptions.forEach((option, optionIndex) => {
            const optionElement = document.createElement('div');
            optionElement.innerHTML = `
                <input type="radio" id="q${index}_option${optionIndex}" name="q${index}" value="${option}">
                <label for="q${index}_option${optionIndex}">${option}</label>
            `;
            optionsElement.appendChild(optionElement);
        });

        questionElement.appendChild(optionsElement);
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
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestions();
}

function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
            <p>
                <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
                <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
                <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
            </p>
        `;
    }

    resultContainer.innerHTML = `
        <p>You scored ${score} out of ${quizData.length}!</p>
        <p>Incorrect Answers:</p>
        ${incorrectAnswersHtml}
    `;
}

submitButton.addEventListener('click', checkAnswers);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

loadQuiz();