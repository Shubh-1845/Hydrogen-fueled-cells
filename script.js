/* script.js */
let hydrogenPosition = 0;
let fossilPosition = 0;
let isHydrogenTurn = true;

const totalSquares = 20;

// Initialize race tracks
function createTracks() {
  const hydrogenTrack = document.getElementById("hydrogen-track");
  const fossilTrack = document.getElementById("fossil-track");

  // Create 20 squares for each track
  for (let i = 0; i < totalSquares; i++) {
    const hydrogenSquare = document.createElement("div");
    hydrogenSquare.textContent = ""; // Leave content empty initially
    hydrogenTrack.appendChild(hydrogenSquare);

    const fossilSquare = document.createElement("div");
    fossilSquare.textContent = ""; // Leave content empty initially
    fossilTrack.appendChild(fossilSquare);
  }

  updateTracks(); // Render initial track layout
}

// Update the race tracks
function updateTracks() {
  const hydrogenTrack = document.getElementById("hydrogen-track").children;
  const fossilTrack = document.getElementById("fossil-track").children;

  // Clear the tracks
  Array.from(hydrogenTrack).forEach((square) => (square.textContent = ""));
  Array.from(fossilTrack).forEach((square) => (square.textContent = ""));

  // Place the pieces at their respective positions
  if (hydrogenPosition < totalSquares) {
    hydrogenTrack[hydrogenPosition].textContent = "🚗"; // Hydrogen piece
  }
  if (fossilPosition < totalSquares) {
    fossilTrack[fossilPosition].textContent = "🛢️"; // Fossil fuel piece
  }
}

// Roll the dice and update positions
function rollDice() {
  const diceAnimation = document.getElementById("dice-animation");
  diceAnimation.textContent = "🎲";
  diceAnimation.style.animation = "roll 1s linear";

  setTimeout(() => {
    // Generate a random dice roll between 1 and 6
    const diceRoll = Math.floor(Math.random() * 6) + 1;

    // Determine which player is rolling
    const currentPlayer = isHydrogenTurn ? "hydrogen" : "fossil";

    // Update the player's position based on dice roll
    if (isHydrogenTurn) {
      hydrogenPosition = Math.min(hydrogenPosition + diceRoll, totalSquares - 1); // Prevent going out of bounds
    } else {
      fossilPosition = Math.min(fossilPosition + diceRoll, totalSquares - 1); // Prevent going out of bounds
    }

    // Update dice and tracks
    diceAnimation.textContent = diceRoll; // Show the roll result
    updateTracks(); // Reflect position changes on the tracks

    // Check for a winner
    checkWinner();

    // Switch turn to the other player
    isHydrogenTurn = !isHydrogenTurn;
    updateTurnIndicator();
  }, 1000); // Simulate rolling time
}

// Update turn indicator
function updateTurnIndicator() {
  const turnIndicator = document.getElementById("turn-indicator");
  turnIndicator.textContent = isHydrogenTurn ? "Hydrogen's Turn" : "Fossil's Turn";
}

// Check for a winner
function checkWinner() {
  if (hydrogenPosition === totalSquares - 1) {
    displayWinner("Hydrogen Wins! Clean energy prevails!");
  } else if (fossilPosition === totalSquares - 1) {
    displayWinner("Fossil Fuels Win! But at what cost?");
  }
}

// Display winner banner and reset controls
function displayWinner(message) {
  const winnerBanner = document.getElementById("winner-banner");
  const actionsArea = document.getElementById("actions");
  const restartArea = document.getElementById("restart-area");

  winnerBanner.textContent = message;
  winnerBanner.style.display = "block";
  actionsArea.style.display = "none"; // Hide game controls
  restartArea.style.display = "block"; // Show restart button
}

// Restart the game
function restartGame() {
  hydrogenPosition = 0;
  fossilPosition = 0;
  isHydrogenTurn = true;

  const winnerBanner = document.getElementById("winner-banner");
  const actionsArea = document.getElementById("actions");
  const restartArea = document.getElementById("restart-area");

  winnerBanner.style.display = "none"; // Hide winner announcement
  actionsArea.style.display = "block"; // Show game controls
  restartArea.style.display = "none"; // Hide restart button

  updateTracks(); // Reset tracks
  updateTurnIndicator(); // Reset turn indicator
}

// Initialize the game
document.addEventListener("DOMContentLoaded", createTracks);
