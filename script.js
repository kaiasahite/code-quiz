const startButton = document.getElementById("start-btn");

const nextButton = document.getElementById("next-btn");

const questionContainerElement = document.getElementById("question-container");

const questionElement = document.getElementById("question");

const answerButtonsElement = document.getElementById("answer-buttons");

const highScoreContainerElement = document.getElementById("highScoreContainer");

let shuffledQuestions, currentQuestionIndex;

let countRightAnswers = 0;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

startButton.addEventListener("click", startGame);

function startGame() {
  countRightAnswers = 0; // to reset the counter after the test started
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");

  setNextQuestion();
}

function startTimer() {
  var counter = 5;
  setInterval(function () {
    counter--;
    if (counter >= 0) {
      span = document.getElementById("count");
      span.innerHTML = counter;
    }
    if (counter === 0) {
      alert("sorry, out of time");
      questionContainerElement.classList.add("hide");

      clearInterval(counter);
    }
  }, 1000);
}

function start() {
  document.getElementById("count").style = "color:green;";
  startTimer();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;

  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "restart";
    startButton.classList.remove("hide");
  }
  if ((selectedButton.dataset = correct)) {
    countRightAnswers++;
    // +1, change it if you need +10, +25 etc
  }
  button.addEventListener("click", showQuestion);
  document.getElementById("right-answers").innerHTML = countRightAnswers; // span will show the score
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "who did the first 900?",
    answers: [
      { text: "tony hawk", correct: true },
      { text: "tas pappas", correct: false },
      { text: "rodney mullen", correct: false },
      { text: "ben frnaklin", correct: false },
    ],
  },

  {
    question: "who did the first kickflip?",
    answers: [
      { text: "tony hawk", correct: false },
      { text: "tas pappas", correct: false },
      { text: "Benfranklin", correct: false },
      { text: "rodney mullen", correct: true },
    ],
  },

  {
    question: "who tre flipped el toro?",
    answers: [
      { text: "tony hawk", correct: false },
      { text: "chriscole", correct: true },
      { text: "rodney mullen", correct: false },
      { text: "tas pappas", correct: false },
    ],
  },

  {
    question: "whos your bf?",
    answers: [
      { text: "tony hawk", correct: false },
      { text: "tas pappas", correct: false },
      { text: "rodney mullen", correct: false },
      { text: "ben frnaklin", correct: true },
    ],
  },
];
