let cuadrados = [];
var audio = new Audio("../Sonidos/ficha.mp3");
let ancho: number = 8;

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    //esto es el numero de cuadros de ancho que tiene el tablero
    //create Board
    function crearTablero() { 
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
    document.getElementById("lblJugador2").innerText = "";
    document.getElementById("lblJugador2").innerText =  (texto + opc.text);
}

function cederElTurno(jugador:string) {
    if (jugador === "jugador1") {
        posiblesMovimientosJugador1 = false;
        turnoJugador2 = true;
        turnoJugador1 = false;
        document.getElementById("labelTurnoJugador2").innerText = "Turno: Si";
        document.getElementById("labelTurnoJugador1").innerText = "Turno: No";
        iniciarTemporizador();
    } else {
        turnoJugador1 = true;
        turnoJugador2 = false;
        document.getElementById("labelTurnoJugador1").innerText = "Turno: Si";
        document.getElementById("labelTurnoJugador2").innerText = "Turno: No";
        iniciarTemporizador();
        posiblesMovimientosJugador2 = false;
    }
    

}
function click(cuadrado: HTMLDivElement) {
    if (!finDelJuego()) {
        if (turnoJugador1 == true) {
            iniciarTemporizador();
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
            } else {
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
        else {
            iniciarTemporizador();
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

            } else {
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
}

function guardarArchivo() {
    var entrada = document.getElementById("cargarArchivo") as HTMLInputElement
    entrada.addEventListener('change', function (e) {

    },false)

}
function cargarArchivo() {
    var entrada = document.getElementById("cargarArchivo") as HTMLInputElement
    entrada.addEventListener('change', function (e) {
        const lector = new FileReader();
        lector.onload = function () {
            var xmlEntrada = lector.result;

        }
        lector.readAsText(entrada.files[0])
    },false)
}

function actualizarPunteo() {
    document.getElementById("labelPunteoJ1").innerText = "Punteo: " + fichasNegras;
    document.getElementById("labelPunteoJ2").innerText = "Punteo: " + fichasBlancas;
}

var posiblesMovimientosJugador1 = true;
var posiblesMovimientosJugador2 = true;

function guardarJuego(resultado: string ) {
    var tipoJuego: number;
    var ganador: number;
    var empate: number;

    if (modalidad == "VS") {
        tipoJuego = 1;
    }
    else if (modalidad == "IA") {
        tipoJuego = 2;
    }
    else if (modalidad == "Torneo") {
        tipoJuego = 3;
    } else { }


    if (resultado == "empate") {
        empate = 1
        ganador = -1;
    } else if (resultado == "negras") {
        empate = 0;
        var usrname: string;
        
        if (document.getElementById("labelFichasJugador1").innerText.search("Negras")>-1) {
            usrname = document.getElementById("lblJugador1").innerText.replace("Jugador1:", "");
        } else {
            usrname = document.getElementById("lblJugador2").innerText.replace("Jugador2:","");
        }

        $.ajax({
            url: "/usuario/GetIdJugador",
            type: "POST",
            dataType: "json",
            data: { nombreUsuario: usrname.trim()},
            success: function (datos) {
            alert("datos")
             ganador = datos
            }, error: function () {
                alert("Ocurrió un error")
            }
        });
    } else {
       //ganan las blancas
        empate = 0;
            
    }



    var juego = {
        id_juego: '',
        ganador: ganador.toString(),
        fecha_creacionjuego: '',
        tipo_juego: tipoJuego.toString(),
        empate: empate.toString()
    };

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ juegoGuardar: juego }),
        dataType: "json",
        url: "/usuario/GuardarJuego",
        success: function (msg) {
            alert('Juego guardado exitosamente');
        }, error: function () {
            alert("Ocurrió un error al guardar la partida")
        }
    });
}


function finDelJuego():boolean {
    var contador:number = 0
    for (var i = 0; i < cuadrados.length; i++) {
        if (cuadrados[i].children.length > 0) {
            contador++;
        }
    }
    if ((!posiblesMovimientosJugador1 || !posiblesMovimientosJugador2 )) {
        if (fichasBlancas > fichasNegras) {
            window.alert("Ganan las blancas")
            guardarJuego("blancas");
            return true;
        } else if (fichasBlancas === fichasNegras) {
            window.alert("Empate!");
            guardarJuego("empate");
            return true;
        } else {
            window.alert("Ganan las negras")
            guardarJuego("negras");
            return true;
        }
    } else {
            console.log("Juego no terminado")
    return false
    }
}
var cronometroJugador1;
var cronometroJugador2;
var contadorMinutosJugador1:number = 0;
var contadorSegundosJugador1: number = 0;
var contadorMinutosJugador2: number = 0;
var contadorSegundosJugador2: number = 0;
var cronometroEncendidoJugador1: boolean = false;
var cronometroEncendidoJugador2: boolean = false;


