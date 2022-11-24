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
let imagenes = document.querySelectorAll('#jugador>img');
let contador = 0;

let arrayHistorial = [];

//cuando haya cargado la pagina al completo, ponemos los botones a la escucha
window.onload = function () {
    //mandamos llamar a la funcion inciarPartida() al presionar el boton "JUGAR"
    btnJugar.addEventListener("click", iniciarPartida); 
    //llamamos a la funcion tirar() cuando presionamos el boton "¡YA!"
    btnYa.addEventListener("click", tirar);
    //si presionamos el boton "RESET" llamamos a la funcion reiniciarPartida()
    btnReset.addEventListener("click", reiniciarPartida);
}

function iniciarPartida() {
    //almacenamos los valores para que sea mas 
    let nombre = nombreInput.value;
    let partidas = partidasInput.value;

    //definimos la expresion regular para validar el nombre
    let expresion = /^\D{1}.{3,}/;
    let nombreValido, partidasValidas = false;

    //si el nombre pasa la validacion 
    if (expresion.test(nombre)) {
        nombreInput.classList.remove("fondoRojo")
        nombreInput.setAttribute('disabled', '')
        nombreValido = true;
    }   
    //si el nombre no pasa la validacion
    else {
        nombreInput.classList.add("fondoRojo");
        nombreValido = false;
    }
    //Validamos las partidas y las mostramos en el span total
    if (partidas > 0) {
        partidasInput.classList.remove("fondoRojo");
        partidasInput.setAttribute('disabled', '');
        total.innerHTML = `${partidas}`;
        partidasValidas = true;
    } else {
        partidasInput.classList.add("fondoRojo");
        partidasValidas = false;
    }

    //si ambas validaciones son pasadas con exito llamamos a la funcion elegirOpcion()
    //mostramos las imagenes del juego y deshabilitamos el boton jugar
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
//esta funcion anade la clase seleccionado a la imagen en la que pulsemos
function elegirOpcion() {
    //habiliamos el boton ya, que tras resetearFuncion queda deshabilito
    btnYa.removeAttribute("disabled", "");
    //pondremos a escucha a cada imagen que tengamos almacenada en el array imagenes,
    //si pulsamos sobre alguna de ellas, quita la clase noSeleccionado y anade "seleccionado"
    imagenes.forEach(imagen => {
        imagen.addEventListener('click', function () {
            //llamamos a la funcion quitarSeleccionado para que quite primero la clase "seleccionado"
            quitarSeleccionado();
            this.classList.add('seleccionado');//el this hace referencia al objeto que pulsamos
            this.classList.remove('noSeleccionado');
        });
    });
}
//esta funcion quita el seleccionado de todas las las imagenes del array imagenes 
//y anade la clase "noSeleccionado"
function quitarSeleccionado() {
    imagenes.forEach(imagen => {
        imagen.classList.remove('seleccionado');
        imagen.classList.add('noSeleccionado');

    })

}
//funcion que nos devuelve el indice de nuestra imagen seleccionada
//dentro del array probabilidades
function seleccionarJugador() {
    //almacenamos la imagen seleccionada
    let seleccionado = document.querySelector('img.seleccionado');
    //extraemos su id en forma de string y lo almacenamos
    let eleccionJugador = seleccionado.id; 
    //buscamos el index con el string proporcionado
    let indiceJugador = posibilidades.indexOf(eleccionJugador);

    return indiceJugador; //devolvemos el indice

} 
function seleccionaMaquina() {
    //aleatoriamente seleccionamos un elemento del array posibilidades
    let eleccionMaquina = posibilidades[Math.floor(Math.random() * posibilidades.length)];
    //usamos ese elemento para seleccionar la imagen de la maquina
    imgMaquina.src = `img/${eleccionMaquina}Ordenador.png`;
    //almacenamos el index del elemento dentro del array
    let indiceMaquina = posibilidades.indexOf(eleccionMaquina);
   
    return indiceMaquina; //devolvemos el index

}

function tirar() {
    //anadimos un contador que nos ayude a llevar la cuenta de las partidas jugadas
    contador++;
    //recogemos los indices tanto del jugador como de la maquina
    let jugador = seleccionarJugador(); 
    let maquina = seleccionaMaquina();
    //funcion que comprueba los dos indices para devolver un ganador
    comprobarResultado(jugador, maquina, posibilidades)

    //si el numero de partidas jugadas es igual al numero de partidas introducidas al inicio
    //se acaba el juego
    if (partidasInput.value == contador) {
        //deshabilitamos el boton "YA"
        btnYa.setAttribute("disabled", "")
        //ponemos un temporizador para que le de tiempo a mostrar bien el li resultado
        setTimeout(() => { 
            alert("Ha acabado la partida, por favor pulsa en RESET si quiere seguir jugando")
        }, 500)

    }
    //actualizamos el numero de partidas jugadas
    actual.innerText = contador;

}
//funcion que nos devuelve un ganador
function comprobarResultado(indiceJugador, indiceMaquina, arrayPosibilidades) {

    if (indiceJugador == indiceMaquina) {
        //llamamos a la funcion agregarResultado(mensaje), 
        //que nos imprime un li con el mensaje que le pasemos en la vista
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
//funcion que nos imprime los resultados
function agregarResultado(mensaje) {
    //agregamos cada nuevo resultado al arrayHistorial que aparecerá al reiniciar la partida
    arrayHistorial.push(mensaje);
    //creamos una lista
    const resultadoLi = document.createElement('li');
    //el contenido de esa lista sera el mensaje pasado en comprobarResultado()
    resultadoLi.innerHTML = `
            <li>${mensaje}</li>`;
    //agregamos esa lista al contenedor con el historial
    historialDiv.prepend(resultadoLi)
}
//funcion que reinicia la partida, pero que conserva el historial y el nombre del jugador
function reiniciarPartida() {
    //ponemos los valores a 0
    contador = 0;
    partidasInput.value = 0;
    actual.innerHTML = contador;

    //habilitamos los campos del formulario y el boton "JUGAR"
    nombreInput.removeAttribute("disabled", "")
    partidasInput.removeAttribute("disabled", "");
    btnJugar.removeAttribute("disabled", "")

    //llamamos a la funcion mostrar resultado que recorre el array con todos los resultados pasados
    mostrarResultado(arrayHistorial);
    //iniciamos la partida
    iniciarPartida();
}
function mostrarResultado(arrayResultados) {
    historialDiv.innerHTML = ""; //limpiamos el contenedor con el historial
    arrayHistorial = []; //vaciamos el array para que no nos duplique los resultados
    //recorremos el array para mostrar los cada elemento del array
    arrayResultados.forEach(resultado => {
        agregarResultado(resultado);
    });
}

