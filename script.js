// declare constants for start and next and set value as buttons on html
const startButton = document.getElementById("start-btn");

const nextButton = document.getElementById("next-btn");
// declare const for the card and and answer elements
const questionContainerElement = document.getElementById("question-container");

const questionElement = document.getElementById("question");

const answerButtonsElement = document.getElementById("answer-buttons");
// declares const for the high scores
const highScoreContainerElement = document.getElementById("highScoreContainer");
// so we know which question inside of the shuffle questions array were on
let shuffledQuestions, currentQuestionIndex;
// creates an adjustable var for the score
let countRightAnswers = 0;

// clickiing start starts the game
startButton.addEventListener("click", startGame);
// click function for the next button to randomly shuffle through the remaining array
nextButton.addEventListener("click", () => {
  // adds 1 to current next index
  currentQuestionIndex++;
  setNextQuestion();
});

startButton.addEventListener("click", startGame);
//  starts the game
function startGame() {
  // resets the counter after the test started
  countRightAnswers = 0;
  // hides the start button
  startButton.classList.add("hide");
  // sets the shuffled questions to equal the shuffled array/gives completely random array
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  // starting on the first object in the array of questions
  currentQuestionIndex = 0;
  // removes the hide from the questions
  questionContainerElement.classList.remove("hide");
  // sets the questions for us
  setNextQuestion();
}

// creates function for starting the timer
function startTimer() {
  // states the variable and val of the counter
  var counter = 53;
  // function for counter going to 0
  setInterval(function () {
    counter--;
    // if the timer is greater than 0 continue the counter
    if (counter >= 0) {
      span = document.getElementById("count");
      span.innerHTML = counter;
    }

    // if the counter is 0 hide the question container
    if (counter === 0) {
      questionContainerElement.classList.add("hide");
      // end the interval
      clearInterval(counter);
    }
    // interval rate
  }, 1000);
}

// function for starting the timer when the start button is pressed
function start() {
  // accesses the timer from html and styles it then starts the timer function
  document.getElementById("count").style = "color:green;";
  startTimer();
}

// function for calling the next question object
function setNextQuestion() {
  // resets everything related to our form, questions, body back to default everytime i set a new question
  resetState();
  // takes our current question and shows it
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// takes a question
function showQuestion(question) {
  // takes the value of const question and the random question then displays it in the html
  questionElement.innerText = question.question;
  // loop through the questions answers, single snswer for each
  question.answers.forEach((answer) => {
    // create the button for each
    const button = document.createElement("button");
    // setting the inner text to our answers
    button.innerText = answer.text;
    // set our class
    button.classList.add("btn");
    // if our answer is correct
    if (answer.correct) {
      // gives data to our button
      button.dataset.correct = answer.correct;
    }
    // the event for clicking an answer/takes our event in as a parameter
    button.addEventListener("click", selectAnswer);
    // adds to answer buttons element by appending the button i created
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  // clearing the status class for the body
  clearStatusClass(document.body);
  // hides the next button after you switch questions
  nextButton.classList.add("hide");
  // if their is a child inside the answer button element, we want to remove it
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  // gives what button was selected
  const selectedButton = e.target;
  // checks the dataset for correct
  const correct = selectedButton.dataset.correct;
  // takes the data of the body and sets to correct or wrong
  setStatusClass(document.body, correct);
  // loop through the array for each button and checks button dataset for correct or wrong
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  // checks for more questions, if we have more show next
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  }
  // shows the restart button if no more questions
  else {
    startButton.innerText = "restart";
    startButton.classList.remove("hide");
  }
  // adss a value of one for every right answer
  if ((selectedButton.dataset = correct)) {
    countRightAnswers++;
  }
  // Button.addEventListener("click", showQuestion);
  document.getElementById("right-answers").innerHTML = countRightAnswers; // span will show the score
}

function setStatusClass(element, correct) {
  // sets the class of an element depending on status
  clearStatusClass(element);
  // if correct apply this class
  if (correct) {
    element.classList.add("correct");
  }
  // if wrong aapply this class
  else {
    element.classList.add("wrong");
  }
}

// clears applied element classes
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

// declares const array of questions
const questions = [
  // first object of the array
  {
    question: "who did the first 900?",
    // array of answers
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
