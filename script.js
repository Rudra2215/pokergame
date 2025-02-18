let round = 0;
let playerScores = [0, 0, 0, 0, 0]; // Store total scores

// Get elements
const startGameButton = document.getElementById("startGame");
const nextRoundButton = document.getElementById("nextRound");
const gameArea = document.getElementById("gameArea");
const winnerDisplay = document.getElementById("winnerDisplay");

// Start the Game
startGameButton.addEventListener("click", function () {
    round = 0;
    playerScores = [0, 0, 0, 0, 0]; // Reset scores
    winnerDisplay.textContent = "";
    nextRoundButton.style.display = "inline-block";
    playRound();
});

// Play a Round
nextRoundButton.addEventListener("click", function () {
    if (round < 3) {
        playRound();
    }
});

// Function to Play a Round
function playRound() {
    if (round >= 3) return;

    round++;
    gameArea.innerHTML = `<h2>Round ${round} 🃏</h2>`;
    winnerDisplay.textContent = "";

    let highestRoundScore = 0;
    let roundWinner = "";

    for (let i = 0; i < 5; i++) {
        const playerDiv = document.createElement("div");
        playerDiv.classList.add("player");

        // Player Name
        const playerName = document.createElement("h2");
        playerName.textContent = `Player ${i + 1}:`;
        playerDiv.appendChild(playerName);

        let roundSum = 0;

        // Generate 5 random cards (1-13)
        for (let j = 0; j < 5; j++) {
            const card = document.createElement("div");
            card.classList.add("card");
            let cardValue = Math.floor(Math.random() * 13) + 1;
            card.textContent = cardValue;
            roundSum += cardValue;
            playerDiv.appendChild(card);
        }

        // Update total score
        playerScores[i] += roundSum;

        // Show Sum
        const sumDisplay = document.createElement("span");
        sumDisplay.classList.add("sum");
        sumDisplay.textContent = ` (Round: ${roundSum}, Total: ${playerScores[i]})`;
        playerDiv.appendChild(sumDisplay);

        // Determine Round Winner
        if (roundSum > highestRoundScore) {
            highestRoundScore = roundSum;
            roundWinner = `🏆 Player ${i + 1} wins this round with ${roundSum} points!!!`;
        }

        gameArea.appendChild(playerDiv);
    }

    // Display round winner
    winnerDisplay.textContent = roundWinner;

    // Final Winner after 3 Rounds
    if (round === 3) {
        declareFinalWinner();
    }
}

// Function to Declare the Final Winner
function declareFinalWinner() {
    let maxScore = Math.max(...playerScores);
    let finalWinner = "";

    for (let i = 0; i < 5; i++) {
        if (playerScores[i] === maxScore) {
            finalWinner = `🏆 Player ${i + 1} is the FINAL WINNER with ${maxScore} points! 🎉`;
        }
    }

    winnerDisplay.textContent = finalWinner;
    nextRoundButton.style.display = "none"; // Hide "Next Round" button
}
