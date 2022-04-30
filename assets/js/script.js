var startButtonEl = document.querySelector(".start-button");
var timerEl = document.querySelector(".timer-count");
var highScoreEl = document.querySelector(".high-score");
var quizQuestionsEl = document.querySelector(".quiz-questions");
var answerEl = document.querySelector(".game-answer");
var secondsLeft = 30;
var isTimerRunning = false;
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
    }
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
    }
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
    }
  ],
];


// when pressing start button timer will set to 30 seconds and start countdown
startButtonEl.addEventListener("click", function() {
  function setTime() {
    if (!isTimerRunning) {
      isTimerRunning = true;
      secondsLeft = 30;
      timerEl.textContent = secondsLeft;
      timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = secondsLeft;

        if (secondsLeft === 0) {
          clearInterval(timerInterval);
          isTimerRunning = false;
        }
      }, 1000);
    }
  }
  setTime();
  startButtonEl.classList.add("hide");
  
  //todo on pressing start code quiz will change to random question 1
  let randomQuestion = Math.floor(Math.random() * questions.length)
  var question = questions[randomQuestion];


  quizQuestionsEl.textContent = question;

  //todo on pressing start p tag will change to the 4 answers for question 1

  createAnswerEl(randomQuestion);
  //todo on pressing start start button will go away
});

function createAnswerEl(randomQuestionIndex) {
  answerEl.textContent = "";
  for (let i = 0; i < answers[randomQuestionIndex].length; i++) {
    let divEl = document.createElement("div");
    let btnEl = document.createElement("button");
    btnEl.textContent = answers[randomQuestionIndex][i].text;
    btnEl.addEventListener("click", function() {
      if (answers[randomQuestionIndex][i].isCorrect) {
          alert("correct")
          //add "correct" to where start button was.
          // add points in background
          // load new question

      } else {
        //todo incorrect answer selection
        // subtract time 
      }
      //clear "correct|wrong "

    });

    // answers[randomQuestionIndex][i].isCorrect
    divEl.appendChild(btnEl);
    answerEl.appendChild(divEl);
  }

  // li.appendChild(document.createTextNode("answers"));
}
