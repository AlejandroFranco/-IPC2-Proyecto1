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
        if (!cuadrado.hasChildNodes() && esMovimientoValido(cuadrado, ficha)) {
            cuadrado.appendChild(ficha);
            fichasNegras++;
            ficha.setAttribute('id', "img" + String(contadorIdsFichas++));
            turnoJugador1 = false;
            turnoJugador2 = true;
        }
    }
    else {
        var ficha = document.createElement("img");
        ficha.src = "../Imagenes/FichaBlanca.png";
        ficha.className = "Blanca";
        if (!cuadrado.hasChildNodes() && esMovimientoValido(cuadrado, ficha)) {
            cuadrado.appendChild(ficha);
            ficha.setAttribute('id', "img" + String(contadorIdsFichas++));
            fichasBlancas++;
            turnoJugador1 = true;
            turnoJugador2 = false;
        }
    }
}
function voltearFichas(fichasVoltear, color) {
    if (color === "Negra") {
        for (var i = 0; i < fichasVoltear.length; i++) {
            var img = cuadrados[fichasVoltear[i]].children[0];
            img.src = "../Imagenes/FichaNegra.png";
            img.className = "Negra";
            fichasNegras++;
        }
        fichasVoltear = [];
    }
    else {
        for (var i = 0; i < fichasVoltear.length; i++) {
            var img = cuadrados[fichasVoltear[i]].children[0];
            img.src = "../Imagenes/FichaBlanca.png";
            img.className = "Blanca";
            fichasBlancas++;
        }
        fichasVoltear = [];
    }
}
var turnoJugador1 = true;
var turnoJugador2 = false;
var fichasNegras;
var fichasBlancas;
var contadorIdsFichas = 1;
//el patron se completa como negra blanca blanca ...negra o al revés
function patronCompletado(ficha, contador, direccion) {
    var fichasVoltear = [];
    fichasVoltear.push(contador);
    if (ficha.className === "Negra") {
        var patronEncontrado = true;
        while (patronEncontrado) {
            var esBordeDe = (contador % 8 === 0);
            var esBordeIz = (contador % 8 === 8 - 1);
            if (direccion === "a") {
                //hacia arriba
                contador = contador - 8;
                if (contador > 8 && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador > 8 && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    voltearFichas(fichasVoltear, "Negra");
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (direccion === "ab") {
                //hacia abajo
                contador = contador + 8;
                if (contador < 57 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador < 57 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    voltearFichas(fichasVoltear, "Negra");
                    return true;
                }
                else {
                    return false;
                }
            }
            if (direccion === "de") {
                //lado derecho 
                contador = contador + 1;
                if (contador < 64 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador < 64 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    voltearFichas(fichasVoltear, "Negra");
                    return true;
                }
                else {
                    return false;
                }
            }
            if (direccion === "iz") {
                //lado izquierdo
                contador = contador - 1;
                if (contador > 1 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador > 1 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    voltearFichas(fichasVoltear, "Negra");
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (direccion === "ne") {
                //hacia el noreste
                contador = contador + 1 - 8;
                if (contador > 8 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador > 8 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    voltearFichas(fichasVoltear, "Negra");
                    return true;
                }
                else {
                    return false;
                }
            }
            if (direccion === "no") {
                //hacie el noroeste
                contador = contador - 1 - 8;
                if (contador > 9 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador > 9 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    voltearFichas(fichasVoltear, "Negra");
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (direccion === "se") {
                // hacia el sureste
                contador = contador + 1 + 8;
                if (contador < 56 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador < 56 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    voltearFichas(fichasVoltear, "Negra");
                    return true;
                }
                else {
                    return false;
                }
            }
            if (direccion === "so") {
                //hacia el suroeste
                contador = contador - 1 + 8;
                if (contador < 57 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador < 57 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    voltearFichas(fichasVoltear, "Negra");
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
    else {
        var patronEncontrado = true;
        while (patronEncontrado) {
            var esBordeDe = (contador % 8 === 0);
            var esBordeIz = (contador % 8 === 8 - 1);
            //lado derecho
            if (direccion === "a") {
                //hacia arriba
                contador = contador - 8;
                if (contador > 8 && cuadrados[contador].children.length > 0 && cuadrados[contador - 8].childNodes[0].className === "Negra") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador > 8 && cuadrados[contador].children.length > 0 && cuadrados[contador - 8].childNodes[0].className === "Blanca") {
                    voltearFichas(fichasVoltear, "Blanca");
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (direccion === "ab") {
                //hacia abajo
                contador = contador + 8;
                if (contador < 57 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador + 8].childNodes[0].className === "Negra") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador < 57 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador + 8].childNodes[0].className === "Blanca") {
                    voltearFichas(fichasVoltear, "Blanca");
                    return true;
                }
                else {
                    return false;
                }
            }
            if (direccion === "de") {
                //lado derecho 
                contador = contador + 1;
                if (contador < 64 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador < 64 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    voltearFichas(fichasVoltear, "Blanca");
                    return true;
                }
                else {
                    return false;
                }
            }
            if (direccion === "iz") {
                //lado izquierdo
                contador = contador - 1;
                if (contador > 1 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador > 1 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    voltearFichas(fichasVoltear, "Blanca");
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (direccion === "ne") {
                //hacia el noreste
                contador = contador + 1 - 8;
                if (contador > 8 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador > 8 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    voltearFichas(fichasVoltear, "Blanca");
                    return true;
                }
                else {
                    return false;
                }
            }
            if (direccion === "no") {
                //hacie el noroeste
                contador = contador - 1 - 8;
                if (contador > 9 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador > 9 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    voltearFichas(fichasVoltear, "Blanca");
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (direccion === "se") {
                contador = contador + 1 + 8;
                // hacia el sureste
                if (contador < 56 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador < 56 && !esBordeDe && cuadrados[contador + 1 + 8].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    voltearFichas(fichasVoltear, "Blanca");
                    return true;
                }
                else {
                    return false;
                }
            }
            if (direccion === "so") {
                //hacia el suroeste
                contador = contador - 1 + 8;
                if (contador < 57 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador < 57 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    voltearFichas(fichasVoltear, "Blanca");
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
}
function esMovimientoValido(cuadrado, ficha) {
    //reviso horizontalmente
    var numCuadrado = +cuadrado.id;
    var sonMovimientoValidos = [];
    numCuadrado -= 1;
    if (ficha.className === "Negra") {
        for (var i = numCuadrado; i < cuadrados.length; i++) {
            var esBordeDe = (i % 8 === 0);
            var esBordeIz = (i % 8 === 8 - 1);
            //lado derecho
            if (i < 63 && !esBordeDe && cuadrados[i + 1].children.length > 0 && cuadrados[i + 1].childNodes[0].className === "Blanca") {
                sonMovimientoValidos.push(patronCompletado(ficha, i + 1, "de"));
            }
            //lado izquierdo
            else if (i > 1 && !esBordeIz && cuadrados[i - 1].children.length > 0 && cuadrados[i - 1].childNodes[0].className === "Blanca") {
                sonMovimientoValidos.push(patronCompletado(ficha, i - 1, "iz"));
            }
            //hacia el noreste
            else if (i > 8 && !esBordeDe && cuadrados[i + 1 - 8].children.length > 0 && cuadrados[i + 1 - 8].childNodes[0].className === "Blanca") {
                sonMovimientoValidos.push(patronCompletado(ficha, i + 1 - 8, "ne"));
            }
            //hacia arriba
            else if (i > 8 && cuadrados[i - 8].children.length > 0 && cuadrados[i - 8].childNodes[0].className === "Blanca") {
                sonMovimientoValidos.push(patronCompletado(ficha, i - 8, "a"));
            }
            //hacie el noroeste
            else if (i > 9 && !esBordeIz && cuadrados[i - 1 - 8].children.length > 0 && cuadrados[i - 1 - 8].childNodes[0].className === "Blanca") {
                sonMovimientoValidos.push(patronCompletado(ficha, i - 1 - 8, "no"));
            }
            //hacia el suroeste
            else if (i < 57 && !esBordeIz && cuadrados[i - 1 + 8].children.length > 0 && cuadrados[i - 1 + 8].childNodes[0].className === "Blanca") {
                sonMovimientoValidos.push(patronCompletado(ficha, i - 1 + 8, "so"));
            }
            // hacia el sureste
            else if (i < 56 && !esBordeDe && cuadrados[i + 1 + 8].children.length > 0 && cuadrados[i + 1 + 8].childNodes[0].className === "Blanca") {
                sonMovimientoValidos.push(patronCompletado(ficha, i + 1 + 8, "se"));
            }
            //hacia abajo
            else if (i < 57 && !esBordeDe && cuadrados[i + 8].children.length > 0 && cuadrados[i + 8].childNodes[0].className === "Blanca") {
                sonMovimientoValidos.push(patronCompletado(ficha, i + 8, "ab"));
            }
            else {
                sonMovimientoValidos.push(false);
                break;
            }
        }
        if (sonMovimientoValidos.indexOf(true) > -1) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        for (var i = numCuadrado; i < cuadrados.length; i++) {
            var esBordeDe = (i % 8 === 0);
            var esBordeIz = (i % 8 === 8 - 1);
            //lado derecho
            if (i < 64 && !esBordeDe && cuadrados[i + 1].children.length > 0 && cuadrados[i + 1].childNodes[0].className === "Negra") {
                sonMovimientoValidos.push(patronCompletado(ficha, i + 1, "de"));
            }
            //lado izquierdo
            else if (i > 1 && !esBordeIz && cuadrados[i - 1].children.length > 0 && cuadrados[i - 1].childNodes[0].className === "Negra") {
                sonMovimientoValidos.push(patronCompletado(ficha, i - 1, "iz"));
            }
            //hacia el noreste
            else if (i > 8 && !esBordeDe && cuadrados[i + 1 - 8].children.length > 0 && cuadrados[i + 1 - 8].childNodes[0].className === "Negra") {
                sonMovimientoValidos.push(patronCompletado(ficha, i + 1 - 8, "ne"));
            }
            //hacia arriba
            else if (i > 8 && cuadrados[i - 8].children.length > 0 && cuadrados[i - 8].childNodes[0].className === "Negra") {
                sonMovimientoValidos.push(patronCompletado(ficha, i - 8, "a"));
            }
            //hacie el noroeste
            else if (i > 9 && !esBordeIz && cuadrados[i - 1 - 8].children.length > 0 && cuadrados[i - 1 - 8].childNodes[0].className === "Negra") {
                sonMovimientoValidos.push(patronCompletado(ficha, i - 1 - 8, "no"));
            }
            //hacia el suroeste
            else if (i < 57 && !esBordeIz && cuadrados[i - 1 + 8].children.length > 0 && cuadrados[i - 1 + 8].childNodes[0].className === "Negra") {
                sonMovimientoValidos.push(patronCompletado(ficha, i - 1 + 8, "so"));
            }
            // hacia el sureste
            else if (i < 56 && !esBordeDe && cuadrados[i + 1 + 8].children.length > 0 && cuadrados[i + 1 + 8].childNodes[0].className === "Negra") {
                sonMovimientoValidos[i] = patronCompletado(ficha, i + 1 + 8, "se");
            }
            //hacia abajo
            else if (i < 57 && !esBordeDe && cuadrados[i + 8].children.length > 0 && cuadrados[i + 8].childNodes[0].className === "Negra") {
                sonMovimientoValidos.push(patronCompletado(ficha, i + 8, "ab"));
            }
            else {
                sonMovimientoValidos.push(false);
                break;
            }
        }
        if (sonMovimientoValidos.indexOf(true) > -1) {
            return true;
        }
        else {
            return false;
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
    fichanegra.setAttribute('id', "img" + String(contadorIdsFichas++));
    fichablanca.setAttribute('id', "img" + String(contadorIdsFichas++));
    fichasNegras++;
    fichasBlancas++;
    fichablanca.src = "../Imagenes/FichaBlanca.png";
    fichablanca.className = "Blanca";
    fichanegra.src = "../Imagenes/FichaNegra.png";
    fichanegra.className = "Negra";
    celda28.appendChild(fichablanca);
    celda29.appendChild(fichanegra);
    fichanegra = document.createElement("img");
    fichablanca = document.createElement("img");
    fichanegra.setAttribute('id', "img" + String(contadorIdsFichas++));
    fichablanca.setAttribute('id', "img" + String(contadorIdsFichas++));
    fichablanca.src = "../Imagenes/FichaBlanca.png";
    fichablanca.className = "Blanca";
    fichanegra.src = "../Imagenes/FichaNegra.png";
    fichanegra.className = "Negra";
    celda36.appendChild(fichanegra);
    celda37.appendChild(fichablanca);
    fichasNegras++;
    fichasBlancas++;
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