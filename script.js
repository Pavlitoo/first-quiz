const questions = [
    {
        question: "Где можно использовать JavaScript?",
        answers: [
            {text: "серверные приложения", correct: false},
            {text: "мобильные приложения", correct: false},
            {text: "веб-приложения", correct: false},
            {text: "можно во всех перечисленных", correct: true},
            {text: "прикладное программное обеспечение", correct: false}
        ]
    },

    {
        question: " В чем отличие между локальной и глобальной переменной?",
        answers: [
            {text: "отличий нет", correct: false},
            {text: "локальные видны повсюду, глобальные только в функциях", correct: false},
            {text: "глобальные видны повсюду, локальные только в функциях", correct: true},
            {text: "глобальные можно переопределять, локальные нельзя", correct: false}
        ]
    },

    {
        question: "Какая переменная записана неверно?",
        answers: [
            {text: "var number = 12,5;", correct: true},
            {text: "var isDone = 0;", correct: false},
            {text: "var b = false;", correct: false},
            {text: "var num = 'STRING';", correct: false}
        ]
    },

    {
        question: "В чем разница между confirm и prompt?",
        answers: [
            {text: "prompt вызывает диалоговое окно с полем для ввода, confirm - окно с подтверждением", correct: true},
            {text: "ничем не отличаются", correct: false},
            {text: "confirm вызывает диалоговое окно с полем для ввода, prompt - окно с подтверждением", correct: false}
        ]
    },

    {
        question: "Язык JavaScript является подвидом языка Java - верно?",
        answers: [
            {text: "да", correct: false},
            {text: "нет", correct: true},
            {text: "наоборот, Java - подвид JavaScript", correct: false}
        ]
    },

    {
        question: "Что такое замыкание в JavaScript?",
        answers: [
            {text: "способность функции вызывать саму себя", correct: false},
            {text: "способность функции запоминать все переменные", correct: false},
            {text: "способность функции запоминать область видимости, в которой эта функция была объявлена", correct: true}
        ]
    },
    {
        question: "Как объявить функцию в JavaScript?",
        answers: [
            {text: "function:MyFunction()", correct: false},
            {text: "function MyFunction()", correct: true},
            {text: "function = MyFunction()", correct: false},
            {text: "function = New MyFunction()", correct: false}
        ]
    },
    {
        question: "Какое из этих ключевых слов ООП не используется в JavaScript?",
        answers: [
            {text: "все есть", correct: true},
            {text: "new", correct: false},
            {text: "this", correct: false},
            {text: "instanceOf", correct: false}
        ]
    },
    {
        question: "Можно ли в скрипте перевести посетителя на другую страницу сайта?",
        answers: [
            {text: "да, но только в рамках текущего сайта", correct: false},
            {text: "нет, нельзя", correct: false},
            {text: "да, куда угодно", correct: true}
        ]
    },
    {
        question: "Чем отличается const от let?",
        answers: [
            {text: "const - не является частью JavaScript", correct: false},
            {text: "переменные, объявленные через const, находятся в глобальной видимости", correct: false},
            {text: "объявление const задаёт константу, то есть значение, которое нельзя менять", correct: true}
        ]
    },
    {
        question: "Расшифруйте аббревиатуру DOM.",
        answers: [
            {text: "Document Object Model", correct: true},
            {text: "Digital Optical Modulation", correct: false},
            {text: "Domestic Object Mode", correct: false}
        ]
    },
    {
        question: "Какой оператор завершает выполнение текущей функции и возвращает её значение?",
        answers: [
            {text: "case", correct: false},
            {text: "return", correct: true},
            {text: "break", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Далее";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Правильно ${score} с ${questions.length}!`;
    nextButton.innerHTML = "Пройти снова";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();


