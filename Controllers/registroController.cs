using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using _IPC2_IGameOthello.Models;

namespace _IPC2_IGameOthello.Controllers
{
    public class registroController : Controller
    {

        public OthelloIGameEntities2 db = new OthelloIGameEntities2();

        // GET: registro
        public ActionResult Registro()
        {
            return View();
        }


        [HttpPost]
        public ActionResult Registro(Usuario usuario)
        {
            if (ModelState.IsValid)
            {

                Rol rol = db.Rol.FirstOrDefault(r => r.id_rol == 2);
                usuario.rol = rol.id_rol;
                db.Usuario.Add(usuario);
                db.SaveChanges();
                ViewBag.mensaje = "El usuario " + usuario.pnombre_usuario + " Fue registrado exitosamente! ";
                ModelState.Clear();
            }
            return RedirectToAction("../usuario/Dashboard");
        }


    }
}