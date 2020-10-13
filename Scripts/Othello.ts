﻿let cuadrados = [];
let ancho: number = 8;
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    //esto es el numero de cuadros de ancho que tiene el tablero
    //create Board
    function crearTablero() {
        console.log("En el metodo");
        for (let i = 0; i < ancho * ancho; i++) {
            const cuadrado = document.createElement('div');
            //este es el identificador unico para mis 64 divs
            cuadrado.setAttribute('id', String(i + 1));
            cuadrado.classList.add("celda");
            grid.appendChild(cuadrado);
            cuadrados.push(cuadrado);
            //click normal
            cuadrado.addEventListener("click", e => {
                click(cuadrado);
            });

            //cntrl y click izquierdo
            cuadrado.oncontextmenu = e => {
                e.preventDefault();

            };

        }

    }
    crearTablero();
});

function actualizarNombres() {
    var e = document.getElementById('dropdown') as HTMLSelectElement;
    var valSel = e.selectedIndex;
    var opc = e.options[valSel];
    var texto = document.getElementById("lblJugador2").innerText;
    document.getElementById("lblJugador2").innerText =  (texto + opc.text);
}

let turnoJugador1: boolean = true;
let turnoJugador2: boolean = false;

function esMovValido(cuadrado: HTMLDivElement, ficha:HTMLImageElement): boolean {
    //reviso horizontalmente
  var numCuadrado: number = +cuadrado.id;
  numCuadrado -= 1;
    if (ficha.className === "Negra") {
        for (let i = 0; i < cuadrados.length; i++) {
            const esBordeDe = (i % 8 === 0);
            const esBordeIz = (i % 8 === 8 - 1);

            if (cuadrados[i].childNodes.length !== 0   &&  cuadrados[i].childNodes[0].className === "  Blanca") {
                //lado derecho
                if (!esBordeDe && cuadrados[i + 1].children.length > 0 && cuadrados[i + 1].childNodes[0].className === "Negra") return true
                //lado izquierdo
                if (!esBordeIz && cuadrados[i - 1].children.length > 0 && cuadrados[i - 1].childNodes[0].className === "Negra") return true
                //hacia el noreste
                if (!esBordeDe && cuadrados[i + 1 - 8].children.length > 0 && cuadrados[i + 1 - 8].childNodes[0].className === "Negra") return true
                //hacia arriba
                if (cuadrados[i - 8].children.length > 0 && cuadrados[i - 8].childNodes[0].className === "Negra") return true
                //hacie el noroeste
                if (!esBordeIz && cuadrados[i - 1 - 8].children.length > 0 && cuadrados[i - 1 - 8].childNodes[0].className === "Negra") return true
                //hacia el suroeste
                if (!esBordeIz && cuadrados[i - 1 + 8].children.length > 0 && cuadrados[i - 1 + 8].childNodes[0].className === "Negra") return true
                // hacia el sureste
                if (!esBordeDe && cuadrados[i + 1 + 8].children.length > 0 && cuadrados[i + 1 + 8].childNodes[0].className === "Negra") return true
                //hacia abajo
                if (!esBordeDe && cuadrados[i + 8].children.length > 0 && cuadrados[i + 8].childNodes[0].className === "Negra") return true

            }
        }
    }
  else {
        for (let i = 0; i < cuadrados.length; i++) {
            const esBordeDe = (i % 8 === 0);
            const esBordeIz = (i % 8 === 8 - 1);
            //reviso a la derecha
            if (cuadrados[i].childNodes.length !== 0 && cuadrados[i].childNodes[0].className === "Negra") {
                //lado derecho
                if (!esBordeDe && cuadrados[i + 1].children.length>0 &&cuadrados[i + 1].childNodes[0].className === "Blanca") return true
                //lado izquierdo
                if (!esBordeIz && cuadrados[i - 1].children.length > 0 && cuadrados[i - 1].childNodes[0].className === "Blanca") return true 
                //hacia el noreste
                if (!esBordeDe && cuadrados[i + 1 - 8].children.length > 0 && cuadrados[i + 1 - 8].childNodes[0].className === "Blanca") return true 
                //hacia arriba
                if (cuadrados[i - 8].children.length > 0 &&cuadrados[i - 8].childNodes[0].className === "Blanca") return true
                //hacie el noroeste
                if (!esBordeIz && cuadrados[i - 1 - 8].children.length > 0 && cuadrados[i - 1 - 8].childNodes[0].className === "Blanca") return true
                //hacia el suroeste
                if (!esBordeIz && cuadrados[i - 1 + 8].children.length > 0 &&cuadrados[i - 1 + 8].childNodes[0].className === "Blanca") return true
                // hacia el sureste
                if (!esBordeDe && cuadrados[i + 1 + 8].children.length > 0  && cuadrados[i + 1 + 8].childNodes[0].className === "Blanca") return true
                //hacia abajo
                if (!esBordeDe && cuadrados[i + 8].children.length > 0&&cuadrados[i + 8].childNodes[0].className === "Blanca") return true
            }
        }
    }
    return true;
}


    function click(cuadrado: HTMLDivElement) {
        if (turnoJugador1 == true) {
            var ficha = document.createElement("img");
            ficha.src = "../Imagenes/FichaNegra.png";
            ficha.className = "Negra";
          if (!cuadrado.hasChildNodes() && esMovValido(cuadrado,ficha) ) {
              cuadrado.appendChild(ficha);
              turnoJugador1 = false;
              turnoJugador2 = true;
            } 
          }
        else {
            var ficha = document.createElement("img");
            ficha.src = "../Imagenes/FichaBlanca.png";
            ficha.className = "Blanca";
            if (!cuadrado.hasChildNodes() && esMovValido(cuadrado, ficha)) {
                cuadrado.appendChild(ficha);
                turnoJugador1 = true;
                turnoJugador2 = false;

            } 

        }

    }


    function turnos() {
        var fichas = ["negras", "blancas"];
        //El jugador 1 siempre va a ser el jugador loggeado
        //con este codigo decido quien mueve primero las fichas negras

    }


    function colocarTablero() {
        let celda28 = document.getElementById('28');
        let celda29 = document.getElementById('29');
        let celda36 = document.getElementById('36');
        let celda37 = document.getElementById('37');
        var fichanegra = document.createElement("img");
        var fichablanca = document.createElement("img");
        fichablanca.src = "../Imagenes/FichaBlanca.png";
        fichablanca.className = "Blanca";
        fichanegra.src = "../Imagenes/FichaNegra.png";
        fichanegra.className = "Negra";
        celda28.appendChild(fichablanca);
        celda29.appendChild(fichanegra);
        fichanegra = document.createElement("img");
        fichablanca = document.createElement("img");
        fichablanca.src = "../Imagenes/FichaBlanca.png";
        fichablanca.className = "Blanca";
        fichanegra.src = "../Imagenes/FichaNegra.png";
        fichanegra.className = "Negra"
        celda36.appendChild(fichanegra);
        celda37.appendChild(fichablanca);
    }

    function modoJuego(modo: string) {
        if (modo == "IA") {

        }
        else if (modo == "Vs") {
            colocarTablero();
            //  turnos()
        }
        else if (modo == "Torneo") {

        }
        else {
            limpiarTablero();
        }
    }

    function limpiarTablero() {
        var imagenes = document.getElementsByTagName('img');
        while (imagenes.length > 0) {
            imagenes[0].parentNode.removeChild(imagenes[0]);
        }
    }