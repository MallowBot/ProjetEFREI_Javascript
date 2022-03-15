const tour = document.querySelector("h3");
// Messages


// Valeurs:
let gameActive = true;
let playerActiv = "Rouge";
let playerTurn = true;
let playerPion;
let scoreRed = 12;
let scoreBlack = 12;
let numberPionRed = document.querySelectorAll("p");
let numberPionBlack = document.querySelectorAll("p1")
const allCases = document.querySelectorAll(".case-w")
// allCases.forEach(cell => cell.addEventListener("click",clicCellW))
// numberPionRed.forEach(pionR => pionR.addEventListener("click",clicCellR))
// numberPionBlack.forEach(pionB => pionB.addEventListener("click",clicCellB))

let getPionId = function (pionId){
  let parse = parseInt(pionId);
  return playTable.indexOf(parse);
}

let toggledPion = {
  pionId : -1, 
  toggledPionTableId:-1,
  king: false,
  seventhSpace: false,
  ninthSpace: false,
  fourteenthSpace: false,
  eighteenthSpace: false,
  minusSeventhSpace: false,
  minusNinthSpace: false,
  minusFourteenthSpace: false,
  minusEighteenthSpace: false
}

// 0:vide /1:Pion red  /2:Pion black /3:king red /4:king black
let vide = 0;
let pionBlack = 1;
let pionRed = 2;
let kingRed = 3;
let kingBlack = 4;

let playTable = [
  0,null,1,null,2,null,3,null,
  null,4,null,5,null,6,null,7,
  8,null,9,null,10,null,11,null,
  null,null,null,null,null,null,null,null,
  null,null,null,null,null,null,null,null,
  null,12,null,13,null,14,null,15,
  16,null,17,null,18,null,19,null,
  null,20,null,21,null,22,null,23,
]


const gagne = () => `Le joueur ${playerActiv} a gagné`
const tourPlayer = () => `C'est au tour du joueur ${playerActiv}`
tour.innerHTML = tourPlayer()


// let indexCellR = 0
// function clicCellR() {
//   indexCellR = parseInt(this.dataset.index)
//   console.log(indexCellR)
//   return indexCellR;
// }

// let indexCellB = 0
// function clicCellB() {
//   indexCellB = parseInt(this.dataset.index)
//   console.log(indexCellB)
//   return indexCellB;
// }
   
// function clicCellW() {
//   let indexCellW = parseInt(this.id)
//   console.log(indexCellW)
//   if (playerTurn) {
//     document.getElementById(`${indexCellW}`).innerHTML = `<p class="Redpion" data-index=${indexCellR}><img src="./assets/Pion_Red.png" height="55" width="55">`
//     //document.getElementById(`${indexCellW}`).innerHTML =``
//   }
//   else {
//     document.getElementById(`${indexCellW}`).innerHTML = `<p class="Redpion" data-index=${indexCellB}><img src="./assets/Pion_Red.png" height="55" width="55">`
//   }
  
// }


function pionEventListener() { 
  if (playerTurn) {
    for (let i = 0; i < numberPionRed.length; i++) {
        numberPionRed[i].addEventListener("click", togglePlayerPieces);
    }
} else {
    for (let i = 0; i < numberPionBlack.length; i++) {
        numberPionBlack[i].addEventListener("click", togglePlayerPieces);
    }
}
}

function togglePlayerPieces() {
  if (playerTurn) {
      playerPion = numberPionRed;
  } else {
      playerPion = numberPionBlack;
  }
  removeAttribute1();
  removeAttribute2();
  resetBorders();
}

//nombre de pieces restante pour chaque joueur
function numberPlayerPion() {
  if (playerTurn) {
    playerPion = numberPionRed;
  }
  else {
    playerPion = numberPionBlack
  }
}

function removeAttribute1() {
  for (let i = 0; i < numberPionRed.length; i++) {
      numberPionRed[i].removeAttribute("onclick");
  }
}
function removeAttribute2() {
  for (let i = 0; i < numberPionBlack.length; i++) {
      numberPionBlack[i].removeAttribute("onclick");
  }
}


function resetBorders() {
  for (let i = 0; i < playerPion.length; i++) {
      playerPion[i].style.border = "1px solid white";
  }
  resetToggledProperties();
  getToggledPion();
}

function resetToggledProperties() {
  toggledPion.pieceId = -1;
  toggledPion.pieceId = -1;
  toggledPion.isKing = false;
  toggledPion.seventhSpace = false;
  toggledPion.ninthSpace = false;
  toggledPion.fourteenthSpace = false;
  toggledPion.eighteenthSpace = false;
  toggledPion.minusSeventhSpace = false;
  toggledPion.minusNinthSpace = false;
  toggledPion.minusFourteenthSpace = false;
  toggledPion.minusEighteenthSpace = false;
}

function getToggledPion() {
  toggledPion.pieceId = parseInt(event.target.id);
  toggledPion.toggledPionTableId = getPionId(toggledPion.pieceId);
  isPieceKing();
}

function isPieceKing() {
  if (document.getElementById(toggledPion.pieceId).classList.contains("king")) {
      toggledPion.isKing = true;
  } else {
      toggledPion.isKing = false;
  }
  getMove();
}

