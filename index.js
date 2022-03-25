const playTable = [
    null,0,null,1,null,2,null,3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null,null,null,null,null, null, null, null,
    null,null,null,null,null,null,null,null,
    12,null,13,null,14,null,15,null,
    null,16,null,17,null,18,null,19,
    20,null,21,null,22,null,23,null
]

let getPionId = function (pionId){
    let parse = parseInt(pionId);
    return playTable.indexOf(parse);
  }

const tour = document.querySelector(".h-3");
//const tourB = document.querySelector(".h-3B");
// Messages

// Valeurs:
let playerActiv = "Rouge"
let gameActive = true;
let playerTurn = true;
let playerPion;
let scoreRed = 12;
let scoreBlack = 12;
let numberPionRed = document.querySelectorAll("p");
let numberPionBlack = document.querySelectorAll("span")
const allCases = document.querySelectorAll("td")
// allCases.forEach(cell => cell.addEventListener("click",clicCellW))
// numberPionRed.forEach(pionR => pionR.addEventListener("click",clicCellR))
// numberPionBlack.forEach(pionB => pionB.addEventListener("click",clicCellB))


let toggledPion = {
  pionId: -1,
  toggledPionTableId: -1,
  isking: false,
  seventhSpace: false,
  ninthSpace: false,
  fourteenthSpace: false,
  eighteenthSpace: false,
  minusSeventhSpace: false,
  minusNinthSpace: false,
  minusFourteenthSpace: false,
  minusEighteenthSpace: false,
};

// 0:vide /1:Pion red  /2:Pion black /3:king red /4:king black
let vide = 0;
let pionBlack = 1;
let pionRed = 2;
let kingRed = 3;
let kingBlack = 4;


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

  resetBorders();
}

//nombre de pieces restante pour chaque joueur

