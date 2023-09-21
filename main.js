console.log("connected");

//Get elements
const gameCells = document.querySelectorAll(".gameboard ul li");
const playerSymbol1 = document.querySelector(".player1 p span");
const playerSymbol2 = document.querySelector(".player2 p span");
const displayMessage = document.getElementById("message");

const restartBtn = document.querySelector(".restartBtn");

// declare variables
let player1 = "X";
let player2 = "O";
let curretPlayer = player1;

playerSymbol1.innerText = player1;
playerSymbol2.innerText = player2;

// Function to start game
const startGame = () => {
  gameCells.forEach((cell) => {
    cell.addEventListener("click", handleClick);
  });
};

// Handle click event
const handleClick = (e) => {
  if (e.target.innerText === "") {
    e.target.innerText = curretPlayer;
    if (checkWinner()) {
      curretPlayer === "X"
        ? showMsg("winner is player 1")
        : showMsg("winner is player 2");
      disableCell();
    } else if (checkTie()) {
      showMsg("It's a tie");
      disableCell();
    } else {
      curretPlayer === "X"
        ? showMsg("Its player 2 turn")
        : showMsg("Its player 1 turn");
      changePlayer();
    }
  } else {
    return;
  }
};

// Function to change player turn
const changePlayer = () => {
  //   if (curretPlayer === player1) {
  //     curretPlayer = player2;
  //   } else if ((curretPlayer = player2)) {
  //     curretPlayer = player1;
  //   }
  curretPlayer = curretPlayer === player1 ? player2 : player1;
};

//Function to check game winner
const checkWinner = () => {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningConditions.length; i++) {
    let [pos1, pos2, pos3] = winningConditions[i];

    if (
      gameCells[pos1].innerText !== "" &&
      gameCells[pos1].innerText === gameCells[pos2].innerText &&
      gameCells[pos2].innerText === gameCells[pos3].innerText
    ) {
      return true;
    }
  }
  return false;
};

//Function to check if game is tie
const checkTie = () => {
  let emptyCellCount = 0;
  gameCells.forEach((cell) => {
    if (cell.innerText === "") {
      emptyCellCount++;
    }
  });
  return emptyCellCount === 0 && !checkWinner();
};

//Function to show message
const showMsg = (msg) => {
  displayMessage.innerText = msg;
  setTimeout(() => (displayMessage.innerText = ""), 3000);
};

// Function to  disable gameboard cell if a game is win or tie
const disableCell = () => {
  gameCells.forEach((cell) => {
    cell.removeEventListener("click", handleClick);
    cell.classList.add("disableCell");
  });
};

// Function to restart game
const restartGame = () => {
  gameCells.forEach((cell) => {
    cell.innerText = "";
    cell.classList.remove("disableCell");
    startGame();
  });
};

// restartBtn.addEventListener("click", restartGame);
restartBtn.onclick = restartGame;

//Function to start game
startGame();
