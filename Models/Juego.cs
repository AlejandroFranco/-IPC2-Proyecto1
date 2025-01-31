//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace _IPC2_IGameOthello.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Juego
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Juego()
        {
            this.DetalleJuego = new HashSet<DetalleJuego>();
            this.DetalleTorneo = new HashSet<DetalleTorneo>();
        }
    
        public int id_juego { get; set; }
        public Nullable<int> ganador { get; set; }
        public Nullable<System.DateTime> fecha_creacionjuego { get; set; }
        public Nullable<int> tipo_juego { get; set; }
        public Nullable<bool> empate { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DetalleJuego> DetalleJuego { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DetalleTorneo> DetalleTorneo { get; set; }
        public virtual Usuario Usuario { get; set; }
        public virtual TipoJuego TipoJuego { get; set; }
    }
}
