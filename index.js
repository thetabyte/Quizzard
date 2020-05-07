/* Game Engine*/

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterVal = document.getElementById("questionCounter")
const scoreVal = document.getElementById("score")

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question:
      "Who is the founder of HNG?",
    choice1: "King Abesh",
    choice2: "Muhammadu Buhari",
    choice3: "Mark Essien",
    choice4: "Indaboski Liquid Metal",
    answer: 3
  },
  {
    question:
      " Who is the Governor of Lagos?",
    choice1: "Psquare",
    choice2: "Sade Adu",
    choice3: "SanwoOlu",
    choice4: "King Kong",
    answer: 3
  },
  {
    question:
      "What is Seyi Onifade's slack ID?",
    choice1: "Seyi Onifade",
    choice2: "egungun be careful",
    choice3: "xyluz",
    choice4: "borokini",
    answer: 3
  },
  {
    question: " How many states are there in Nigeria?",
    choice1: "16",
    choice2: "17",
    choice3: "33",
    choice4: "36",
    answer: 4
  }
];

//CONSTANTS
const CORRECT_MARK = 1; 
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("");
  }
  questionCounter++;
  questionCounterVal.innerText = `${questionCounter} / ${MAX_QUESTIONS}`;
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
      
      if (classToApply === "correct") {
        incrementScore(CORRECT_MARK);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1500);
  });
});

incrementScore = num => {
    score += num;
    scoreVal.innerText = score;
};

const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
  console.log("clicked the save button!");
  e.preventDefault();
};

startGame();