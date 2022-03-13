const tour = document.querySelector("h3")
// const cellSelector = document.querySelector(`.case-w`)
let jeuActif = true
let joueurActif = "Rouge"

const table = [

]

// Messages
const gagne = () => `Le joueur ${joueurActif} a gagné`
const tourJoueur = () => `C'est au tour du joueur ${joueurActif}`

tour.innerHTML = tourJoueur()

document.querySelectorAll(".case-w").forEach(cell => cell.addEventListener("click",clicCell))

function clicCell() {
  const indexCell = parseInt(this.dataset.index)
  console.log(indexCell)
  document.getElementById(`${indexCell}`).innerHTML = `<img src="./assets/Pion_Red.png" height="55" width="55">`
}
