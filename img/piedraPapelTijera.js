// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];

const btnJugar = document.getElementsByTagName('button')[0];
const btnYa = document.getElementsByTagName('button')[1];
const btnReset = document.getElementsByTagName('button')[2];

const imgMaquina = document.querySelector('#maquina>img');
const actual = document.getElementById('actual');
const total = document.getElementById('total');

const nombreInput = document.getElementsByTagName('input')[0];
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

document.addEventListener('DOMContentLoaded', () =>{
    btnJugar.addEventListener("click", iniciarPartida)

    function validarNombre(nombre){
        let expresion = /(^[A-Za-z]{1,})\w{2,}/;
        let nombreValido = false;
    
        if(expresion.test(nombre.value)){
            nombreInput.classList.remove("fondoRojo")
            nombreInput.setAttribute('disabled', '')
            nombreValido = true;
            
        }else{
            nombreInput.classList.add("fondoRojo");
            nombreValido = false;
        }
        return nombreValido;
    }
    function validarPartidas(partidas){
        let partidasValidas = false;
    
        if(partidas.value > 0){
            partidas.classList.remove("fondoRojo");
            partidas.setAttribute('disabled', '');
            total.innerHTML = `${partidas.value}`;
            partidasValidas = true;
        }else{
            partidas.classList.add("fondoRojo");
            partidasValidas = false;       
        }
        return partidasValidas;
    }
    function validarInputs(nombreValido, partidasValidas){      
        if(nombreValido && partidasValidas){
            piedra.src = "img/piedraJugador.png";
            papel.src = "img/papelJugador.png";
            tijera.src = "img/tijeraJugador.png";
            return true;
        }else{            
            return false;
        }
    
    }
    function iniciarPartida(e){
        e.preventDefault();
        let nom = validarNombre(nombreInput);
        let par = validarPartidas(partidasInput) ;
        
        if(validarInputs(nom, par)){
            console.log("inicio valido"); 
            elegirOpcion();
            
            btnYa.addEventListener("click", function(){
                contador++;
                tirar()
            });
            btnReset.addEventListener("click", function(){
                resetearPartida(arrayHistorial);
            });
        }else{
            console.log("inicio no valido");
        }

       
        // btnReset.addEventListener("click", function(){
        //     resetearPartida();
        // })
  
    }
    function elegirOpcion(){
        imagenes.forEach(imagen => {
            imagen.addEventListener('click', function(){
                quitarSeleccionado();
                this.classList.add('seleccionado');
                this.classList.remove('noSeleccionado');
                
            });
        });
    }
    function quitarSeleccionado(){
        imagenes.forEach(imagen =>{
            imagen.classList.remove('seleccionado')
            imagen.classList.add('noSeleccionado');
    
        })
      
    }
    function seleccionarJugador(){
        let seleccionadoJ = document.querySelector('img.seleccionado');
        let eleccionJugador = seleccionadoJ.id;
        let indiceJugador = posibilidades.indexOf(eleccionJugador);
        return indiceJugador;
    ;
    }
    function seleccionaMaquina(){
        let eleccionMaquina = posibilidades[Math.floor(Math.random() * 3)];
        imgMaquina.src = `img/${eleccionMaquina}Ordenador.png`;
        let indiceMaquina = posibilidades.indexOf(eleccionMaquina);
        return indiceMaquina
       
    }
    function tirar(){
        actual.innerHTML = contador;
        let jugador = seleccionarJugador();
        let maquina = seleccionaMaquina();
    
        comprobarResultado(jugador, maquina, posibilidades)
     
    }
    function comprobarResultado(indiceJugador, indiceMaquina, arrayPosibilidades){
        if(indiceJugador == indiceMaquina){
            agregarResultado("Empate");
        }else if(indiceJugador < indiceMaquina){
            if(indiceJugador == 0 && indiceMaquina == arrayPosibilidades.length -1 ){
                agregarResultado(`Gana ${nombreInput.value}`);
            }else{
                agregarResultado("Gana la máquina");
            }
    
        }else if(indiceJugador > indiceMaquina){
            if(indiceMaquina == 0 && indiceJugador == arrayPosibilidades.length -1 ){
  
                agregarResultado("Gana la máquina");
            }else{

                agregarResultado(`Gana ${nombreInput.value}`);
            }
        }
       
    }
    function agregarResultado(mensaje){
        arrayHistorial.push(mensaje);
    
        const resultadoLi = document.createElement('li');
        resultadoLi.innerHTML = `
            <li>${mensaje}</li>`;
    
        historialDiv.appendChild(resultadoLi)    
        console.log(arrayHistorial);
    }
    
    function resetearPartida(arrayHistorial){
        historialDiv.innerHTML = "";
    
        //mostrar mensaje
        const maquinaDiv = document.getElementById('maquina');
        const mensajeDiv = document.createElement('div');
        mensajeDiv.innerHTML = `<div>
            <h3>Nueva Partida</h3>
        </div>`;
        
        maquinaDiv.appendChild(mensajeDiv);
    
        setTimeout(() => { 
            maquinaDiv.removeChild(mensajeDiv);
        }, 3000);
        
        //activar campos
        nombreInput.removeAttribute("disabled", "");
        partidasInput.removeAttribute('disabled', "");
        partidasInput.value = "";
        //actual y total a 0
        actual.innerHTML = "0";
        total.innerHTML = "0";
        //imagenmaquina defecto
        imgMaquina.src = "img/defecto.png";
        //mantener historial
        
        mostrarResultado(arrayHistorial);
        
    }
    function mostrarResultado(arrayResultados){
        historialDiv.innerHTML = "";
        arrayHistorial = [];
        console.log(arrayResultados);
        arrayResultados.forEach(resultado =>{
            agregarResultado(resultado);
        });
    }
    



});

