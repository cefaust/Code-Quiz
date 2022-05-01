var startButtonEl = document.querySelector(".start-button");
var timerEl = document.querySelector(".timer-count");
var highScoreEl = document.querySelector(".high-score");
var quizQuestionsEl = document.querySelector(".quiz-questions");
var answerEl = document.querySelector(".game-answer");
var validationEl = document.querySelector(".validation");
var listHighScoreEl = document.querySelector(".score-list");
var secondsLeft = 30;
var isTimerRunning = false;
var pointsGained = 0;
var nextQuestion;
var leaderboard = [];
var questions = [
  "Javascript is an _______ language?",
  "Which of the following methods is used to access HTML elements using Javascript?",
  "Which function is used to serialize an object into a JSON string in Javascript?",
  "How to stop an interval timer in Javascript?",
  "How do we write a comment in javascript?",
  "Which object in Javascript doesn't have a prototype?",
  "Which of the following are not server-side Javascript objects?",
];

// an array of answers
// each answer
// if it's the correct answer

var answers = [
  [
    {
      text: "Object-Oriented",
      isCorrect: true,
    },
    {
      text: "Object-Based",
      isCorrect: false,
    },
    {
      text: "procedural",
      isCorrect: false,
    },
    {
      text: "None of these",
      isCorrect: false,
    },
  ],
  [
    {
      text: "getElementById()",
      isCorrect: false,
    },
    {
      text: "getElementsByClass()",
      isCorrect: false,
    },
    {
      text: "Both A and B",
      isCorrect: true,
    },
    {
      text: "None of these",
      isCorrect: false,
    },
  ],
  [
    {
      text: "stringify()",
      isCorrect: true,
    },
    {
      text: "parse()",
      isCorrect: false,
    },
    {
      text: "convert()",
      isCorrect: false,
    },
    {
      text: "None of the above",
      isCorrect: false,
    },
  ],
  [
    {
      text: "clearInterval",
      isCorrect: true,
    },
    {
      text: "clearTimer",
      isCorrect: false,
    },
    {
      text: "intervalOver",
      isCorrect: false,
    },
    {
      text: "None of the above",
      isCorrect: false,
    },
  ],
  [
    {
      text: "/* */",
      isCorrect: false,
    },
    {
      text: "//",
      isCorrect: true,
    },
    {
      text: "#",
      isCorrect: false,
    },
    {
      text: "$ $",
      isCorrect: false,
    },
  ],
  [
    {
      text: "Base Object",
      isCorrect: true,
    },
    {
      text: "All objects have a prototype",
      isCorrect: false,
    },
    {
      text: "None of the objects have a prototype",
      isCorrect: false,
    },
    {
      text: "None of the Above",
      isCorrect: false,
    },
  ],
  [
    {
      text: "Date",
      isCorrect: false,
    },
    {
      text: "FileUpload",
      isCorrect: false,
    },
    {
      text: "Function",
      isCorrect: false,
    },
    {
      text: "All of the above",
      isCorrect: true,
    },
  ],
];

startButtonEl.addEventListener("click", function () {
  function setTime() {
    if (!isTimerRunning) {
      startTimer();
      timerInterval = setInterval(function () {
        updateTimeRemaining(secondsLeft - 1);
        if (secondsLeft === 0) {
          stopTimer();
        }
      }, 1000);
    }
  }
  setTime();
  startButtonEl.classList.add("hide");

  nextQuestion();
});

function nextQuestion() {
  let randomQuestion = Math.floor(Math.random() * questions.length);
  var question = questions[randomQuestion];

  quizQuestionsEl.textContent = question;

  createAnswerEl(randomQuestion);
}

function createAnswerEl(randomQuestionIndex) {
  answerEl.textContent = "";
  for (let i = 0; i < answers[randomQuestionIndex].length; i++) {
    let divEl = document.createElement("div");
    let btnEl = document.createElement("button");
    btnEl.textContent = answers[randomQuestionIndex][i].text;
    btnEl.addEventListener("click", function () {
      if (answers[randomQuestionIndex][i].isCorrect) {
        console.log("correct");

        validationEl.textContent = "Correct";
        pointsGained = pointsGained + 5;

        nextQuestion();
      } else {
        validationEl.textContent = "Wrong";
        nextQuestion();

        if (secondsLeft <= 5) {
          stopTimer();
        } else {
          updateTimeRemaining(secondsLeft - 5);
        }
      }
      //clear "correct|wrong "
      setTimeout(function () {
        validationEl.textContent = "";
      }, 1000);

      // game over stops questions and post score and ask for initials
    });

    // answers[randomQuestionIndex][i].isCorrect
    divEl.appendChild(btnEl);
    answerEl.appendChild(divEl);
  }

}

function updateTimeRemaining(_secondsLeft) {
  secondsLeft = _secondsLeft;
  timerEl.textContent = _secondsLeft;
}

function startTimer() {
  isTimerRunning = true;
  updateTimeRemaining(30);
}

function stopTimer() {
  isTimerRunning = false;
  clearInterval(timerInterval);
  updateTimeRemaining(0);
  answerEl.textContent = "High Scores";
  quizQuestionsEl.textContent = "Game Over";
  validationEl.textContent = "";


  setTimeout(function () {
    var initials = prompt(
      `Your score was ${pointsGained}. Enter you initials to save your score`
    );
    let entry = {
      name: initials,
      score: pointsGained,
    };
    leaderboard.push(entry);
    saveLeaderboard()
    console.log(leaderboard);
    showLeaderBoard();
    
  }, 30); 
  
} 
function showLeaderBoard() {
  let leaderOlEl = document.createElement("ol");
  for (let i = 0; i < leaderboard.length; i++) {
    let leaderLiEl = document.createElement("li");
    leaderLiEl.textContent = leaderboard[i].name + leaderboard[i].score;
    leaderOlEl.appendChild(leaderLiEl);
    
  }
  listHighScoreEl.appendChild(leaderOlEl);
} 

function saveLeaderboard() {
  localStorage.setItem("5_leaderboard", JSON.stringify(leaderboard));
}

function getLeaderboard() {
  let fromLocalStorage = localStorage.getItem("5_leaderboard")
  if (fromLocalStorage === null) {
    leaderboard = [];
  } else {
    leaderboard = JSON.parse(fromLocalStorage);
  }
} 
getLeaderboard();