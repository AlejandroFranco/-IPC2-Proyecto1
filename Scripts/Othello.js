var cuadrados = [];
document.addEventListener('DOMContentLoaded', function () {
    var grid = document.querySelector('.grid');
    //esto es el numero de cuadros de ancho que tiene el tablero
    var ancho = 8;
    var finJuego = false;
    //create Board
    function crearTablero() {
        console.log("En el metodo");
        var _loop_1 = function (i) {
            var cuadrado = document.createElement('div');
            //este es el identificador unico para mis 64 divs
            cuadrado.setAttribute('id', String(i + 1));
            cuadrado.classList.add("celda");
            grid.appendChild(cuadrado);
            cuadrados.push(cuadrado);
            //click normal
            cuadrado.addEventListener("click", function (e) {
                click(cuadrado);
            });
            //cntrl y click izquierdo
            cuadrado.oncontextmenu = function (e) {
                e.preventDefault();
            };
        };
        for (var i = 0; i < ancho * ancho; i++) {
            _loop_1(i);
        }
    }
    crearTablero();
});
function rangoPared(x) {
    var lista1 = [9, 17, 25, 33, 41, 49, 57];
    var lista2 = [8, 16, 24, 32, 40, 48, 56, 64];
    if (1 <= x && x <= 8) {
        return true;
    }
    else if (57 <= x && x <= 64) {
        return true;
    }
    else if (lista1.indexOf(x) > -1 || lista2.indexOf(x) > -1) {
        return true;
    }
    else {
        return false;
    }
}
function actualizarNombres() {
    var e = document.getElementById('dropdown');
    var valSel = e.selectedIndex;
    var opc = e.options[valSel];
    var texto = document.getElementById("lblJugador2").innerText;
    document.getElementById("lblJugador2").innerText = (texto + opc.text);
}
var turnoJugador1 = true;
var turnoJugador2 = false;
/*
function esMovValido(cuadrado: HTMLDivElement): boolean {
    //reviso horizontalmente
    var numCuadrado: number = +cuadrado.id
    var colorOriginal =   cuadrado.className
    //reviso a la derecha del cuadrado
    if (colorOriginal == "Negra") {
    //reviso si el movimiento es valido a la derecha a partir de esa posicion
        for (let i = 0; i < cuadrados.length; i++) {
            if (cuadrados[numCuadrado + 1].hasChildNodes() && cuadrados[1].children[0].className == "Blanca") {
                        
            }
        }
    }
        else {

        }
        return true
    }
}*/
function click(cuadrado) {
    if (turnoJugador1 == true) {
        var ficha = document.createElement("img");
        ficha.src = "../Imagenes/FichaNegra.png";
        ficha.className = "Negra";
        if (cuadrado.hasChildNodes()) {
        }
        else {
            /* if (esMovValido(cuadrado)) {
                 cuadrado.appendChild(ficha)
                 turnoJugador1 = false
                 turnoJugador2 = true
             } else {
             }*/
        }
    }
    else {
        var ficha = document.createElement("img");
        ficha.src = "../Imagenes/FichaBlanca.png";
        ficha.className = "Blanca";
        if (cuadrado.hasChildNodes()) {
        }
        else {
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
    var celda28 = document.getElementById('28');
    var celda29 = document.getElementById('29');
    var celda36 = document.getElementById('36');
    var celda37 = document.getElementById('37');
    var fichanegra = document.createElement("img");
    var fichablanca = document.createElement("img");
    fichablanca.src = "../Imagenes/FichaBlanca.png";
    fichanegra.src = "../Imagenes/FichaNegra.png";
    celda28.appendChild(fichablanca);
    celda29.appendChild(fichanegra);
    fichanegra = document.createElement("img");
    fichablanca = document.createElement("img");
    fichablanca.src = "../Imagenes/FichaBlanca.png";
    fichanegra.src = "../Imagenes/FichaNegra.png";
    celda36.appendChild(fichanegra);
    celda37.appendChild(fichablanca);
}
function modoJuego(modo) {
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
//# sourceMappingURL=Othello.js.map