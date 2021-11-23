// the list of question and their answers
let quizData = [
    {
        "question": "What is question 1?",
        "ch1": "Answer 1",
        "ch2": "Answer 2",
        "ch3": "Answer 3",
        "ch4": "Answer 4",
        "correct": "ch3"
    },
    {
        "question": "What is question 20000?",
        "ch1": "Answer 1tt",
        "ch2": "Answer tt2",
        "ch3": "Answer 3tt",
        "ch4": "Answer 4tt",
        "correct": "ch2"
    },
    {
        "question": "What is question 1?",
        "ch1": "Answer 1",
        "ch2": "Answer 2",
        "ch3": "Answer 3",
        "ch4": "Answer 4",
        "correct": "ch4"
    },
    {
        "question": "What is question 20000?",
        "ch1": "Answer 1tt",
        "ch2": "Answer tt2",
        "ch3": "Answer 3tt",
        "ch4": "Answer 4tt",
        "correct": "ch1"
    }
]

function loadQuiz(questionNumber) {
    deselectChoices();

    let currentQuestion = quizData[questionNumber];
    let question = document.getElementById("question");
    let ch1 = document.getElementById("ch1_text");
    let ch2 = document.getElementById("ch2_text");
    let ch3 = document.getElementById("ch3_text");
    let ch4 = document.getElementById("ch4_text");

    question.innerHTML = currentQuestion["question"];
    ch1.innerHTML = currentQuestion["ch1"];
    ch2.innerHTML = currentQuestion["ch2"];
    ch3.innerHTML = currentQuestion["ch3"];
    ch4.innerHTML = currentQuestion["ch4"];
}
/*
function getNextQuestion() {
    if (questionNumber < quizData.length - 1) {
        questionNumber += 1;
        loadQuiz(questionNumber);
    } else {
        nextButton = document.getElementById("nextBtn");
        nextButton.innerHTML = "Submit";
    }
}

function getPreviousQuestion() {
    if (questionNumber > 0) {
        questionNumber -= 1;
        loadQuiz(questionNumber);
    }
}
*/

function getSelectedChoice() {
    let answer;
    let choices = document.querySelectorAll("input");
    choices.forEach(choice => {
        if (choice.checked) {
            answer = choice.id;
        }
    });
    return answer;
}

function deselectChoices() {
    let choices = document.querySelectorAll("input");
    choices.forEach(choice => {
        choice.checked = false;
    });
}

function showProgress(questionNumber) {
    let progress = document.getElementById("progress");
    width = (questionNumber / quizData.length) * 100;
    progress.style.width = width + "%";
}

let score = 0;
let questionNumber = 0;
let submitBtn = document.getElementById("submit");
let error = document.getElementById("error_msg");

loadQuiz(questionNumber);
showProgress(1);

submitBtn.addEventListener("click", () => {
    let answer = getSelectedChoice();
    if (answer) {
        error.style.display = "none";
        if (answer === quizData[questionNumber]["correct"]) {
            score += 1;
        }
        questionNumber += 1;
        if (questionNumber < quizData.length) {
            loadQuiz(questionNumber);
            showProgress(questionNumber + 1);
            submitBtn.innerHTML = (questionNumber == quizData.length - 1) ? "Submit" : "Next";
        } else {
            quiz = document.getElementById("quiz");
            quiz.innerHTML = `<h2>Your score: ${score}/${quizData.length}</h2>`
            submitBtn.setAttribute("onclick", "location.reload()");
            submitBtn.innerHTML = "Retake";
        }
    } else {
        error.style.display = "block";
    }
});
