// the list of question and their answers

let quizData = [
    {
        "question": "What are the features available in Django web framework?",
        "ch1": "Admin Interface (CRUD)",
        "ch2": "Templating",
        "ch3": "Form handling",
        "ch4": "All of the above",
        "correct": "ch4"
    },
    {
        "question": "Which of the following is the inheritance style in Django?",
        "ch1": "Abstract base classes",
        "ch2": "Multi-table inheritance",
        "ch3": "Proxy models",
        "ch4": "All of the above",
        "correct": "ch4"
    },
    {
        "question": "Which method is used rather than a path() in urls.py to pass in regular expressions as routes?",
        "ch1": "url()",
        "ch2": "static()",
        "ch3": "include()",
        "ch4": "reg()",
        "correct": "ch1"
    },
    {
        "question": "What is the meaning of {{name}} in Django Templates?",
        "ch1": "It will show some static value",
        "ch2": "It would be showed as the name in HTML.",
        "ch3": "The name will be replaced by values of Python variable.",
        "ch4": "None",
        "correct": "ch3"
    },
    {
        "question": "What is the Django command to view a database schema of an existing (or legacy) database?",
        "ch1": "manage.py inspect",
        "ch2": "manage.py legacydb",
        "ch3": "manage.py inspectdb",
        "ch4": "None",
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
    let progressLabel = document.getElementById("progress_label");

    let width = (questionNumber / quizData.length) * 100;
    progress.style.width = width + "%";
    progressLabel.innerHTML = `${questionNumber}/${quizData.length}`;
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
            let quiz = document.getElementById("quiz");
            quiz.innerHTML = `<h2>Your score: ${score}/${quizData.length}</h2>`
            submitBtn.setAttribute("onclick", "location.reload()");
            submitBtn.innerHTML = "Retake";
        }
    } else {
        error.style.display = "block";
    }
});
