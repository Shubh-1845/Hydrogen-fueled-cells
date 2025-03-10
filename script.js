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

  const rollSound = new Audio('dice-roll.mp3'); // Make sure this file exists
  rollSound.play();

  setTimeout(() => {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    const currentPlayer = isHydrogenTurn ? "hydrogen" : "fossil";
    
    // Determine player movement and scenario effects
    const adjustedRoll = currentPlayer === "hydrogen" && Math.random() < 0.4 ? diceRoll + 1 : diceRoll;
    const scenario = getScenario(currentPlayer);
    
    if (isHydrogenTurn) {
      hydrogenPosition = Math.min(hydrogenPosition + adjustedRoll + scenario.effect, totalSquares - 1);
    } else {
      fossilPosition = Math.min(fossilPosition + adjustedRoll + scenario.effect, totalSquares - 1);
    }

    diceAnimation.textContent = adjustedRoll;
    document.getElementById("scenario").textContent = `${currentPlayer === "hydrogen" ? "Hydrogen" : "Fossil Fuels"} rolled a ${adjustedRoll}. ${scenario.text}`;

    // Play sound for backward movement
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

// Random scenarios
function getScenario(player) {
  const scenarios = {
    hydrogen: [
      { text: "Breakthrough in hydrogen storage! Move 2 steps forward.", effect: 2 },
      { text: "Public adoption of hydrogen slows. Move 1 step back.", effect: -1 },
      { text: "Hydrogen vehicles gain popularity! Move 3 steps forward.", effect: 3 },
      { text: "Storage system leak. Move 2 steps back.", effect: -2 }
    ],
    fossil: [
      { text: "Oil prices skyrocket! Move 1 step forward.", effect: 1 },
      { text: "Environmental protests. Move 2 steps back.", effect: -2 },
      { text: "Increased demand for fossil fuels. Move 2 steps forward.", effect: 2 },
      { text: "Oil spill disaster. Move 3 steps back.", effect: -3 }
    ]
  };

  const options = scenarios[player];
  return options[Math.floor(Math.random() * options.length)];
}

// Check for winner
function checkWinner() {
  if (hydrogenPosition === totalSquares - 1) {
    displayWinner("Hydrogen Wins! Clean energy triumphs!");
  } else if (fossilPosition === totalSquares - 1) {
    displayWinner("Fossil Fuels Win! But at what cost?");
  }
}

// Display winner
function displayWinner(message) {
  document.getElementById("winner-banner").textContent = message;
  document.getElementById("winner-banner").style.display = "block";
  document.getElementById("actions").style.display = "none";
  document.getElementById("restart-area").style.display = "block";
}

// Restart game
function restartGame() {
  hydrogenPosition = 0;
  fossilPosition = 0;
  isHydrogenTurn = true;
  updateTracks();
  document.getElementById("winner-banner").style.display = "none";
  document.getElementById("actions").style.display = "block";
  document.getElementById("restart-area").style.display = "none";
}

// Particle.js Setup for interactive background
particlesJS('particles-js', {
  particles: {
    number: {
      value: 100,
      density: { enable: true, value_area: 800 }
    },
    shape: {
      type: 'circle',
      stroke: { width: 0, color: '#ffffff' }
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: { enable: true, speed: 0.5, opacity_min: 0.1 }
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: true, speed: 4, size_min: 0.1 }
    },
    move: {
      enable: true,
      speed: 3,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false
    }
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: 'repulse' }
    }
  }
});