function getMove() {
  if (board[toggledPion.toggledPionTableId + 7] === null &&
      allCases[toggledPion.toggledPionTableId + 7].classList.contains("noPieceHere") !== true) {
      toggledPion.seventhSpace = true;
  }
  if (board[toggledPion.toggledPionTableId + 9] === null &&
      allCases[toggledPion.toggledPionTableId + 9].classList.contains("noPieceHere") !== true) {
      toggledPion.ninthSpace = true;
  }
  if (board[toggledPion.toggledPionTableId - 7] === null &&
      allCases[toggledPion.toggledPionTableId - 7].classList.contains("noPieceHere") !== true) {
      toggledPion.minusSeventhSpace = true;
  }
  if (board[toggledPion.toggledPionTableId - 9] === null &&
      allCases[toggledPion.toggledPionTableId - 9].classList.contains("noPieceHere") !== true) {
      toggledPion.minusNinthSpace = true;
  }
  checkJumpMove();
}

function checkJumpMove() {
  if (playerTurn) {
      if (board[toggledPion.toggledPionTableId + 14] === null
      && allCases[toggledPion.toggledPionTableId + 14].classList.contains("noPieceHere") !== true
      && board[toggledPion.toggledPionTableId + 7] >= 12) {
          toggledPion.fourteenthSpace = true;
      }
      if (board[toggledPion.toggledPionTableId + 18] === null
      && allCases[toggledPion.toggledPionTableId + 18].classList.contains("noPieceHere") !== true
      && board[toggledPion.toggledPionTableId + 9] >= 12) {
          toggledPion.eighteenthSpace = true;
      }
      if (board[toggledPion.toggledPionTableId - 14] === null
      && allCases[toggledPion.toggledPionTableId - 14].classList.contains("noPieceHere") !== true
      && board[toggledPion.toggledPionTableId - 7] >= 12) {
          toggledPion.minusFourteenthSpace = true;
      }
      if (board[toggledPion.toggledPionTableId - 18] === null
      && allCases[toggledPion.toggledPionTableId - 18].classList.contains("noPieceHere") !== true
      && board[toggledPion.toggledPionTableId - 9] >= 12) {
          toggledPion.minusEighteenthSpace = true;
      }
  } else {
      if (board[toggledPion.toggledPionTableId + 14] === null
      && allCases[toggledPion.toggledPionTableId + 14].classList.contains("noPieceHere") !== true
      && board[toggledPion.toggledPionTableId + 7] < 12 && board[toggledPion.toggledPionTableId + 7] !== null) {
          toggledPion.fourteenthSpace = true;
      }
      if (board[toggledPion.toggledPionTableId + 18] === null
      && allCases[toggledPion.toggledPionTableId + 18].classList.contains("noPieceHere") !== true
      && board[toggledPion.toggledPionTableId + 9] < 12 && board[toggledPion.toggledPionTableId + 9] !== null) {
          toggledPion.eighteenthSpace = true;
      }
      if (board[toggledPion.toggledPionTableId - 14] === null && allCases[toggledPion.toggledPionTableId - 14].classList.contains("noPieceHere") !== true
      && board[toggledPion.toggledPionTableId - 7] < 12
      && board[toggledPion.toggledPionTableId - 7] !== null) {
          toggledPion.minusFourteenthSpace = true;
      }
      if (board[toggledPion.toggledPionTableId - 18] === null && allCases[toggledPion.toggledPionTableId - 18].classList.contains("noPieceHere") !== true
      && board[toggledPion.toggledPionTableId - 9] < 12
      && board[toggledPion.toggledPionTableId - 9] !== null) {
          toggledPion.minusEighteenthSpace = true;
      }
  }
  checkPion();
}

function checkPion() {
  if (toggledPion.isKing) {
      givePieceBorder();
  } else {
      if (turn) {
          toggledPion.minusSeventhSpace = false;
          toggledPion.minusNinthSpace = false;
          toggledPion.minusFourteenthSpace = false;
          toggledPion.minusEighteenthSpace = false;
      } else {
          toggledPion.seventhSpace = false;
          toggledPion.ninthSpace = false;
          toggledPion.fourteenthSpace = false;
          toggledPion.eighteenthSpace = false;
      }
      givePieceBorder();
  }
}

function givePieceBorder() {
  if (toggledPion.seventhSpace || toggledPion.ninthSpace || toggledPion.fourteenthSpace || toggledPion.eighteenthSpace
  || toggledPion.minusSeventhSpace || toggledPion.minusNinthSpace || toggledPion.minusFourteenthSpace || toggledPion.minusEighteenthSpace) {
      document.getElementById(toggledPion.pieceId).style.border = "3px solid orange";
      CellClick();
  } else {
      return;
  }
}

