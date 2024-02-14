// add audio
// set a sound for roll and select
const start = document.createElement("audio");
start.src = "start.mp3";
const win = document.createElement("audio");
win.src = "win.mp3";
const over = document.createElement("audio");
over.src = "over.mp3";

/*declare elements */
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

/*wining conditions*/
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/*Array of placeholders/empty strings*/
let options = ["", "", "", "", "", "", "", "", ""];

/*keeping check of currentPlayer*/
let currentPLayer = "X";
let running = false;

/*Initialize game*/
initializeGame(restartGame());

/*game initialization */
function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked)),
    restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPLayer}'s turn`;
  running = true;
}

/*function cellClicked */
function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");
  /*update if there's nothing*/
  if (options[cellIndex] != "" || !running) {
    return;
  }

  updateCell(this, cellIndex);

  checkWinner();
}

/*updateCell */
function updateCell(cell, index) {
  options[index] = currentPLayer;
  cell.textContent = currentPLayer;
}

/*changePlayer*/
function changePlayer() {
  currentPLayer = currentPLayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPLayer}'s turn`;
}

/*checkWinner*/
function checkWinner() {
  /*set roundWon to false and flip if someone wins*/
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    /*check winner spaces*/
    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }
  /*update statusTest.textContent*/
  if (roundWon) {
    statusText.textContent = `${currentPLayer} wins!`;
    document.body.style.backgroundColor = "green";
    win.play();
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw!`;
    over.play(); /*play sound draw*/
    document.body.style.backgroundColor = "red";
    running = false;
  } else {
    changePlayer();
  }
}

/*Restart game */
function restartGame() {
  start.play();
  currentPLayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPLayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  document.body.style.backgroundColor = "white";
  running = true;
}
