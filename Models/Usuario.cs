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
    
    public partial class Usuario
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Usuario()
        {
            this.Juego = new HashSet<Juego>();
            this.Juego1 = new HashSet<Juego>();
            this.Juego2 = new HashSet<Juego>();
            this.Juego3 = new HashSet<Juego>();
            this.Torneo = new HashSet<Torneo>();
        }
    
        public int id_usuario { get; set; }
        public int rol { get; set; }
        public string pnombre_usuario { get; set; }
        public string snombre_usuario { get; set; }
        public string apellido_usuario { get; set; }
        public string nombre_usuario { get; set; }
        public string palabra_secreta { get; set; }
        public System.DateTime fecha_nacimiento { get; set; }
        public string pais { get; set; }
        public string correo_electronico { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Juego> Juego { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Juego> Juego1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Juego> Juego2 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Juego> Juego3 { get; set; }
        public virtual Rol Rol1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Torneo> Torneo { get; set; }
    }
}
