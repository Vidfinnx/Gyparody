// Globals
var answerText = "";
var time = 6 * questions.length;
var timeLimit;
var navBar = document.querySelector("#nav");
var questionDiv = document.querySelector("#questionBlock");
var alertBoxDiv = document.querySelector("#alertBox");
var answerDiv = document.querySelector("#answerResult");
var endGameDiv = document.querySelector("#endGameBlock");
var optionButtons = [document.querySelector("#quizOption1"), document.querySelector("#quizOption2"),
document.querySelector("#quizOption3"), document.querySelector("#quizOption4")]
var playerInitials = document.querySelector("#playerInitials");
var questionNum = 0;
var scoresArray;
playerInitials.value = '';

// Import Local array, if it doesnt exist then start one
if (localStorage.getItem("localHighScores")) {
    scoresArray = JSON.parse(localStorage.getItem("localHighScores"));
} else {
    scoresArray = [];
}

// Hide Title screen then start quiz
function startQuiz() {
    event.stopPropagation();

// Slide Title Out and Display Begin Text
    document.querySelector("#titleScreen").style = "animation-play-state: running;"
    document.querySelector(".navbar-text").textContent = "BEGIN";

    // Replace placeholder with the first question
    changeQuestion();

    // Wait for the title animation to finish, then show the question
    setTimeout(function () {
        document.querySelector("#titleScreen").style = "display: none;";
        document.querySelector("#questionBlock").style = "display: block;";
        document.querySelector("#questionBlock").className = "slideUp";
    }, 400);


// Timer Control
    timeLimit = setInterval(function () {
        time--;
        document.querySelector(".navbar-text").textContent = "Money:$ " + time;
        if (time <= 0) {
            clearInterval(timeLimit);
            showEndGame();
        }
    }, 1000);
}

// changeQuestion
function changeQuestion() {
    var questionInfo = questions[questionNum];

    // No questions ends the quiz function
    if (questionInfo == undefined) {
        clearInterval(timeLimit);
        showEndGame();
        return;
    }

    // If more questions, writes information in
    setTimeout(function () {
        for (var i = 0; i < optionButtons.length; i++) {
            optionButtons[i].textContent = i + 1 + '. ' + questionInfo.choices[i];
            optionButtons[i].value = questionInfo.choices[i];
        }
        document.querySelector("#questionPrompt").textContent = questionInfo.title;
        // show next question animation
        questionDiv.className = "questionFadeIn";
    }, 400);

}

// Checks the user input and compares it with the answer on file.
function checkAnswer() {
    if (event.target.nodeName == "BUTTON") {
        var playerAnswer = event.target.value;
        if (playerAnswer) {
            if (playerAnswer === questions[questionNum].answer) {
                answerText = "Correct";
                // If there is not enough time left over
            } else {
                answerText = "-15$";
                time -= 15;
                if (time <= 0) {
                    time = time;
                }
            }

            // This block shows the result of the answer, then hides it after a given time.
            answerDiv.innerHTML = `<hr /> ${answerText}`
            if (answerDiv.style != "display: block;") {
                answerDiv.style = "display: block;";
            }
            answerDiv.className = "answerSlideUp";
            setTimeout(function () {
                answerDiv.className = "fadeAway";
                setTimeout(function () {
                    answerDiv.style = "display: none;";
                }, 300);
            }, 700);

            // Slide away the current question to prepare the next
            questionDiv.className = "questionFadeOut";
        }
        // questionNum is iterated and the next question is called
        questionNum++;
        changeQuestion();
    }
}

function showEndGame() {
    // Rewrites remaining time if the final question was wrong
    document.querySelector(".navbar-text").textContent = "Earnings: " + time;
    // Hides Nav Bar with Money Timer
    document.querySelector("nav").style.display = "none";

    // Writes the final score to showScore
    if (time <= 0) {
        document.querySelector("#showScore").textContent = "$" + time;
    } else {
        document.querySelector("#showScore").textContent = "$" + time;
       }
       

    // Animation handlers
    if (questionDiv.className != "questionFadeOut") {
        questionDiv.className = "questionFadeOut";
    }
    setTimeout(function () {
        questionDiv.style = "display: none;";
        answerDiv.style = "display: none;";
        endGameDiv.style = "display: block;";
        endGameDiv.className = "slideDown";
    }, 700)
}

function submitAndSaveScore(event) {
    event.preventDefault();
    if (playerInitials.value.trim() == '') {
        if (alertBoxDiv.style != "display:block;") {
            alertBoxDiv.style = "display:block;";

            setTimeout(function () {
                alertBoxDiv.style = "display: none;";
            }, 1000);
        }
        return;
    } else {
        var newHighScore = {
            initials: playerInitials.value.toUpperCase().trim(),
            score: time
        };
        scoresArray.push(newHighScore);
        scoresArray.sort(function (a, b) { return b.score - a.score });
        localStorage.setItem("localHighScores", JSON.stringify(scoresArray));
        window.location.href = "./scores.html"
    }
}

// Listeners
document.querySelector("#quizStart").onclick = startQuiz;
document.addEventListener("click", checkAnswer);
document.querySelector("#submitButton").onclick = submitAndSaveScore;

