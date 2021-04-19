 var scoresArray = JSON.parse(localStorage.getItem("localHighScores"));
        
//  Generates Scoreboard Array with Numerics and Applies css styling to array
        function printAndShowLeaderboard() {
            var scoresList = document.querySelector("#scoresList");
            var html = "";
            for (var i = 0; i < scoresArray.length; i++) {
                    html += `<h3 class="scoreStyle">${i + 1}. ${scoresArray[i].initials} -$ ${scoresArray[i].score}</h3>`
                    scoresList.innerHTML = html;
                   }}
                 
         
//Listener for clearscores
        printAndShowLeaderboard();
        document.querySelector("#clearScores").onclick = clearSavedScores;         


// Clears Leaderboard
        function clearSavedScores() {
            localStorage.clear();
            scoresList.innerHTML = "";
        }
