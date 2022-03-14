const tour = document.querySelector("h3");
// Messages


// Valeurs:
let gameActive = true;
let playerActiv = "Rouge";
let playerTurn = true;
let playerPion;
let scoreRed = 12;
let scoreBlack = 12;


// 0:vide /1:Pion red  /2:Pion black /3:king red /4:king black
let vide = 0;
let pionRed = 1;
let pionBlack = 2;
let kingRed = 3;
let kingBlack = 4;

let playTable = [
  23,null,22,null,21,null,20,null,
  null,19,null,18,null,17,null,16,
  15,null,14,null,13,null,12,null,
  null,null,null,null,null,null,null,null,
  null,null,null,null,null,null,null,null,
  null,11,null,10,null,9,null,8,
  7,null,6,null,5,null,4,null,
  null,3,null,2,null,1,null,0,
]

let originTable = [
  2,0,2,0,2,0,2,0,
  0,2,0,2,0,2,0,2,
  2,0,2,0,2,0,2,0,
  0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,
  0,1,0,1,0,1,0,1,
  1,0,1,0,1,0,1,0,
  0,1,0,1,0,1,0,1,
]

const gagne = () => `Le joueur ${playerActiv} a gagné`
const tourPlayer = () => `C'est au tour du joueur ${playerActiv}`
tour.innerHTML = tourPlayer()


function pionEventListener() {
  if (playerTurn){
    document.querySelectorAll(".Red-pion").forEach(cell => cell.addEventListener("click",clicCellR))
    clicCellR();
  }
  else {
    document.querySelectorAll(".Black-pion").forEach(cell => cell.addEventListener("click",clicCellB))
    clicCellB();
  }
}


function clicCellR() {
  const indexCellR = parseInt(this.dataset.index)
  document.getElementById(`${indexCellR}`).innerHTML = `<img src="./assets/Pion_Red.png" height="00" width="00">`
}

function clicCellB() {
  const indexCellB = parseInt(this.dataset.index)
  document.getElementById(`${indexCellB}`).innerHTML = `<img src="./assets/Pion_Black.png" height="55" width="55">`
}

// document.querySelectorAll(".case-w").forEach(cell => cell.addEventListener("click",hideDot))
// function hideDot() {
//   const indexCellHideB = parseInt(this.dataset.index) 
//   document.getElementById(`${indexCellHideB}`).innerHTML = ""
// }








// Restart
const indice =1
let clicButton = document.querySelector("#restart");

clicButton.onclick = function restart(){
  for (let j=0; j<originTable.length; j++){
    originTable.forEach(function (value, index){
     if (value==1){
      document.getElementById(index).innerHTML = `<img src="./assets/Pion_Red.png" height="55" width="55">`
     }
     if (value==2){
      document.getElementById(index).innerHTML = `<img src="./assets/Pion_Black.png" height="55" width="55">`
     }
     if (value==0){
      document.getElementById(index).innerHTML = ``
     }
    });
  }
}

