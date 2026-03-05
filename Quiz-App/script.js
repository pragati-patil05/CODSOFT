let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
let newQuiz = [];
let currentIndex = parseInt(localStorage.getItem("currentIndex")) || 0;
let score = parseInt(localStorage.getItem("score")) || 0;

let selectedOption = null;
let timerInterval;

/* AUTH */
function register() {
    let username = document.getElementById("username").value;
     let password = document.getElementById("password").value;

    localStorage.setItem("user", username);
    localStorage.setItem("pass", password);

    alert("Registered!");
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (username === localStorage.getItem("user")&&
    password === localStorage.getItem("pass")) {
        window.location.href = "dashboard.html";
    } else {
        alert("invalid credentials");
    }
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}

/* Dashboard */
if (window.location.pathname.includes("dashboard.html")) {
    document.getElementById("welcome").innerText =
        "Welcome, " + localStorage.getItem("user");

    let list = document.getElementById("quizList");
    list.innerHTML = "";

quizzes.forEach((quiz, index) => {
    list.innerHTML += `
        <div style="margin-bottom:10px;">
            <strong>${quiz.title}</strong>
            <button onclick="startQuiz(${index})">Start</button>
            <button onclick="deleteQuiz(${index})" style="background:red;">Delete</button>
        </div>`;
});
}

/* Create Quiz */
function addQuestion() {

    let q = document.getElementById("question").value;
    let options = [
        document.getElementById("opt1").value,
        document.getElementById("opt2").value,
        document.getElementById("opt3").value,
        document.getElementById("opt4").value
    ];
    let correct = document.getElementById("correct").value;

    if (!q || options.includes("")) {
        alert("Fill all fields!");
        return;
    }

    newQuiz.push({ question: q, options, correct });

    alert("Question Added! Total Questions: " + newQuiz.length);

    // 🔥 Clear inputs after adding
    document.getElementById("question").value = "";
    document.getElementById("opt1").value = "";
    document.getElementById("opt2").value = "";
    document.getElementById("opt3").value = "";
    document.getElementById("opt4").value = "";
}

function saveQuiz() {

    let title = document.getElementById("quizTitle").value;

    if (!title) {
        alert("Enter quiz title!");
        return;
    }

    let existingQuiz = quizzes.find(q => q.title === title);

    if (existingQuiz) {
        existingQuiz.questions.push(...newQuiz);
        alert("Questions added to existing quiz!");
    } else {
        quizzes.push({
            title,
            questions: newQuiz
        });
        alert("New Quiz Created!");
    }

    localStorage.setItem("quizzes", JSON.stringify(quizzes));

    newQuiz = []; // reset

    window.location.href = "dashboard.html";
}

/* Start Quiz */
function startQuiz(index) {
    currentIndex = 0;
    score = 0;
    localStorage.setItem("currentQuiz", index);
    localStorage.setItem("currentIndex", 0);
    window.location.href = "quiz.html";
}
    function deleteQuiz(index) {

    if (confirm("Are you sure you want to delete this quiz?")) {

        quizzes.splice(index, 1); // remove from array

        localStorage.setItem("quizzes", JSON.stringify(quizzes)); // update storage

        location.reload(); // refresh dashboard
    }
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

   document.getElementById("question").innerText =
    "Question " + (currentIndex + 1) + " of " +
    quiz.questions.length + ": " + q.question;
    selectedOption = null;

    let html = "";
    q.options.forEach((opt, i) => {
        html += `<div class="option" onclick="selectOption(this,${i})">${opt}</div>`;
    });

    document.getElementById("options").innerHTML = html;

   let progress = ((currentIndex + 1) / quiz.questions.length) * 100;
    document.getElementById("progressBar").style.width = progress + "%";
}


function selectOption(el, index) {
    document.querySelectorAll(".option")
        .forEach(o => o.classList.remove("selected"));
    el.classList.add("selected");
    selectedOption = index;
}

function nextQuestion() {

    let quizIndex = localStorage.getItem("currentQuiz");
    let quiz = quizzes[quizIndex];

    if (selectedOption == quiz.questions[currentIndex].correct) {
        score++;
    }

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
function prevQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        localStorage.setItem("currentIndex", currentIndex);
        loadQuestion();
        resetTimer();
    }
}
function quitQuiz() {
    localStorage.removeItem("currentQuiz");
    localStorage.removeItem("currentIndex");
    localStorage.removeItem("score");
    window.location.href = "dashboard.html";
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
