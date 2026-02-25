let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
let newQuiz = [];
let currentIndex = 0;
let score = 0;
let selectedOption = null;
let timerInterval;

/* AUTH */
function register() {
    let username = document.getElementById("username").value;
    localStorage.setItem("user", username);
    alert("Registered!");
}

function login() {
    let username = document.getElementById("username").value;
    if (username === localStorage.getItem("user")) {
        window.location.href = "dashboard.html";
    } else {
        alert("User not found!");
    }
}

function logout() {
    window.location.href = "index.html";
}

/* Dashboard */
if (window.location.pathname.includes("dashboard.html")) {
    document.getElementById("welcome").innerText =
        "Welcome, " + localStorage.getItem("user");

    let list = document.getElementById("quizList");
    quizzes.forEach((quiz, index) => {
        list.innerHTML += `
            <div>
                ${quiz.title}
                <button onclick="startQuiz(${index})">Start</button>
            </div>`;
    });
}

/* Create Quiz */
function addQuestion() {
    let q = document.getElementById("question").value;
    let options = [
        opt1.value, opt2.value, opt3.value, opt4.value
    ];
    let correct = document.getElementById("correct").value;
    newQuiz.push({ question: q, options, correct });
    alert("Question Added!");
}

function saveQuiz() {
    let title = document.getElementById("quizTitle").value;
    quizzes.push({ title, questions: newQuiz });
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    alert("Quiz Saved!");
    window.location.href = "dashboard.html";
}

/* Start Quiz */
function startQuiz(index) {
    localStorage.setItem("currentQuiz", index);
    window.location.href = "quiz.html";
}

/* Quiz Logic */
if (window.location.pathname.includes("quiz.html")) {
    loadQuestion();
    startTimer();
}


function loadQuestion() {

    let quizIndex = localStorage.getItem("currentQuiz");

    if (quizIndex === null || !quizzes[quizIndex]) {
        alert("Quiz not found!");
        window.location.href = "dashboard.html";
        return;
    }

    let quiz = quizzes[quizIndex];

    if (!quiz.questions || quiz.questions.length === 0) {
        alert("No questions available in this quiz!");
        window.location.href = "dashboard.html";
        return;
    }

    if (currentIndex >= quiz.questions.length) {
        return;
    }

    let q = quiz.questions[currentIndex];

    document.getElementById("question").innerText = q.question;

    let html = "";
    q.options.forEach((opt, i) => {
        html += `<div class="option" onclick="selectOption(this,${i})">${opt}</div>`;
    });

    document.getElementById("options").innerHTML = html;

    let progress = (currentIndex / quiz.questions.length) * 100;
    document.getElementById("progressBar").style.width = progress + "%";
}


function selectOption(el, index) {
    document.querySelectorAll(".option")
        .forEach(o => o.classList.remove("selected"));
    el.classList.add("selected");
    selectedOption = index;
}

function nextQuestion() {
    let quiz = quizzes[localStorage.getItem("currentQuiz")];

    if (selectedOption == quiz.questions[currentIndex].correct)
        score++;

    selectedOption = null;
    currentIndex++;

    if (currentIndex < quiz.questions.length) {
        loadQuestion();
        resetTimer();
    } else {
        localStorage.setItem("finalScore", score);
        window.location.href = "result.html";
    }
}

/* Timer */
function startTimer() {
    let time = 15;
    timerInterval = setInterval(() => {
        document.getElementById("timer").innerText = time;
        time--;
        if (time < 0) {
            nextQuestion();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    startTimer();
}

/* Result */
if (window.location.pathname.includes("result.html")) {
    let quiz = quizzes[localStorage.getItem("currentQuiz")];
    let finalScore = localStorage.getItem("finalScore");
    let percentage = (finalScore / quiz.questions.length) * 100;

    document.getElementById("resultText").innerText =
        `Your Score: ${finalScore}/${quiz.questions.length}
         (${percentage}%)`;
}