function CellClick() {
  if (toggledPion.seventhSpace) {
      allCases[toggledPion.toggledPionTableId + 7].setAttribute("onclick", "makeMove(7)");
  }
  if (toggledPion.ninthSpace) {
      allCases[toggledPion.toggledPionTableId + 9].setAttribute("onclick", "makeMove(9)");
  }
  if (toggledPion.fourteenthSpace) {
      allCases[toggledPion.toggledPionTableId + 14].setAttribute("onclick", "makeMove(14)");
  }
  if (toggledPion.eighteenthSpace) {
      allCases[toggledPion.toggledPionTableId + 18].setAttribute("onclick", "makeMove(18)");
  }
  if (toggledPion.minusSeventhSpace) {
      allCases[toggledPion.toggledPionTableId - 7].setAttribute("onclick", "makeMove(-7)");
  }
  if (toggledPion.minusNinthSpace) {
      allCases[toggledPion.toggledPionTableId - 9].setAttribute("onclick", "makeMove(-9)");
  }
  if (toggledPion.minusFourteenthSpace) {
      allCases[toggledPion.toggledPionTableId - 14].setAttribute("onclick", "makeMove(-14)");
  }
  if (toggledPion.minusEighteenthSpace) {
      allCases[toggledPion.toggledPionTableId - 18].setAttribute("onclick", "makeMove(-18)");
  }
}

function makeMove(number) {
  document.getElementById(toggledPion.pieceId).remove();
  allCases[toggledPion.toggledPionTableId].innerHTML = "";
  if (playerTurn) {
      if (toggledPion.isKing) {
          allCases[toggledPion.toggledPionTableId + number].innerHTML = `<p class="red-piece king" id="${toggledPion.pieceId}"></p>`;
          numberPionRed = document.querySelectorAll("p");
      } else {
          allCases[toggledPion.toggledPionTableId + number].innerHTML = `<p class="red-piece" id="${toggledPion.pieceId}"></p>`;
          numberPionRed = document.querySelectorAll("p");
      }
  } else {
      if (toggledPion.isKing) {
          allCases[toggledPion.toggledPionTableId + number].innerHTML = `<p2 class="black-piece king" id="${toggledPion.pieceId}"></p2>`;
          numberPionBlack = document.querySelectorAll("p2");
      } else {
          allCases[toggledPion.toggledPionTableId + number].innerHTML = `<p2 class="black-piece" id="${toggledPion.pieceId}"></p2>`;
          numberPionBlack = document.querySelectorAll("p2");
      }
  }

  let indexOfPiece = toggledPion.toggledPionTableId
  if (number === 14 || number === -14 || number === 18 || number === -18) {
      changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
  } else {
      changeData(indexOfPiece, indexOfPiece + number);
  }
}

function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
  board[indexOfBoardPiece] = null;
  board[modifiedIndex] = parseInt(toggledPion.pieceId);
  if (turn && toggledPion.pieceId < 12 && modifiedIndex >= 57) {
      document.getElementById(toggledPion.pieceId).classList.add("king")
  }
  if (turn === false && toggledPion.pieceId >= 12 && modifiedIndex <= 7) {
      document.getElementById(toggledPion.pieceId).classList.add("king");
  }
  if (removePiece) {
      board[removePiece] = null;
      if (turn && toggledPion.pieceId < 12) {
          cells[removePiece].innerHTML = "";
          blackScore--
      }
      if (turn === false && toggledPion.pieceId >= 12) {
          cells[removePiece].innerHTML = "";
          redScore--
      }
  }
  resettoggledPionProperties();
  removeCellonclick();
  removeEventListeners();
}

function removeEventListeners() {
  if (playerTurn) {
      for (let i = 0; i < numberPionRed.length; i++) {
          numberPionRed[i].removeEventListener("click", getPlayerPieces);
      }
  } else {
      for (let i = 0; i < numberPionBlack.length; i++) {
          numberPionBlack[i].removeEventListener("click", getPlayerPieces);
      }
  }
  changePlayer();
}


function changePlayer() {
  if (playerTurn) {
      turn = false;
      for (let i = 0; i < redTurnText.length; i++) {
          redTurnText[i].style.color = "lightGrey";
          blackTurntext[i].style.color = "black";
      }
  } else {
      turn = true;
      for (let i = 0; i < blackTurntext.length; i++) {
          blackTurntext[i].style.color = "lightGrey";
          redTurnText[i].style.color = "black";
      }
  }
  pionEventListener();
}

pionEventListener();

// document.querySelectorAll(".case-w").forEach(cell => cell.addEventListener("click",hideDot))
// function hideDot() {
//   const indexCellHideB = parseInt(this.dataset.index) 
//   document.getElementById(`${indexCellHideB}`).innerHTML = ""
// }



// Restart
// const indice =1
// let clicButton = document.querySelector("#restart");

// clicButton.onclick = function restart(){
//   for (let j=0; j<originTable.length; j++){
//     originTable.forEach(function (value, index){
//      if (value==1){
//       document.getElementById(index).innerHTML = `<img src="./assets/Pion_Black.png" height="55" width="55">`
//      }
//      if (value==2){
//       document.getElementById(index).innerHTML = `<img src="./assets/Pion_Red.png" height="55" width="55">`
//      }
//      if (value==0){
//       document.getElementById(index).innerHTML = ``
//      }
//     });
//   }
// }

