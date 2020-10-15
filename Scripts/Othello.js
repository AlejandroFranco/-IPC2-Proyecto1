var cuadrados = [];
var ancho = 8;
document.addEventListener('DOMContentLoaded', function () {
    var grid = document.querySelector('.grid');
    //esto es el numero de cuadros de ancho que tiene el tablero
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
function actualizarNombres() {
    var e = document.getElementById('dropdown');
    var valSel = e.selectedIndex;
    var opc = e.options[valSel];
    var texto = document.getElementById("lblJugador2").innerText;
    document.getElementById("lblJugador2").innerText = (texto + opc.text);
}
function click(cuadrado) {
    if (turnoJugador1 == true) {
        var ficha = document.createElement("img");
        ficha.src = "../Imagenes/FichaNegra.png";
        ficha.className = "Negra";
        if (!cuadrado.hasChildNodes() && esMovValido(cuadrado, ficha)) {
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
var turnoJugador1 = true;
var turnoJugador2 = false;
//el patron se completa como negra blanca blanca ...negra o al revés
function patronCompletado(ficha, contador, dir) {
    if (ficha.className === "Negra") {
        for (var i = contador; i < cuadrados.length; i++) {
            var esBordeDe = (i % 8 === 0);
            var esBordeIz = (i % 8 === 8 - 1);
            if (dir === "a") {
                //hacia arriba
                if (i > 8 && cuadrados[i - 8].children.length > 0 && cuadrados[i - 8].childNodes[0].className === "Blanca") {
                    continue;
                }
                else if (i > 8 && cuadrados[i - 8].children.length > 0 && cuadrados[i - 8].childNodes[0].className === "Negra") {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (dir === "ab") {
                //hacia abajo
                if (i < 57 && !esBordeDe && cuadrados[i + 8].children.length > 0 && cuadrados[i + 8].childNodes[0].className === "Blanca") {
                    continue;
                }
                else if (i < 57 && !esBordeDe && cuadrados[i + 8].children.length > 0 && cuadrados[i + 8].childNodes[0].className === "Negra") {
                    return true;
                }
                else {
                    return false;
                }
            }
            if (dir === "de") {
                //lado derecho 
                if (i < 64 && !esBordeDe && cuadrados[i + 1].children.length > 0 && cuadrados[i + 1].childNodes[0].className === "Blanca") {
                    continue;
                }
                else if (i < 64 && !esBordeDe && cuadrados[i + 1].children.length > 0 && cuadrados[i + 1].childNodes[0].className === "Negra") {
                    return true;
                }
                else {
                    return false;
                }
            }
            if (dir === "iz") {
                //lado izquierdo
                if (i > 1 && !esBordeIz && cuadrados[i - 1].children.length > 0 && cuadrados[i - 1].childNodes[0].className === "Blanca") {
                    continue;
                }
                else if (i > 1 && !esBordeIz && cuadrados[i - 1].children.length > 0 && cuadrados[i - 1].childNodes[0].className === "Negra") {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (dir === "ne") {
                //hacia el noreste
                if (i > 8 && !esBordeDe && cuadrados[i + 1 - 8].children.length > 0 && cuadrados[i + 1 - 8].childNodes[0].className === "Blanca") {
                    continue;
                }
                else if (i > 8 && !esBordeDe && cuadrados[i + 1 - 8].children.length > 0 && cuadrados[i + 1 - 8].childNodes[0].className === "Negra") {
                    return true;
                }
                else {
                    return false;
                }
            }
            if (dir === "no") {
                //hacie el noroeste
                if (i > 9 && !esBordeIz && cuadrados[i - 1 - 8].children.length > 0 && cuadrados[i - 1 - 8].childNodes[0].className === "Blanca") {
                    continue;
                }
                else if (i > 9 && !esBordeIz && cuadrados[i - 1 - 8].children.length > 0 && cuadrados[i - 1 - 8].childNodes[0].className === "Negra") {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (dir === "se") {
                // hacia el sureste
                if (i < 56 && !esBordeDe && cuadrados[i + 1 + 8].children.length > 0 && cuadrados[i + 1 + 8].childNodes[0].className === "Blanca") {
                    continue;
                }
                else if (i < 56 && !esBordeDe && cuadrados[i + 1 + 8].children.length > 0 && cuadrados[i + 1 + 8].childNodes[0].className === "Negra") {
                    return true;
                }
                else {
                    return false;
                }
            }
            if (dir === "so") {
                //hacia el suroeste
                if (i < 57 && !esBordeIz && cuadrados[i - 1 + 8].children.length > 0 && cuadrados[i - 1 + 8].childNodes[0].className === "Blanca") {
                    continue;
                }
                else if (i < 57 && !esBordeIz && cuadrados[i - 1 + 8].children.length > 0 && cuadrados[i - 1 + 8].childNodes[0].className === "Negra") {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
    else {
        for (var i = contador; i < cuadrados.length; i++) {
            var esBordeDe = (i % 8 === 0);
            var esBordeIz = (i % 8 === 8 - 1);
            //lado derecho
            if (dir === "a") {
                //hacia arriba
                if (i > 8 && cuadrados[i - 8].children.length > 0 && cuadrados[i - 8].childNodes[0].className === "Negra") {
                    continue;
                }
                else if (i > 8 && cuadrados[i - 8].children.length > 0 && cuadrados[i - 8].childNodes[0].className === "Blanca") {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (dir === "ab") {
                //hacia abajo
                if (i < 57 && !esBordeDe && cuadrados[i + 8].children.length > 0 && cuadrados[i + 8].childNodes[0].className === "Negra") {
                    continue;
                }
                else if (i < 57 && !esBordeDe && cuadrados[i + 8].children.length > 0 && cuadrados[i + 8].childNodes[0].className === "Blanca") {
                    return true;
                }
                else {
                    return false;
                }
            }
            if (dir === "de") {
                //lado derecho 
                if (i < 64 && !esBordeDe && cuadrados[i + 1].children.length > 0 && cuadrados[i + 1].childNodes[0].className === "Negra") {
                    continue;
                }
                else if (i < 64 && !esBordeDe && cuadrados[i + 1].children.length > 0 && cuadrados[i + 1].childNodes[0].className === "Blanca") {
                    return true;
                }
                else {
                    return false;
                }
            }
            if (dir === "iz") {
                //lado izquierdo
                if (i > 1 && !esBordeIz && cuadrados[i - 1].children.length > 0 && cuadrados[i - 1].childNodes[0].className === "Negra") {
                    continue;
                }
                else if (i > 1 && !esBordeIz && cuadrados[i - 1].children.length > 0 && cuadrados[i - 1].childNodes[0].className === "Blanca") {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (dir === "ne") {
                //hacia el noreste
                if (i > 8 && !esBordeDe && cuadrados[i + 1 - 8].children.length > 0 && cuadrados[i + 1 - 8].childNodes[0].className === "Negra") {
                    continue;
                }
                else if (i > 8 && !esBordeDe && cuadrados[i + 1 - 8].children.length > 0 && cuadrados[i + 1 - 8].childNodes[0].className === "Blanca") {
                    return true;
                }
                else {
                    return false;
                }
            }
            if (dir === "no") {
                //hacie el noroeste
                if (i > 9 && !esBordeIz && cuadrados[i - 1 - 8].children.length > 0 && cuadrados[i - 1 - 8].childNodes[0].className === "Negra") {
                    continue;
                }
                else if (i > 9 && !esBordeIz && cuadrados[i - 1 - 8].children.length > 0 && cuadrados[i - 1 - 8].childNodes[0].className === "Blanca") {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (dir === "se") {
                // hacia el sureste
                if (i < 56 && !esBordeDe && cuadrados[i + 1 + 8].children.length > 0 && cuadrados[i + 1 + 8].childNodes[0].className === "Negra") {
                    continue;
                }
                else if (i < 56 && !esBordeDe && cuadrados[i + 1 + 8].children.length > 0 && cuadrados[i + 1 + 8].childNodes[0].className === "Blanca") {
                    return true;
                }
                else {
                    return false;
                }
            }
            if (dir === "so") {
                //hacia el suroeste
                if (i < 57 && !esBordeIz && cuadrados[i - 1 + 8].children.length > 0 && cuadrados[i - 1 + 8].childNodes[0].className === "Blanca") {
                    continue;
                }
                else if (i < 57 && !esBordeIz && cuadrados[i - 1 + 8].children.length > 0 && cuadrados[i - 1 + 8].childNodes[0].className === "Negra") {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
}
function esMovValido(cuadrado, ficha) {
    //reviso horizontalmente
    var numCuadrado = +cuadrado.id;
    numCuadrado -= 1;
    if (ficha.className === "Negra") {
        for (var i = numCuadrado; i < cuadrados.length; i++) {
            var esBordeDe = (i % 8 === 0);
            var esBordeIz = (i % 8 === 8 - 1);
            //lado derecho
            if (i < 63 && !esBordeDe && cuadrados[i + 1].children.length > 0 && cuadrados[i + 1].childNodes[0].className === "Blanca") {
                return patronCompletado(ficha, i + 1, "de");
            }
            //lado izquierdo
            else if (i > 1 && !esBordeIz && cuadrados[i - 1].children.length > 0 && cuadrados[i - 1].childNodes[0].className === "Blanca") {
                return patronCompletado(ficha, i - 1, "iz");
            }
            //hacia el noreste
            else if (i > 8 && !esBordeDe && cuadrados[i + 1 - 8].children.length > 0 && cuadrados[i + 1 - 8].childNodes[0].className === "Blanca") {
                return patronCompletado(ficha, i + 1 - 8, "ne");
            }
            //hacia arriba
            else if (i > 8 && cuadrados[i - 8].children.length > 0 && cuadrados[i - 8].childNodes[0].className === "Blanca") {
                return patronCompletado(ficha, i - 8, "a");
            }
            //hacie el noroeste
            else if (i > 9 && !esBordeIz && cuadrados[i - 1 - 8].children.length > 0 && cuadrados[i - 1 - 8].childNodes[0].className === "Blanca") {
                return patronCompletado(ficha, i - 1 - 8, "no");
            }
            //hacia el suroeste
            else if (i < 57 && !esBordeIz && cuadrados[i - 1 + 8].children.length > 0 && cuadrados[i - 1 + 8].childNodes[0].className === "Blanca") {
                return patronCompletado(ficha, i - 1 + 8, "so");
            }
            // hacia el sureste
            else if (i < 56 && !esBordeDe && cuadrados[i + 1 + 8].children.length > 0 && cuadrados[i + 1 + 8].childNodes[0].className === "Blanca") {
                return patronCompletado(ficha, i + 1 + 8, "se");
            }
            //hacia abajo
            else if (i < 57 && !esBordeDe && cuadrados[i + 8].children.length > 0 && cuadrados[i + 8].childNodes[0].className === "Blanca") {
                return patronCompletado(ficha, i + 8, "a");
            }
            else {
                return false;
            }
        }
    }
    else {
        for (var i = numCuadrado; i < cuadrados.length; i++) {
            var esBordeDe = (i % 8 === 0);
            var esBordeIz = (i % 8 === 8 - 1);
            //lado derecho
            if (i < 64 && !esBordeDe && cuadrados[i + 1].children.length > 0 && cuadrados[i + 1].childNodes[0].className === "Negra") {
                return patronCompletado(ficha, i + 1, "de");
            }
            //lado izquierdo
            else if (i > 1 && !esBordeIz && cuadrados[i - 1].children.length > 0 && cuadrados[i - 1].childNodes[0].className === "Negra") {
                return patronCompletado(ficha, i - 1, "iz");
            }
            //hacia el noreste
            else if (i > 8 && !esBordeDe && cuadrados[i + 1 - 8].children.length > 0 && cuadrados[i + 1 - 8].childNodes[0].className === "Negra") {
                return patronCompletado(ficha, i + 1 - 8, "ne");
            }
            //hacia arriba
            else if (i > 8 && cuadrados[i - 8].children.length > 0 && cuadrados[i - 8].childNodes[0].className === "Negra") {
                return patronCompletado(ficha, i - 8, "a");
            }
            //hacie el noroeste
            else if (i > 9 && !esBordeIz && cuadrados[i - 1 - 8].children.length > 0 && cuadrados[i - 1 - 8].childNodes[0].className === "Negra") {
                return patronCompletado(ficha, i - 1 - 8, "no");
            }
            //hacia el suroeste
            else if (i < 57 && !esBordeIz && cuadrados[i - 1 + 8].children.length > 0 && cuadrados[i - 1 + 8].childNodes[0].className === "Negra") {
                return patronCompletado(ficha, i - 1 + 8, "so");
            }
            // hacia el sureste
            else if (i < 56 && !esBordeDe && cuadrados[i + 1 + 8].children.length > 0 && cuadrados[i + 1 + 8].childNodes[0].className === "Negra") {
                return patronCompletado(ficha, i + 1 + 8, "se");
            }
            //hacia abajo
            else if (i < 57 && !esBordeDe && cuadrados[i + 8].children.length > 0 && cuadrados[i + 8].childNodes[0].className === "Negra") {
                return patronCompletado(ficha, i + 8, "a");
            }
            else {
                return false;
            }
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
    fichanegra.className = "Negra";
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
