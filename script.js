/* script.js */
let hydrogenPosition = 0;
let fossilPosition = 0;
let isHydrogenTurn = true;

const totalSquares = 20;

// Initialize race tracks
function createTracks() {
  const hydrogenTrack = document.getElementById("hydrogen-track");
  const fossilTrack = document.getElementById("fossil-track");

  for (let i = 0; i < totalSquares; i++) {
    const hydrogenSquare = document.createElement("div");
    hydrogenSquare.textContent = ""; // Empty content for better visibility
    hydrogenTrack.appendChild(hydrogenSquare);

    const fossilSquare = document.createElement("div");
    fossilSquare.textContent = ""; // Empty content for better visibility
    fossilTrack.appendChild(fossilSquare);
  }

  updateTracks();
}

// Update the race tracks
function updateTracks() {
  const hydrogenTrack = document.getElementById("hydrogen-track").children;
  const fossilTrack = document.getElementById("fossil-track").children;

  Array.from(hydrogenTrack).forEach((square) => (square.textContent = ""));
  Array.from(fossilTrack).forEach((square) => (square.textContent = ""));

  hydrogenTrack[hydrogenPosition].textContent = "🚗";
  fossilTrack[fossilPosition].textContent = "🛢️";
}

// Roll dice and move players
function rollDice() {
  const diceAnimation = document.getElementById("dice-animation");
  diceAnimation.textContent = "🎲";
  diceAnimation.style.animation = "roll 1s linear";

  setTimeout(() => {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    const currentPlayer = isHydrogenTurn ? "hydrogen" : "fossil";
    const adjustedRoll = currentPlayer === "hydrogen" ? diceRoll + 1 : diceRoll; // Slight boost for hydrogen
    const newPosition = isHydrogenTurn ? hydrogenPosition : fossilPosition;

    // Update positions
    if (isHydrogenTurn) {
      hydrogenPosition = Math.min(newPosition + adjustedRoll, totalSquares - 1);
    } else {
      fossilPosition = Math.min(newPosition + adjustedRoll, totalSquares - 1);
    }

    diceAnimation.textContent = diceRoll;
    updateTracks();
    checkWinner();

    isHydrogenTurn = !isHydrogenTurn; // Switch turn
  }, 1000);
}

// Check for winner
function checkWinner() {
  if (hydrogenPosition === totalSquares - 1) {
    alert("Hydrogen Wins! Clean energy prevails!");
  } else if (fossilPosition === totalSquares - 1) {
    alert("Fossil Fuels Win! But at what cost?");
  }
}

// Initialize game on page load
document.addEventListener("DOMContentLoaded", createTracks);
