const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [
  {
    question: "What does the acronym 'DOM' stand for in JavaScript?",
    choice1: "Document Object Model",
    choice2: "Direct Object Manipulation",
    choice3: "Data Object Management",
    choice4: "Dynamic Object Methodology",
    answer: 1,
  },
  {
    question: "Which of the following is NOT a data type in JavaScript?",
    choice1: "Boolean",
    choice2: "Number",
    choice3: "Float",
    choice4: "String",
    answer: 3,
  },
  {
    question: "Which of the following is a JavaScript framework?",
    choice1: "React",
    choice2: "Django",
    choice3: "Laravel",
    choice4: "Express",
    answer: 1,
  },
  {
    question: "What keyword is used to declare a variable in JavaScript?",
    choice1: "let",
    choice2: "variable",
    choice3: "var",
    choice4: "const",
    answer: 1,
  },
  {
    question: "Which built-in function in JavaScript is used to sort an array?",
    choice1: "sort()",
    choice2: "splice()",
    choice3: "concat()",
    choice4: "slice()",
    answer: 1,
  },
  {
    question: "What does the acronym 'AJAX' stand for in JavaScript?",
    choice1: "Asynchronous JavaScript and XML",
    choice2: "Advanced JavaScript and XHTML",
    choice3: "Application JavaScript and XML",
    choice4: "Asynchronous JavaScript and XHTML",
    answer: 1,
  },
  {
    question: "What does the 'this' keyword refer to in JavaScript?",
    choice1: "The global object",
    choice2: "The function itself",
    choice3: "The object that owns the function",
    choice4: "The parent object",
    answer: 3,
  },
  {
    question: "Which operator is used to compare values and data types in JavaScript?",
    choice1: "==",
    choice2: "===",
    choice3: "!=",
    choice4: "!==",
    answer: 2,
  },
  {
    question: "Which method is used to add an element to the end of an array in JavaScript?",
    choice1: "push()",
    choice2: "pop()",
    choice3: "shift()",
    choice4: "unshift()",
    answer: 1,
  },
  {
    question: "Which method is used to remove an element from the beginning of an array in JavaScript?",
    choice1: "shift()",
    choice2: "pop()",
    choice3: "slice()",
    choice4: "splice()",
    answer: 1,
  },
  {
    question: "Which method is used to replace a substring in a string in JavaScript?",
    choice1: "replace()",
    choice2: "substr()",
    choice3: "slice()",
    choice4: "splice()",
    answer: 1,
  },
  {
    question: "Which of the following is a JavaScript library?",
    choice1: "Bootstrap",
    choice2: "Node.js",
    choice3: "jQuery",
    choice4: "Angular",
    answer: 3,
  },
  {
    question: "What is the result of the following code?\n\nconsole.log(typeof null);",
    choice1: "null",
    choice2: "undefined",
    choice3: "object",
    choice4: "number",
    answer: 3,
  },
  {
    question: "What is the result of the following code?\n\nvar arr = [1, 2, 3];\narr.length = 0;\nconsole.log(arr.length);",
    choice1: "0",
    choice2: "1",
    choice3: "2",
    choice4: "3",
    answer: 1,
  },
  {
    question: "What is the result of the following code?\n\nconsole.log(+'3' + -'2');",
    choice1: "1",
    choice2: "5",
    choice3: "12",
    choice4: "-1",
    answer: 1,
  },

];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 15;

let startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) {
      return;
    }

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
