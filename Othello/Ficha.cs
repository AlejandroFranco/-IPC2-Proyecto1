using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _IPC2_IGameOthello.Othello
{
    public class Ficha
    {
        public Ficha(string colorFicha, float coordX, float coordY, int jugador)
        {
            this.colorFicha = colorFicha;
            this.coordX = coordX;
            this.coordY = coordY;
            this.jugador = jugador;
        }

        public string colorFicha { get; set; }
        public float coordX { get; set; }
        public float coordY { get; set; }
        public int jugador {get; set;}

        public Ficha() { }

    }
}