function detenerTemporizador(jugador:string) {
    if (jugador === "jugador1") {
        clearTimeout(cronometroJugador1)
        cronometroEncendidoJugador1 = false;
    } else {
        clearTimeout(cronometroJugador2)
        cronometroEncendidoJugador2 = false;
    }
}

function iniciarTemporizador() {
    //si el cronometro no está inciado entonces lo inicio
    // si es el turno del jugador 1 y su cronometro no está corriendo
    if (!cronometroEncendidoJugador1 || !cronometroEncendidoJugador2) {
        var jugador = document.getElementById("labelTurnoJugador1").innerText;
        if (jugador.search("Si") > -1) {
            detenerTemporizador("jugador2");
            cronometroEncendidoJugador1 = true;
            cronometroEncendidoJugador2 = false;
            //ejecuto este codigo cada 1 segundo a menos que se detenga
            if (contadorSegundosJugador1 == 60) {
                contadorSegundosJugador1 = 0;
                contadorMinutosJugador1++;
                document.getElementById("minutosJugador1").innerHTML = contadorMinutosJugador1.toString();
                if (contadorMinutosJugador1 == 60) {
                    contadorMinutosJugador1 = 0;
                }
            }
            document.getElementById("segundosJugador1").innerHTML = contadorSegundosJugador1.toString();
            contadorSegundosJugador1 += 1;
            cronometroJugador1 = setTimeout(iniciarTemporizador, 1000)
        } else {
            detenerTemporizador("jugador1")
            cronometroEncendidoJugador2 = true;
            if (contadorSegundosJugador2 == 60) {
                contadorSegundosJugador2 = 0;
                contadorMinutosJugador2++;
                document.getElementById("minutosJugador2").innerHTML = contadorMinutosJugador2.toString();
                if (contadorMinutosJugador2 == 60) {
                    contadorMinutosJugador2 = 0;
                }
            }
            document.getElementById("segundosJugador2").innerHTML = contadorSegundosJugador2.toString();
            contadorSegundosJugador2 += 1;
            cronometroJugador2 = setTimeout(iniciarTemporizador, 1000)

        }
    }
  }



function voltearFichas(fichasVoltear: number[], color: string) {
    if(color === "Negra") {
        for (var i = 0; i < fichasVoltear.length; i++) {
            var img = cuadrados[fichasVoltear[i]].children[0] as HTMLImageElement;
            img.src = "../Imagenes/FichaNegra.png";
            img.className = "Negra";
            fichasNegras+=1;
            fichasBlancas -= 1;
        }
        fichasVoltear  = []
    } else {
        for (var i = 0; i < fichasVoltear.length; i++) {
            var img = cuadrados[fichasVoltear[i]].children[0] as HTMLImageElement;
            img.src = "../Imagenes/FichaBlanca.png";
            img.className = "Blanca";
            fichasBlancas += 1;
            fichasNegras -= 1;
        }
        fichasVoltear = []
    }

}

let turnoJugador1: boolean = false;
let turnoJugador2: boolean = false;
var fichasNegras: number = 0;
var fichasBlancas: number = 0;
var contadorIdsFichas:number = 1

