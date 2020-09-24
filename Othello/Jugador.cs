using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _IPC2_IGameOthello.Othello
{
    public class Jugador
    {

        public Jugador() { }

        public List<Ficha> fichas { get; set; }
        public int id_jugador { get; set; }

        public Boolean turno { get; set; }

        public Jugador(List<Ficha> fichas, int id_jugador, bool turno)
        {
            this.fichas = fichas;
            this.id_jugador = id_jugador;
            this.turno = turno;
        }
    }
}