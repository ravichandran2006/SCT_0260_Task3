const board = document.getElementById("board");
const winningMessage = document.getElementById("winningMessage");
const winningMessageText = document.getElementById("winningMessageText");
const restartButton = document.getElementById("restartButton");
const playerModeButton = document.getElementById("playerMode");
const computerModeButton = document.getElementById("computerMode");

let isComputer = false;
let currentPlayer = "X";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let gameState = ["", "", "", "", "", "", "", "", ""];

playerModeButton.addEventListener("click", () => startGame(false));
computerModeButton.addEventListener("click", () => startGame(true));
restartButton.addEventListener("click", () => startGame(isComputer));

function startGame(vsComputer) {
  isComputer = vsComputer;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  board.innerHTML = "";
  board.style.display = "grid";
  winningMessage.classList.remove("show");

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(cell, i), { once: true });
    board.appendChild(cell);
  }
}

function handleClick(cell, index) {
  if (gameState[index] !== "") return;
  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    endGame(false);
    return;
  } else if (isDraw()) {
    endGame(true);
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (isComputer && currentPlayer === "O") {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  const availableSpots = gameState
    .map((val, index) => (val === "" ? index : null))
    .filter(val => val !== null);

  const randomIndex = availableSpots[Math.floor(Math.random() * availableSpots.length)];
  const cell = board.children[randomIndex];
  handleClick(cell, randomIndex);
}

function checkWin(player) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => gameState[index] === player);
  });
}

function isDraw() {
  return gameState.every(cell => cell !== "");
}

function endGame(draw) {
  if (draw) {
    winningMessageText.textContent = "It's a Draw!";
  } else {
    winningMessageText.textContent = `${currentPlayer} Wins!`;
  }
  winningMessage.classList.add("show");
}