//el patron se completa como negra blanca blanca ...negra o al revés
function patronCompletado(ficha: HTMLImageElement, contador: number, direccion: string): boolean{
    var fichasVoltear: number[] = []
    if (ficha.className === "Negra") {
        var patronEncontrado: boolean = true
        while (patronEncontrado) {
            const esBordeDe = ((contador + 1) % 8 === 0);
            const esBordeIz = ((contador + 1) % 8 === 1);
            if (direccion === "a") {         
            //el contador inicialmente es el numero dentro del array de cuadrados del cuadrado sobre el que se hizo click originalmente
                //hacia arriba
                contador = contador - 8
                if (contador + 1 > 8 && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") { fichasVoltear.push(contador ); continue }
                else if (contador + 1  > 8 && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") { voltearFichas(fichasVoltear, "Negra"); return true }
                else { return false }

            } else if (direccion === "ab") {
                //hacia abajo
                contador = contador+8
                if (contador + 1  < 57 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador ].childNodes[0].className === "Blanca") { fichasVoltear.push(contador ); continue }
                else if (contador + 1  < 57 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador ].childNodes[0].className === "Negra") { voltearFichas(fichasVoltear, "Negra"); return true }
                else { return false }


            }else  if (direccion === "de") {
                //lado derecho 
                contador = contador+1
                if (contador + 1  < 64 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") { fichasVoltear.push(contador ); continue }
                else if (contador + 1 < 64 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") { voltearFichas(fichasVoltear, "Negra"); return true }
                else { return false }
            }
            else if (direccion === "iz") {
                //lado izquierdo
                contador = contador-1
                if (contador + 1  > 1 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") { fichasVoltear.push(contador); continue }
                else if (contador + 1 > 1 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") { voltearFichas(fichasVoltear, "Negra"); return true }
                else { return false }
            }
            else if (direccion === "ne") {
                //hacia el noreste
                contador = contador+1-8
                if (contador + 1  > 8 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") { fichasVoltear.push(contador); continue }
                else if (contador + 1  > 8 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") { voltearFichas(fichasVoltear, "Negra"); return true }
                else { return false }
            }
          else  if (direccion === "no") {
                //hacie el noroeste
                contador = contador-1-8
                if (contador + 1  > 9 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") { fichasVoltear.push(contador ); continue }
                else if (contador + 1  > 9 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador ].childNodes[0].className === "Negra") { voltearFichas(fichasVoltear, "Negra"); return true }
                else { return false }
            }

            else if (direccion === "se") {
                // hacia el sureste
                contador = contador+1+8
                if (contador + 1 < 56 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") { fichasVoltear.push(contador); continue }
                else if (contador + 1 < 56 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador ].childNodes[0].className === "Negra") { voltearFichas(fichasVoltear, "Negra"); return true }
                else { return false }
            }

           else if (direccion === "so") {
                //hacia el suroeste
                contador = contador-1+8
                if (contador + 1  < 57 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador ].childNodes[0].className === "Blanca") { fichasVoltear.push(contador ); continue }
                else if (contador + 1 < 57 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") { voltearFichas(fichasVoltear, "Negra"); return true }
                else { return false }
            }

        }
    }else {
    var patronEncontrado:boolean = true
        while (patronEncontrado) {
            const esBordeDe = ((contador+1) % 8 === 0);
            const esBordeIz = ((contador+1) % 8 === 1);
                //lado derecho
                if (direccion === "a") {
                    //hacia arriba
                    contador = contador - 8;
                    if (contador + 1 > 8 && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") { fichasVoltear.push(contador); continue }
                    else if (contador + 1 > 8 && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") { voltearFichas(fichasVoltear, "Blanca");  return true }
                    else { return false }
                } else if (direccion === "ab") {
                    //hacia abajo
                    contador = contador + 8;
                    if (contador + 1  < 57 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") { fichasVoltear.push(contador); continue }
                    else if (contador + 1 < 57 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className ===   "Blanca") { voltearFichas(fichasVoltear, "Blanca");return true }
                    else { return false }


                }else  if (direccion === "de") {
                    //lado derecho 
                    contador = contador + 1;
                    if (contador + 1 < 64 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") { fichasVoltear.push(contador); continue }
                    else if (contador + 1 < 64 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") { voltearFichas(fichasVoltear, "Blanca");  return true }
                    else { return false }
                }
                else if (direccion === "iz") {
                    //lado izquierdo
                    contador = contador -1
                    if (contador + 1 > 1 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") { fichasVoltear.push(contador); continue }
                    else if (contador + 1  > 1 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") { voltearFichas(fichasVoltear, "Blanca"); return true }
                    else { return false }
                }
                else if (direccion === "ne") {
                    //hacia el noreste
                    contador = contador + 1 - 8
                    if (contador + 1 > 8 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") { fichasVoltear.push(contador); continue }
                    else if (contador + 1  > 8 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") { voltearFichas(fichasVoltear, "Blanca");  return true }
                    else { return false }
                }
                else if (direccion === "no") {

                    //hacie el noroeste
                    contador = contador - 1 - 8
                    if (contador + 1 > 9 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") { fichasVoltear.push(contador); continue }
                    else if (contador + 1 > 9 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") { voltearFichas(fichasVoltear, "Blanca");  return true }
                    else { return false }
                }

                else if (direccion === "se") {
                    contador = contador + 1 + 8
                    // hacia el sureste
                    if (contador + 1  < 56 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") { fichasVoltear.push(contador); continue }
                    else if (contador + 1  < 56 && !esBordeDe && cuadrados[contador].children.length > 0 && cuadrados[contador ].childNodes[0].className === "Blanca") { voltearFichas(fichasVoltear, "Blanca");  return true }
                    else { return false }
                }

               else  if (direccion === "so") {
                    //hacia el suroeste
                    contador = contador - 1 + 8
                    if (contador + 1 < 57 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Negra") { fichasVoltear.push(contador); continue }
                    else if (contador + 1 < 57 && !esBordeIz && cuadrados[contador].children.length > 0 && cuadrados[contador].childNodes[0].className === "Blanca") { voltearFichas(fichasVoltear, "Blanca");  return true }
                    else { return false }
                }
           }
        }
    }

function esMovimientoValido(cuadrado: HTMLDivElement, ficha: HTMLImageElement): boolean {
    //reviso horizontalmente
    var numCuadrado: number = +cuadrado.id;
    var sonMovimientoValidos: boolean[] = []
    //numero del cuadrado dentro del array
    numCuadrado -= 1;
    if (ficha.className === "Negra") {
        for (let i = numCuadrado; i < cuadrados.length; i++) {
            const esBordeDe = ((i + 1) % 8 === 0);
            const esBordeIz = ((i + 1) % 8 === 1);
                //lado derecho
                 if (i+1 < 64 && !esBordeDe &&  cuadrados[i + 1].children.length > 0 && cuadrados[i + 1].childNodes[0].className === "Blanca") { sonMovimientoValidos.push(patronCompletado(ficha, i,"de")) }
                //lado izquierdo
                 if (i+1 > 1 && !esBordeIz && cuadrados[i - 1].children.length > 0 && cuadrados[i - 1].childNodes[0].className === "Blanca") { sonMovimientoValidos.push ( patronCompletado(ficha, i,"iz") )}
                //hacia el noreste
                 if (i+1 > 8 && !esBordeDe && cuadrados[i + 1 - 8].children.length > 0  && cuadrados[i + 1 - 8].childNodes[0].className === "Blanca") { sonMovimientoValidos.push (patronCompletado(ficha, i,"ne") )}
                //hacia arriba
                 if (i+1 > 8 && cuadrados[i - 8].children.length > 0 && cuadrados[i - 8].childNodes[0].className === "Blanca") { sonMovimientoValidos.push( patronCompletado(ficha, i,"a") )}
                //hacie el noroeste
                 if (i+1 > 9 && !esBordeIz && cuadrados[i - 1 - 8].children.length > 0 && cuadrados[i - 1 - 8].childNodes[0].className === "Blanca") { sonMovimientoValidos.push( patronCompletado(ficha, i,"no") )}
                //hacia el suroeste
                 if (i+1 < 57 && !esBordeIz && cuadrados[i - 1 + 8].children.length > 0 && cuadrados[i - 1 + 8].childNodes[0].className === "Blanca") { sonMovimientoValidos.push( patronCompletado(ficha, i,"so") )}
                // hacia el sureste
                 if (i+1 < 56 && !esBordeDe && cuadrados[i + 1 + 8].children.length > 0 && cuadrados[i + 1 + 8].childNodes[0].className === "Blanca") { sonMovimientoValidos.push(patronCompletado(ficha, i ,"se")) }
                //hacia abajo
                 if (i+1 < 57 && !esBordeDe && cuadrados[i + 8].children.length > 0 && cuadrados[i + 8].childNodes[0].className === "Blanca") { sonMovimientoValidos.push(patronCompletado(ficha, i, "ab")); break; }
            break;
        }
        if (sonMovimientoValidos.indexOf(true)>-1) {
        return true
        } else {
        return false
        }
    } else {
        //numCuadrado es el numero de div clickeado dentro del array de divs
        for (let i = numCuadrado; i < cuadrados.length; i++) {
            const esBordeDe = ((i+1) % 8 === 0);
            const esBordeIz = ((i+1) % 8 === 1);
            //lado derecho
            if (i+1 < 64 && !esBordeDe && cuadrados[i + 1].children.length > 0 && cuadrados[i + 1].childNodes[0].className === "Negra") { sonMovimientoValidos.push( patronCompletado(ficha, i,"de") )}
            //lado izquierdo
             if (i+1 > 1 && !esBordeIz && cuadrados[i - 1].children.length > 0 && cuadrados[i - 1].childNodes[0].className === "Negra") { sonMovimientoValidos.push( patronCompletado(ficha, i,"iz") )}
            //hacia el noreste
             if (i+1 > 8 && !esBordeDe && cuadrados[i + 1 - 8].children.length > 0 && cuadrados[i + 1 - 8].childNodes[0].className === "Negra") { sonMovimientoValidos.push( patronCompletado(ficha, i,"ne") )}
            //hacia arriba
             if (i+1 > 8 && cuadrados[i - 8].children.length > 0 && cuadrados[i - 8].childNodes[0].className === "Negra") { sonMovimientoValidos.push( patronCompletado(ficha, i,"a")) }
            //hacie el noroeste
             if (i+1 > 9 && !esBordeIz && cuadrados[i - 1 - 8].children.length > 0 && cuadrados[i - 1 - 8].childNodes[0].className === "Negra") { sonMovimientoValidos.push( patronCompletado(ficha, i,"no") )}
            //hacia el suroeste
             if (i+1 < 57 && !esBordeIz && cuadrados[i - 1 + 8].children.length > 0 && cuadrados[i - 1 + 8].childNodes[0].className === "Negra") { sonMovimientoValidos.push( patronCompletado(ficha, i,"so") )}
            // hacia el sureste
             if (i+1 < 56 && !esBordeDe && cuadrados[i + 1 + 8].children.length > 0 && cuadrados[i + 1 + 8].childNodes[0].className === "Negra") { sonMovimientoValidos[i] = patronCompletado(ficha, i,"se") }
            //hacia abajo
             if (i+1 < 57 && !esBordeDe && cuadrados[i + 8].children.length > 0 && cuadrados[i + 8].childNodes[0].className === "Negra") { sonMovimientoValidos.push(patronCompletado(ficha, i, "ab")); break }
            break;
        }
        if (sonMovimientoValidos.indexOf(true) > -1) {
            return true
        } else {
            return false
        }
    }
}

    function turnos() {
        //El jugador 1 siempre va a ser el jugador loggeado
        //con este codigo decido quien mueve primero las fichas negras
        var numeroJugador1: number = 1;
        var numeroJugador2: number = 2;
        var numeroJugadorInicia = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        if (numeroJugadorInicia === numeroJugador1) {
                //inicia el jugador 1
            document.getElementById("labelFichasJugador1").innerText += " Negras"
            document.getElementById("labelTurnoJugador1").innerText += " Si";
            document.getElementById("labelFichasJugador2").innerText += "Blancas"
            document.getElementById("labelTurnoJugador2").innerText += "No";
            turnoJugador1 = true;
            iniciarTemporizador();
        } else {
                //inicia el jugador 2
            document.getElementById("labelFichasJugador1").innerText += "Blancas"
            document.getElementById("labelTurnoJugador1").innerText += " No";
            document.getElementById("labelFichasJugador2").innerText += "Negras"
            document.getElementById("labelTurnoJugador2").innerText += " Si";
            turnoJugador2 = true;
            iniciarTemporizador();
        }
    }


function colocarTablero() {
        let celda28 = document.getElementById('28');
        let celda29 = document.getElementById('29');
        let celda36 = document.getElementById('36');
        let celda37 = document.getElementById('37');
        var fichanegra = document.createElement("img");
        var fichablanca = document.createElement("img");
        fichanegra.setAttribute('id',"img"+ String(contadorIdsFichas++));
        fichablanca.setAttribute('id',"img" + String(contadorIdsFichas++));
        fichasNegras+=1;
        fichasBlancas += 1;
        fichablanca.src = "../Imagenes/FichaBlanca.png";
        fichablanca.className ="Blanca";
        fichanegra.src = "../Imagenes/FichaNegra.png";
        fichanegra.className = "Negra";
        celda28.appendChild(fichablanca);
        celda29.appendChild(fichanegra);
        fichanegra = document.createElement("img");
        fichablanca = document.createElement("img");
        fichanegra.setAttribute('id',"img"+ String(contadorIdsFichas++));
        fichablanca.setAttribute('id', "img"+String(contadorIdsFichas++));
        fichablanca.src = "../Imagenes/FichaBlanca.png";
        fichablanca.className = "Blanca";
        fichanegra.src = "../Imagenes/FichaNegra.png";
        fichanegra.className = "Negra";
        celda36.appendChild(fichanegra);
        celda37.appendChild(fichablanca);
        fichasNegras += 1;
        fichasBlancas += 1;

    }
var modalidad:string = "";

function modoJuego(modo: string) {
    modalidad += modo;
        if (modo == "IA") {

        }
        else if (modo == "Vs") {
            colocarTablero();
            turnos()
        }
        else if (modo == "Torneo") {

        }
        else if (modo=="Xtream") {

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
