document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    //esto es el numero de cuadros de ancho que tiene el tablero
    let ancho:number = 8
    let cuadrados = []
    let finJuego:boolean = false
    let turnoJugador1:boolean = true
    let turnoJugador2:boolean = false
    //create Board
    function crearTablero() {
        console.log("En el metodo")
        for (let i = 0; i < ancho * ancho; i++) {
            const cuadrado = document.createElement('div')
            //este es el identificador unico para mis 64 divs
            cuadrado.setAttribute('id', String(i + 1))
            cuadrado.classList.add("celda")
            grid.appendChild(cuadrado)
            cuadrados.push(cuadrado)
            //click normal
            cuadrado.addEventListener('click', function (e) {
                click(cuadrado)
            })

            //cntrl y click izquierdo
            cuadrado.oncontextmenu = function (e) {
                e.preventDefault()

            }

        }

    }

    crearTablero()
    function click(cuadrado) {
        if (turnoJugador1 == true) {
            var ficha = document.createElement("img");
            ficha.src = "../Imagenes/FichaNegra.png"
            if (cuadrado.hasChildNodes()) {
            } else {
                cuadrado.appendChild(ficha)
                turnoJugador1 = false
                turnoJugador2 = true
            }
        }
        else {
            var ficha = document.createElement("img");
            ficha.src = "../Imagenes/FichaBlanca.png"
            if (cuadrado.hasChildNodes()) {
            } else {
                cuadrado.appendChild(ficha)
                turnoJugador1 = true
                turnoJugador2 = false
            }

        }

    }
})

function turnos() {
    var fichas = ["negras", "blancas"]
    //El jugador 1 siempre va a ser el jugador loggeado
    //con este codigo decido quien mueve primero las fichas negras

}


function colocarTablero() {
    let celda28 = document.getElementById('28')
    let celda29 = document.getElementById('29')
    let celda36 = document.getElementById('36')
    let celda37 = document.getElementById('37')
    var fichanegra = document.createElement("img")
    var fichablanca = document.createElement("img")
    fichablanca.src = "../Imagenes/FichaBlanca.png"
    fichanegra.src = "../Imagenes/FichaNegra.png"
    celda28.appendChild(fichablanca)
    celda29.appendChild(fichanegra)
    fichanegra = document.createElement("img")
    fichablanca = document.createElement("img")
    fichablanca.src = "../Imagenes/FichaBlanca.png"
    fichanegra.src = "../Imagenes/FichaNegra.png"
    celda36.appendChild(fichanegra)
    celda37.appendChild(fichablanca)
}

function modoJuego(modo:string) {
    if (modo == "IA") {

    }
    else if (modo == "Vs"){
        colocarTablero()
        turnos()
    }
    else if (modo == "Torneo") {
        
    }
    else {
        limpiarTablero()
    }
}

function limpiarTablero() {
    var imagenes = document.getElementsByTagName('img')
    while (imagenes.length > 0) {
        imagenes[0].parentNode.removeChild(imagenes[0]);
    }
}

