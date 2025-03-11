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

  updateTracks(); // Initial rendering of tracks
}

// Update the race tracks
function updateTracks() {
  const hydrogenTrack = document.getElementById("hydrogen-track").children;
  const fossilTrack = document.getElementById("fossil-track").children;

  // Clear the tracks
  Array.from(hydrogenTrack).forEach((square) => (square.textContent = ""));
  Array.from(fossilTrack).forEach((square) => (square.textContent = ""));

  // Set the positions of the pieces
  if (hydrogenPosition < totalSquares) {
    hydrogenTrack[hydrogenPosition].textContent = "🚗";
  }

  if (fossilPosition < totalSquares) {
    fossilTrack[fossilPosition].textContent = "🛢️";
  }
}

// Roll dice and move players
function rollDice() {
  const diceAnimation = document.getElementById("dice-animation");
  diceAnimation.textContent = "🎲";
  diceAnimation.style.animation = "roll 1s linear";

  setTimeout(() => {
    const diceRoll = Math.floor(Math.random() * 6) + 1; // Roll between 1 and 6
    const currentPlayer = isHydrogenTurn ? "hydrogen" : "fossil";
    const newPosition = isHydrogenTurn ? hydrogenPosition : fossilPosition;

    // Update player position
    if (isHydrogenTurn) {
      hydrogenPosition = Math.min(newPosition + diceRoll, totalSquares - 1); // Prevent going beyond the last square
    } else {
      fossilPosition = Math.min(newPosition + diceRoll, totalSquares - 1); // Prevent going beyond the last square
    }

    // Update dice and tracks
    diceAnimation.textContent = diceRoll;
    updateTracks();

    // Check for a winner
    checkWinner();

    // Switch turn
    isHydrogenTurn = !isHydrogenTurn;
    updateTurnIndicator();
  }, 1000);
}

// Update turn indicator
function updateTurnIndicator() {
  const turnIndicator = document.getElementById("turn-indicator");
  turnIndicator.textContent = isHydrogenTurn ? "Hydrogen's Turn" : "Fossil's Turn";
}

// Check for winner
function checkWinner() {
  if (hydrogenPosition === totalSquares - 1) {
    alert("Hydrogen Wins! Clean energy prevails!");
    resetGame();
  } else if (fossilPosition === totalSquares - 1) {
    alert("Fossil Fuels Win! But at what cost?");
    resetGame();
  }
}

// Reset game
function resetGame() {
  hydrogenPosition = 0;
  fossilPosition = 0;
  isHydrogenTurn = true;
  updateTracks();
  updateTurnIndicator();
}

// Initialize game on page load
document.addEventListener("DOMContentLoaded", createTracks);
