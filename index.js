const tour = document.querySelector("h3");
let gameActive = true;
let redToggled = false;
let blackToggled = false;
let playerActiv = "Rouge";

// 0:vide /1:Pion red /2:Pion black /3:king red /4:king black
let empty = 0;
let pionRed = 1;
let pionBlack = 2;
let kingRed = 3;
let kingBlack = 4;
let table = [
  "2","0","2","0","2","0","2","0",
  "0","2","0","2","0","2","0","2",
  "2","0","2","0","2","0","2","0",
  "0","0","0","0","0","0","0","0",
  "0","0","0","0","0","0","0","0",
  "0","1","0","1","0","1","0","1",
  "1","0","1","0","1","0","1","0",
  "0","1","0","1","0","1","0","1",
]

// Messages
const gagne = () => `Le joueur ${playerActiv} a gagné`
const tourPlayer = () => `C'est au tour du joueur ${playerActiv}`

tour.innerHTML = tourPlayer()

document.querySelectorAll(".case-w").forEach(cell => cell.addEventListener("click",clicCell))

function clicCell() {
  const indexCell = parseInt(this.dataset.index)
  console.log(indexCell)
  document.getElementById(`${indexCell}`).innerHTML = `<img src="./assets/Pion_Red.png" height="55" width="55">`
}
