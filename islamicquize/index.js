const questions = [
    {
        question: "ما هو أول مسجد بني في الإسلام؟",
        image: "/images/1.jpg",
        answers: ["المسجد النبوي", "المسجد الحرام", "مسجد قباء", "المسجد الأقصى"],
        correct: 2
    },
    {
        question: "كم عدد أركان الإسلام؟",
        image: "images/q2.jpg",
        answers: ["ثلاثة", "خمسة", "سبعة", "عشرة"],
        correct: 1
    },
    {
        question: "ما هي السورة التي تعدل ثلث القرآن؟",
        image: "images/q3.jpg",
        answers: ["الفلق", "الإخلاص", "الكافرون", "الناس"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;
let userAnswers = [];

function startQuiz() {
    shuffleQuestions();
    loadQuestion();
}

function shuffleQuestions() {
    questions.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    document.getElementById("time-left").textContent = timeLeft;
    timer = setInterval(updateTimer, 1000);

    const questionObj = questions[currentQuestionIndex];
    document.getElementById("question-image").src = questionObj.image;
    document.getElementById("question-text").textContent = questionObj.question;
    
    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";
    
    questionObj.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("answer-button");
        button.onclick = () => checkAnswer(index);
        answersContainer.appendChild(button);
    });
}

function updateTimer() {
    timeLeft--;
    document.getElementById("time-left").textContent = timeLeft;
    if (timeLeft === 0) {
        nextQuestion();
    }
}

function checkAnswer(selectedIndex) {
    clearInterval(timer);
    userAnswers.push({
        question: questions[currentQuestionIndex].question,
        selected: selectedIndex,
        correct: questions[currentQuestionIndex].correct
    });
    if (selectedIndex === questions[currentQuestionIndex].correct) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    document.getElementById("question-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    document.getElementById("score").textContent = `لقد حصلت على ${score} من ${questions.length}`;
    displayMistakes();
}

function displayMistakes() {
    const mistakesContainer = document.createElement("div");
    mistakesContainer.innerHTML = "<h3>الأخطاء:</h3>";
    userAnswers.forEach((answer, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.innerHTML = `<p><strong>${index + 1} - ${answer.question}</strong></p>`;
        
        const selectedAnswer = document.createElement("p");
        selectedAnswer.textContent = `إجابتك: ${questions[index].answers[answer.selected]}`;
        selectedAnswer.style.color = answer.selected === answer.correct ? "green" : "red";
        
        const correctAnswer = document.createElement("p");
        correctAnswer.textContent = `الإجابة الصحيحة: ${questions[index].answers[answer.correct]}`;
        correctAnswer.style.color = "green";
        
        questionDiv.appendChild(selectedAnswer);
        questionDiv.appendChild(correctAnswer);
        mistakesContainer.appendChild(questionDiv);
    });
    document.getElementById("result-container").appendChild(mistakesContainer);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    document.getElementById("result-container").style.display = "none";
    document.getElementById("question-container").style.display = "block";
    startQuiz();
}

document.addEventListener("DOMContentLoaded", startQuiz);