function removeAttribute1() {
  for (let i = 0; i < allCases.length; i++) {
    allCases[i].removeAttribute("onclick");
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
  toggledPion.pionId = -1;
  toggledPion.pionId = -1;
  toggledPion.king = false;
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
  toggledPion.pionId = parseInt(event.target.id);
  toggledPion.toggledPionTableId = getPionId(toggledPion.pionId);
  isPieceKing();
}

function isPieceKing() {
  if (document.getElementById(toggledPion.pionId).classList.contains("king")) {
      toggledPion.king = true;
  } else {
      toggledPion.king = false;
  }
  getMove();
}

function getMove() { //Determine les cases auxquelles le pion peut accéder en calculant le nombre de case la séparant des cases autorisées
  if (playTable[toggledPion.toggledPionTableId + 7] === null &&
      allCases[toggledPion.toggledPionTableId + 7].classList.contains("empty") !== true) {
      toggledPion.seventhSpace = true;
  }
  if (playTable[toggledPion.toggledPionTableId + 9] === null &&
      allCases[toggledPion.toggledPionTableId + 9].classList.contains("empty") !== true) {
      toggledPion.ninthSpace = true;
  }
  if (playTable[toggledPion.toggledPionTableId - 7] === null &&
      allCases[toggledPion.toggledPionTableId - 7].classList.contains("empty") !== true) {
      toggledPion.minusSeventhSpace = true;
  }
  if (playTable[toggledPion.toggledPionTableId - 9] === null &&
      allCases[toggledPion.toggledPionTableId - 9].classList.contains("empty") !== true) {
      toggledPion.minusNinthSpace = true;
  }
  checkJumpMove();
}

function checkJumpMove() { //Pareil qu'au dessus mais lorsque le pion mange un autre (calcul du nombre de cases pour le déplacement)
  if (playerTurn) {
      if (playTable[toggledPion.toggledPionTableId + 14] === null
      && allCases[toggledPion.toggledPionTableId + 14].classList.contains("empty") !== true
      && playTable[toggledPion.toggledPionTableId + 7] >= 12) {
          toggledPion.fourteenthSpace = true;
      }
      if (playTable[toggledPion.toggledPionTableId + 18] === null
      && allCases[toggledPion.toggledPionTableId + 18].classList.contains("empty") !== true
      && playTable[toggledPion.toggledPionTableId + 9] >= 12) {
          toggledPion.eighteenthSpace = true;
      }
      if (playTable[toggledPion.toggledPionTableId - 14] === null
      && allCases[toggledPion.toggledPionTableId - 14].classList.contains("empty") !== true
      && playTable[toggledPion.toggledPionTableId - 7] >= 12) {
          toggledPion.minusFourteenthSpace = true;
      }
      if (playTable[toggledPion.toggledPionTableId - 18] === null
      && allCases[toggledPion.toggledPionTableId - 18].classList.contains("empty") !== true
      && playTable[toggledPion.toggledPionTableId - 9] >= 12) {
          toggledPion.minusEighteenthSpace = true;
      }
  } else {
      if (playTable[toggledPion.toggledPionTableId + 14] === null
      && allCases[toggledPion.toggledPionTableId + 14].classList.contains("empty") !== true
      && playTable[toggledPion.toggledPionTableId + 7] < 12 && playTable[toggledPion.toggledPionTableId + 7] !== null) {
          toggledPion.fourteenthSpace = true;
      }
      if (playTable[toggledPion.toggledPionTableId + 18] === null
      && allCases[toggledPion.toggledPionTableId + 18].classList.contains("empty") !== true
      && playTable[toggledPion.toggledPionTableId + 9] < 12 && playTable[toggledPion.toggledPionTableId + 9] !== null) {
          toggledPion.eighteenthSpace = true;
      }
      if (playTable[toggledPion.toggledPionTableId - 14] === null && allCases[toggledPion.toggledPionTableId - 14].classList.contains("empty") !== true
      && playTable[toggledPion.toggledPionTableId - 7] < 12
      && playTable[toggledPion.toggledPionTableId - 7] !== null) {
          toggledPion.minusFourteenthSpace = true;
      }
      if (playTable[toggledPion.toggledPionTableId - 18] === null && allCases[toggledPion.toggledPionTableId - 18].classList.contains("empty") !== true
      && playTable[toggledPion.toggledPionTableId - 9] < 12
      && playTable[toggledPion.toggledPionTableId - 9] !== null) {
          toggledPion.minusEighteenthSpace = true;
      }
  }
  checkPion();
}

function checkPion() {
  if (toggledPion.king) {
      givePieceBorder();
  } else {
      if (playerTurn) {
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
      document.getElementById(toggledPion.pionId).style.border = "2px solid #fa7a35";
      CellClick();
  } else {
      return;
  }
}

function CellClick() {
  if (toggledPion.seventhSpace) {
    allCases[toggledPion.toggledPionTableId + 7].setAttribute(
      "onclick",
      "makeMove(7)"
    );
  }
  if (toggledPion.ninthSpace) {
    allCases[toggledPion.toggledPionTableId + 9].setAttribute(
      "onclick",
      "makeMove(9)"
    );
  }
  if (toggledPion.fourteenthSpace) {
    allCases[toggledPion.toggledPionTableId + 14].setAttribute(
      "onclick",
      "makeMove(14)"
    );
  }
  if (toggledPion.eighteenthSpace) {
    allCases[toggledPion.toggledPionTableId + 18].setAttribute(
      "onclick",
      "makeMove(18)"
    );
  }
  if (toggledPion.minusSeventhSpace) {
    allCases[toggledPion.toggledPionTableId - 7].setAttribute(
      "onclick",
      "makeMove(-7)"
    );
  }
  if (toggledPion.minusNinthSpace) {
    allCases[toggledPion.toggledPionTableId - 9].setAttribute(
      "onclick",
      "makeMove(-9)"
    );
  }
  if (toggledPion.minusFourteenthSpace) {
    allCases[toggledPion.toggledPionTableId - 14].setAttribute(
      "onclick",
      "makeMove(-14)"
    );
  }
  if (toggledPion.minusEighteenthSpace) {
    allCases[toggledPion.toggledPionTableId - 18].setAttribute(
      "onclick",
      "makeMove(-18)"
    );
  }
}

function makeMove(number) {
  document.getElementById(toggledPion.pionId).remove();
  allCases[toggledPion.toggledPionTableId].innerHTML = "";
  if (playerTurn) {
      if (toggledPion.king) {
          allCases[toggledPion.toggledPionTableId + number].innerHTML = `<p class="RedPion king" id="${toggledPion.pionId}"></p>`;
          numberPionRed = document.querySelectorAll("p");
      } else {
          allCases[toggledPion.toggledPionTableId + number].innerHTML = `<p class="RedPion" id="${toggledPion.pionId}"></p>`;
          numberPionRed = document.querySelectorAll("p");
      }
  } else {
      if (toggledPion.king) {
          allCases[toggledPion.toggledPionTableId + number].innerHTML = `<span class="BlackPion king" id="${toggledPion.pionId}"></span>`;
          numberPionBlack = document.querySelectorAll("span");
      } else {
          allCases[toggledPion.toggledPionTableId + number].innerHTML = `<span class="BlackPion" id="${toggledPion.pionId}"></span>`;
          numberPionBlack = document.querySelectorAll("span");
      }
  }

  let indexOfPiece = toggledPion.toggledPionTableId;
  if (number === 14 || number === -14 || number === 18 || number === -18) {
    changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
  } else {
    changeData(indexOfPiece, indexOfPiece + number);
  }
}

function changeData(indexOfplayTablePiece, modifiedIndex, removePiece) {
  playTable[indexOfplayTablePiece] = null;
  playTable[modifiedIndex] = parseInt(toggledPion.pionId);
  if (playerTurn && toggledPion.pionId < 12 && modifiedIndex >= 57) {
      document.getElementById(toggledPion.pionId).classList.add("king")
  }
  if (playerTurn === false && toggledPion.pionId >= 12 && modifiedIndex <= 7) {
      document.getElementById(toggledPion.pionId).classList.add("king");
  }
  if (removePiece) {
      playTable[removePiece] = null;
      if (playerTurn && toggledPion.pionId < 12) {
          allCases[removePiece].innerHTML = "";
          scoreBlack--
      }
      if (playerTurn === false && toggledPion.pionId >= 12) {
          allCases[removePiece].innerHTML = "";
          scoreRed--
      }
  }
  resetToggledProperties();
  CellClick();
  removeEventListeners();
}

function removeEventListeners() {
  if (playerTurn) {
      for (let i = 0; i < numberPionRed.length; i++) {
          numberPionRed[i].removeEventListener("click", togglePlayerPieces);
      }
  } else {
      for (let i = 0; i < numberPionBlack.length; i++) {
          numberPionBlack[i].removeEventListener("click", togglePlayerPieces);
      }
  }
  changePlayer();
}

function changePlayer() {
  if (playerTurn) {
      playerTurn = false
      playerActiv = "NOIR";
      const tourPlayerB = () => `${playerActiv}`
 tour.innerHTML = tourPlayerB()
    }
   else {
    playerTurn = true
    playerActiv = "ROUGE";
    const tourPlayerR = () => `${playerActiv}`
 tour.innerHTML = tourPlayerR()
  }

 //const gagne = () => `Le joueur ${playerActiv} a gagné`


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
