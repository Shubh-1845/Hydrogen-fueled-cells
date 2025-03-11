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
    const fossilSquare = document.createElement("div");
    hydrogenTrack.appendChild(hydrogenSquare);
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

// Roll dice with animation and sound
function rollDice() {
  const diceAnimation = document.getElementById("dice-animation");
  diceAnimation.textContent = "🎲";
  diceAnimation.style.animation = "roll 1s linear";

  const rollSound = new Audio('dice-roll.mp3');
  rollSound.play();

  setTimeout(() => {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    const currentPlayer = isHydrogenTurn ? "hydrogen" : "fossil";
    const adjustedRoll = currentPlayer === "hydrogen" && Math.random() < 0.4 ? diceRoll + 1 : diceRoll;
    const scenario = getScenario(currentPlayer);
    
    if (isHydrogenTurn) {
      hydrogenPosition = Math.min(hydrogenPosition + adjustedRoll + scenario.effect, totalSquares - 1);
    } else {
      fossilPosition = Math.min(fossilPosition + adjustedRoll + scenario.effect, totalSquares - 1);
    }

    diceAnimation.textContent = adjustedRoll;
    document.getElementById("scenario").textContent = `${currentPlayer === "hydrogen" ? "Hydrogen" : "Fossil Fuels"} rolled a ${adjustedRoll}. ${scenario.text}`;

    if (scenario.effect < 0) {
      const backwardSound = new Audio('backward-sound.mp3');
      backwardSound.play();
    }

    checkWinner();
    isHydrogenTurn = !isHydrogenTurn;
    updateTracks();
    updateTurnIndicator();
  }, 1000);
}

// Scenarios
function getScenario(player) {
  const scenarios = {
    hydrogen: [
      { text: "Breakthrough in hydrogen storage! Move 2 steps forward.", effect: 2 },
      { text: "Public adoption of hydrogen slows. Move 1 step back.", effect: -1 }
    ],
    fossil: [
      { text: "Oil prices skyrocket! Move 1 step forward.", effect: 1 },
      { text: "Oil spill disaster. Move 3 steps back.", effect: -3 }
    ]
  };
  return scenarios[player][Math.floor(Math.random() * scenarios[player].length)];
}

document.addEventListener("DOMContentLoaded", createTracks);
