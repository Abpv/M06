// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];

//seleccionamos los botones
const btnJugar = document.getElementsByTagName('button')[0];
const btnYa = document.getElementsByTagName('button')[1];
const btnReset = document.getElementsByTagName('button')[2];

const imgMaquina = document.querySelector('#maquina>img');
const actual = document.getElementById('actual');
const total = document.getElementById('total');

const nombreInput = document.getElementsByTagName('input')[0];
nombreInput.setAttribute("autocomplete", "off");
const partidasInput = document.getElementsByTagName('input')[1];

const piedra = document.getElementsByTagName('img')[0];
piedra.setAttribute("id", "piedra")
const papel = document.getElementsByTagName('img')[1];
papel.setAttribute("id", "papel")
const tijera = document.getElementsByTagName('img')[2];
tijera.setAttribute("id", "tijera")

const historialDiv = document.getElementById('historial');
const seleccionado = document.getElementsByClassName("seleccionado");
let imagenes = document.querySelectorAll('#jugador>img');
let contador = 0;

let arrayHistorial = [];

//cuando haya cargado la pagina al completo, ponemos los botones a la escucha
window.onload = function () {
    //mandamos llamar a la funcion inciarPartida() al presionar el boton "JUGAR"
    btnJugar.addEventListener("click", iniciarPartida); 
    //llamamos a la funcion tirar() cuando presionamos el boton "¡YA!"
    btnYa.addEventListener("click", tirar);
    //si presionamos el boton "Reiniciar" llamamos a la funcion resetearPartida()
    btnReset.addEventListener("click", resetearPartida);
}

function iniciarPartida() {
    //almacenamos los valores para que sea mas 
    let nombre = nombreInput.value;
    let partidas = partidasInput.value;
    let expresion = /\D{1}\w{3,}/;
    let nombreValido, partidasValidas = false;

    if (expresion.test(nombre)) {
        nombreInput.classList.remove("fondoRojo")
        nombreInput.setAttribute('disabled', '')
        nombreValido = true;
    } else {
        nombreInput.classList.add("fondoRojo");
        nombreValido = false;
    }

    if (partidas > 0) {
        partidasInput.classList.remove("fondoRojo");
        partidasInput.setAttribute('disabled', '');
        total.innerHTML = `${partidas}`;
        partidasValidas = true;
    } else {
        partidasInput.classList.add("fondoRojo");
        partidasValidas = false;
    }

    if (nombreValido && partidasValidas) {
        piedra.src = "img/piedraJugador.png";
        papel.src = "img/papelJugador.png";
        tijera.src = "img/tijeraJugador.png";

        btnJugar.setAttribute("disabled", "")
        elegirOpcion();

    } else {
        console.log("inicio no valido");
    }
}
function elegirOpcion() {
    btnYa.removeAttribute("disabled", "");
    imagenes.forEach(imagen => {
        imagen.addEventListener('click', function () {
            quitarSeleccionado();
            this.classList.add('seleccionado');
            this.classList.remove('noSeleccionado');
        });
    });
}
function quitarSeleccionado() {
    imagenes.forEach(imagen => {
        imagen.classList.remove('seleccionado');
        imagen.classList.add('noSeleccionado');

    })

}
function seleccionarJugador() {
    let seleccionadoJ = document.querySelector('img.seleccionado');
    let eleccionJugador = seleccionadoJ.id;
    let indiceJugador = posibilidades.indexOf(eleccionJugador);

    return indiceJugador;

} 
function seleccionaMaquina() {
    let eleccionMaquina = posibilidades[Math.floor(Math.random() * 3)];
    imgMaquina.src = `img/${eleccionMaquina}Ordenador.png`;
    let indiceMaquina = posibilidades.indexOf(eleccionMaquina);
   
    return indiceMaquina;

}

function tirar() {
    contador++;
    let jugador = seleccionarJugador();
    let maquina = seleccionaMaquina();
    comprobarResultado(jugador, maquina, posibilidades)

    if (partidasInput.value == contador) {
        btnYa.setAttribute("disabled", "")
        setTimeout(() => {
            alert("Ha acabado la partida, por favor pulsa en RESET si quiere seguir jugando")
        }, 500)

    }
    actual.innerText = contador;

}
function comprobarResultado(indiceJugador, indiceMaquina, arrayPosibilidades) {
    if (indiceJugador == indiceMaquina) {
        agregarResultado("Empate");
    } else if (indiceJugador < indiceMaquina) {
        if (indiceJugador == 0 && indiceMaquina == arrayPosibilidades.length - 1) {
            agregarResultado(`Gana ${nombreInput.value}`);
        } else {
            agregarResultado("Gana la máquina");
        }

    } else if (indiceJugador > indiceMaquina) {
        if (indiceMaquina == 0 && indiceJugador == arrayPosibilidades.length - 1) {
            agregarResultado("Gana la máquina");
        } else {
            agregarResultado(`Gana ${nombreInput.value}`);
        }
    }
}
function agregarResultado(mensaje) {
    arrayHistorial.push(mensaje);
    const resultadoLi = document.createElement('li');
    resultadoLi.innerHTML = `
            <li>${mensaje}</li>`;
    historialDiv.prepend(resultadoLi)
}
function resetearPartida() {
    console.log("RESETEANDO");
    contador = 0;

    partidasInput.value = 0;
    actual.innerHTML = contador;

    nombreInput.removeAttribute("disabled", "")
    partidasInput.removeAttribute("disabled", "");
    btnJugar.removeAttribute("disabled", "")

    mostrarResultado(arrayHistorial);
    iniciarPartida();
}
function mostrarResultado(arrayResultados) {
    historialDiv.innerHTML = "";
    arrayHistorial = [];
    arrayResultados.forEach(resultado => {
        agregarResultado(resultado);
    });
}

