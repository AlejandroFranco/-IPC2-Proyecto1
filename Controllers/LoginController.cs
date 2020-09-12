using _IPC2_IGameOthello.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace _IPC2_IGameOthello.Controllers
{
    public class LoginController : Controller
    {

        public OthelloIGameEntities2 db = new OthelloIGameEntities2();

        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(Usuario usuario)
        {
            int id;
            var usr = db.Usuario.FirstOrDefault(u => u.correo_electronico == usuario.correo_electronico && u.palabra_secreta == usuario.palabra_secreta);
            if (usr != null)
            {
                if (usr.rol == 1)
                {
                    /*La id 1 corresponde a un administrador*/
                    id = 1;
                }
                else
                {
                    /*La id 1 corresponde a un jugador*/
                    id = 2;
                }
                Session["rol_idRol"] = usr.rol;
                Session["username"] = usr.nombre_usuario;
                Session["idUsuario"] = usr.id_usuario;
                return VerificarSesion(id);
            }
            else
            {
                ModelState.AddModelError("", "Verifique sus credenciales");
            }

            return View();
        }


        public ActionResult VerificarSesion(int id)
        {
            if (Session["idUsuario"] != null)
            {
                if (id == 1)
                {
                    return RedirectToAction("../administrador/DashboardAdmin");
                }
                else
                {

                    return RedirectToAction("../usuario/DashboardUsuario");
                }
            }
            else
            {
                return RedirectToAction("Login");
            }

        }

    }
}