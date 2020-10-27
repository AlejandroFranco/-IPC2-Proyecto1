var cuadrados = [];
var audio = new Audio("../Sonidos/ficha.mp3");
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
    document.getElementById("lblJugador2").innerText = "";
    document.getElementById("lblJugador2").innerText = (texto + opc.text);
}
function click(cuadrado) {
    if (turnoJugador1 == true) {
        if (document.getElementById("labelFichasJugador1").innerText.search("Negras") > -1) {
            var ficha = document.createElement("img");
            ficha.src = "../Imagenes/FichaNegra.png";
            ficha.className = "Negra";
            if (!cuadrado.hasChildNodes() && esMovimientoValido(cuadrado, ficha)) {
                audio.play();
                cuadrado.appendChild(ficha);
                fichasNegras += 1;
                ficha.setAttribute('id', "img" + String(contadorIdsFichas++));
                turnoJugador1 = false;
                turnoJugador2 = true;
                document.getElementById("labelTurnoJugador1").innerText = "Turno: No";
                document.getElementById("labelTurnoJugador2").innerText = "Turno: Si";
                actualizarPunteo();
            }
            else {
                var ficha = document.createElement("img");
                ficha.src = "../Imagenes/FichaBlanca.png";
                ficha.className = "Blanca";
                if (!cuadrado.hasChildNodes() && esMovimientoValido(cuadrado, ficha)) {
                    audio.play();
                    cuadrado.appendChild(ficha);
                    fichasBlancas += 1;
                    ficha.setAttribute('id', "img" + String(contadorIdsFichas++));
                    turnoJugador1 = false;
                    turnoJugador2 = true;
                    document.getElementById("labelTurnoJugador1").innerText = "Turno: No";
                    document.getElementById("labelTurnoJugador2").innerText = "Turno: Si";
                    actualizarPunteo();
                }
            }
        }
    }
    else {
        if (document.getElementById("labelFichasJugador2").innerText.search("Negras") > -1) {
            var ficha = document.createElement("img");
            ficha.src = "../Imagenes/FichaNegra.png";
            ficha.className = "Negra";
            if (!cuadrado.hasChildNodes() && esMovimientoValido(cuadrado, ficha)) {
                audio.play();
                cuadrado.appendChild(ficha);
                ficha.setAttribute('id', "img" + String(contadorIdsFichas++));
                fichasNegras += 1;
                turnoJugador1 = true;
                turnoJugador2 = false;
                document.getElementById("labelTurnoJugador1").innerText = "Turno: Si";
                document.getElementById("labelTurnoJugador2").innerText = "Turno: No";
                actualizarPunteo();
            }
        }
        else {
            var ficha = document.createElement("img");
            ficha.src = "../Imagenes/FichaBlanca.png";
            ficha.className = "Blanca";
            if (!cuadrado.hasChildNodes() && esMovimientoValido(cuadrado, ficha)) {
                audio.play();
                cuadrado.appendChild(ficha);
                ficha.setAttribute('id', "img" + String(contadorIdsFichas++));
                fichasBlancas += 1;
                turnoJugador1 = true;
                turnoJugador2 = false;
                document.getElementById("labelTurnoJugador1").innerText = "Turno: Si";
                document.getElementById("labelTurnoJugador2").innerText = "Turno: No";
                actualizarPunteo();
            }
        }
    }
}
function actualizarPunteo() {
    document.getElementById("labelPunteoJ1").innerText = "Punteo: " + fichasNegras;
    document.getElementById("labelPunteoJ2").innerText = "Punteo: " + fichasBlancas;
}
function finDelJuego() {
    var contador = 0;
    for (var i = 0; i < cuadrados.length; i++) {
        if (cuadrados[i].children.lengt > 0) {
            contador++;
        }
    }
    if (contador === 64) {
        if (fichasBlancas > fichasNegras) {
            console.log("ganana las blancas");
        }
        else {
            console.log("ganana las negras");
        }
    }
}
function voltearFichas(fichasVoltear, color) {
    if (color === "Negra") {
        for (var i = 0; i < fichasVoltear.length; i++) {
            var img = cuadrados[fichasVoltear[i]].children[0];
            img.src = "../Imagenes/FichaNegra.png";
            img.className = "Negra";
            fichasNegras += 1;
            fichasBlancas -= 1;
        }
        fichasVoltear = [];
    }
    else {
        for (var i = 0; i < fichasVoltear.length; i++) {
            var img = cuadrados[fichasVoltear[i]].children[0];
            img.src = "../Imagenes/FichaBlanca.png";
            img.className = "Blanca";
            fichasBlancas += 1;
            fichasNegras -= 1;
        }
        fichasVoltear = [];
    }
}
var turnoJugador1 = false;
var turnoJugador2 = false;
var fichasNegras = 0;
var fichasBlancas = 0;
var contadorIdsFichas = 1;
//el patron se completa como negra blanca blanca ...negra o al revés
function patronCompletado(ficha, contador, direccion) {
    var fichasVoltear = [];
    if (ficha.className === "Negra") {
        var patronEncontrado = true;
        while (patronEncontrado) {
            var esBordeDe = (contador + 1 % 8 === 0);
            var esBordeIz = (contador + 1 % 8 === 1);
            if (direccion === "a") {
                //el contador inicialmente es el numero dentro del array de cuadrados del cuadrado sobre el que se hizo click originalmente
                //hacia arriba
                contador = contador - 8;
                if (contador + 1 > 8 && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador + 1 > 8 && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
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
                if (contador + 1 < 57 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador + 1 < 57 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    voltearFichas(fichasVoltear, "Negra");
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (direccion === "de") {
                //lado derecho 
                contador = contador + 1;
                if (contador + 1 < 64 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador + 1 < 64 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    voltearFichas(fichasVoltear, "Negra");
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (direccion === "iz") {
                //lado izquierdo
                contador = contador - 1;
                if (contador + 1 > 1 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador + 1 > 1 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
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
                if (contador + 1 > 8 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador + 1 > 8 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    voltearFichas(fichasVoltear, "Negra");
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (direccion === "no") {
                //hacie el noroeste
                contador = contador - 1 - 8;
                if (contador + 1 > 9 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador + 1 > 9 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
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
                if (contador + 1 < 56 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador + 1 < 56 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    voltearFichas(fichasVoltear, "Negra");
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (direccion === "so") {
                //hacia el suroeste
                contador = contador - 1 + 8;
                if (contador + 1 < 57 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador + 1 < 57 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
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
            var esBordeDe = (contador + 1 % 8 === 0);
            var esBordeIz = (contador + 1 % 8 === 1);
            //lado derecho
            if (direccion === "a") {
                //hacia arriba
                contador = contador - 8;
                if (contador + 1 > 8 && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador + 1 > 8 && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
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
                if (contador + 1 < 57 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador + 1 < 57 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    voltearFichas(fichasVoltear, "Blanca");
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (direccion === "de") {
                //lado derecho 
                contador = contador + 1;
                if (contador + 1 < 64 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador + 1 < 64 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    voltearFichas(fichasVoltear, "Blanca");
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (direccion === "iz") {
                //lado izquierdo
                contador = contador - 1;
                if (contador + 1 > 1 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador + 1 > 1 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
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
                if (contador + 1 > 8 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador + 1 > 8 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    voltearFichas(fichasVoltear, "Blanca");
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (direccion === "no") {
                //hacie el noroeste
                contador = contador - 1 - 8;
                if (contador + 1 > 9 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador + 1 > 9 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
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
                if (contador + 1 < 56 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador + 1 < 56 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
                    voltearFichas(fichasVoltear, "Blanca");
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (direccion === "so") {
                //hacia el suroeste
                contador = contador - 1 + 8;
                if (contador + 1 < 57 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") {
                    fichasVoltear.push(contador);
                    continue;
                }
                else if (contador + 1 < 57 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") {
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
    //numero del cuadrado dentro del array
    numCuadrado -= 1;
    if (ficha.className === "Negra") {
        for (var i = numCuadrado; i < cuadrados.length; i++) {
            var esBordeDe = (i + 1 % 8 === 0);
            var esBordeIz = (i + 1 % 8 === 1);
            //lado derecho
            if (i + 1 < 64 && !esBordeDe && cuadrados[i + 1].children.length > 0 && cuadrados[i + 1].childNodes[0].className === "Blanca") {
                sonMovimientoValidos.push(patronCompletado(ficha, i, "de"));
            }
            //lado izquierdo
            if (i + 1 > 1 && !esBordeIz && cuadrados[i - 1].children.length > 0 && cuadrados[i - 1].childNodes[0].className === "Blanca") {
                sonMovimientoValidos.push(patronCompletado(ficha, i, "iz"));
            }
            //hacia el noreste
            if (i + 1 > 8 && !esBordeDe && cuadrados[i + 1 - 8].children.length > 0 && cuadrados[i + 1 - 8].childNodes[0].className === "Blanca") {
                sonMovimientoValidos.push(patronCompletado(ficha, i, "ne"));
            }
            //hacia arriba
            if (i + 1 > 8 && cuadrados[i - 8].children.length > 0 && cuadrados[i - 8].childNodes[0].className === "Blanca") {
                sonMovimientoValidos.push(patronCompletado(ficha, i, "a"));
            }
            //hacie el noroeste
            if (i + 1 > 9 && !esBordeIz && cuadrados[i - 1 - 8].children.length > 0 && cuadrados[i - 1 - 8].childNodes[0].className === "Blanca") {
                sonMovimientoValidos.push(patronCompletado(ficha, i, "no"));
            }
            //hacia el suroeste
            if (i + 1 < 57 && !esBordeIz && cuadrados[i - 1 + 8].children.length > 0 && cuadrados[i - 1 + 8].childNodes[0].className === "Blanca") {
                sonMovimientoValidos.push(patronCompletado(ficha, i, "so"));
            }
            // hacia el sureste
            if (i + 1 < 56 && !esBordeDe && cuadrados[i + 1 + 8].children.length > 0 && cuadrados[i + 1 + 8].childNodes[0].className === "Blanca") {
                sonMovimientoValidos.push(patronCompletado(ficha, i, "se"));
            }
            //hacia abajo
            if (i + 1 < 57 && !esBordeDe && cuadrados[i + 8].children.length > 0 && cuadrados[i + 8].childNodes[0].className === "Blanca") {
                sonMovimientoValidos.push(patronCompletado(ficha, i, "ab"));
                break;
            }
            break;
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
            var esBordeDe = (i + 1 % 8 === 0);
            var esBordeIz = (i + 1 % 8 === 1);
            //lado derecho
            if (i + 1 < 64 && !esBordeDe && cuadrados[i + 1].children.length > 0 && cuadrados[i + 1].childNodes[0].className === "Negra") {
                sonMovimientoValidos.push(patronCompletado(ficha, i, "de"));
            }
            //lado izquierdo
            if (i + 1 > 1 && !esBordeIz && cuadrados[i - 1].children.length > 0 && cuadrados[i - 1].childNodes[0].className === "Negra") {
                sonMovimientoValidos.push(patronCompletado(ficha, i, "iz"));
            }
            //hacia el noreste
            if (i + 1 > 8 && !esBordeDe && cuadrados[i + 1 - 8].children.length > 0 && cuadrados[i + 1 - 8].childNodes[0].className === "Negra") {
                sonMovimientoValidos.push(patronCompletado(ficha, i, "ne"));
            }
            //hacia arriba
            if (i + 1 > 8 && cuadrados[i - 8].children.length > 0 && cuadrados[i - 8].childNodes[0].className === "Negra") {
                sonMovimientoValidos.push(patronCompletado(ficha, i, "a"));
            }
            //hacie el noroeste
            if (i + 1 > 9 && !esBordeIz && cuadrados[i - 1 - 8].children.length > 0 && cuadrados[i - 1 - 8].childNodes[0].className === "Negra") {
                sonMovimientoValidos.push(patronCompletado(ficha, i, "no"));
            }
            //hacia el suroeste
            if (i + 1 < 57 && !esBordeIz && cuadrados[i - 1 + 8].children.length > 0 && cuadrados[i - 1 + 8].childNodes[0].className === "Negra") {
                sonMovimientoValidos.push(patronCompletado(ficha, i, "so"));
            }
            // hacia el sureste
            if (i + 1 < 56 && !esBordeDe && cuadrados[i + 1 + 8].children.length > 0 && cuadrados[i + 1 + 8].childNodes[0].className === "Negra") {
                sonMovimientoValidos[i] = patronCompletado(ficha, i, "se");
            }
            //hacia abajo
            if (i + 1 < 57 && !esBordeDe && cuadrados[i + 8].children.length > 0 && cuadrados[i + 8].childNodes[0].className === "Negra") {
                sonMovimientoValidos.push(patronCompletado(ficha, i, "ab"));
                break;
            }
            break;
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
    //El jugador 1 siempre va a ser el jugador loggeado
    //con este codigo decido quien mueve primero las fichas negras
    var numeroJugador1 = 1;
    var numeroJugador2 = 2;
    var numeroJugadorInicia = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    if (numeroJugadorInicia === numeroJugador1) {
        //inicia el jugador 1
        document.getElementById("labelFichasJugador1").innerText += " Negras";
        document.getElementById("labelTurnoJugador1").innerText += " Si";
        document.getElementById("labelFichasJugador2").innerText += "Blancas";
        document.getElementById("labelTurnoJugador2").innerText += "No";
        turnoJugador1 = true;
    }
    else {
        //inicia el jugador 2
        document.getElementById("labelFichasJugador1").innerText += "Blancas";
        document.getElementById("labelTurnoJugador1").innerText += " No";
        document.getElementById("labelFichasJugador2").innerText += "Negras";
        document.getElementById("labelTurnoJugador2").innerText += " Si";
        turnoJugador2 = true;
    }
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
    fichasNegras += 1;
    fichasBlancas += 1;
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
    fichasNegras += 1;
    fichasBlancas += 1;
}
function modoJuego(modo) {
    if (modo == "IA") {
    }
    else if (modo == "Vs") {
        colocarTablero();
        turnos();
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