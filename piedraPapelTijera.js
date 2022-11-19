// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
const btnJugar = document.getElementsByTagName('button')[0];
const btnYa = document.getElementsByTagName('button')[1];
const btnreset = document.getElementsByTagName('button')[2];

btnJugar.addEventListener("click", iniciarPartida)
//    //

function iniciarPartida(){
    console.log("iniciando partida")
}