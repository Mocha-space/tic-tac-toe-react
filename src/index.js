
const cells = document.querySelector(".cell");
const statusText = document.querySelector("#statusText");
const restart = document.querySelector("#restartBtn");

const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

let option = ["", "", "", "", "", "", "", "", ""]

let currentPlayer = "x";
let running = false;

initializedGame();

function initializedGame(){
  cells.forEach( cell => cell.addEventListener('click', cellClicked))
  restart.addEventListener('click', restartGame );
  statusText.textContent = `${currentPlayer}'s turn`
  running = true;
}

function cellClicked(){
 const cellIndex = this.getAttribute('cellIndex');

  if (option[cellIndex] != "" || !gameRunning) {
    return;
  }

  updateCell(this, cellIndex);
  
  checkWinner();
}

function updateCell(cell, index){
  option[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer(){
  currentPlayer = (currentPlayer == 'x') ? "o" : 'x';
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
  let roundWon = false;

    for(let i = 0; i < winCondition.length; i++) {
      const condition = winCondition[i];
      const cellA = option[condition[0]];
      const cellB = option[condition[1]];
      const cellC = option[condition[2]];

        if (cellA == "" || cellB == "" || cellC =="") {
          continue;
        }
          if (cellA == cellB && cellB == cellC ) {
            roundWon = true;
            break;
          }
    }

    if (roundWon) {
      statusText.textContent = `${currentPlayer} wins!`;
      running = false;
    }
      else if (!option.includes("")) {
        statusText.textContent = ` Draw!`;
        running = false;
      }
        else{
          changePlayer();
        }
}

function restartGame(){
  currentPlayer = "x";
  option = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'z turn`;
  cells.forEach(cell => cell.textContent = "");
  running = true;
}

