using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml.Schema;
using _IPC2_IGameOthello.Models;
using _IPC2_IGameOthello.Models.ViewModels;
using _IPC2_IGameOthello.Othello;
using Microsoft.Ajax.Utilities;

namespace _IPC2_IGameOthello.Controllers
{
    public class usuarioController : Controller
    {
        private readonly Random _random = new Random();
        public OthelloIGameEntities4 db = new OthelloIGameEntities4();

        // GET: usuario
        public ActionResult Dashboard()
        {
            return View();
        }
        public int numeroRandom(int min, int max)
        {
            return _random.Next(min, max);
        }

        [HttpGet]
        public ActionResult Dashboard(Usuario usuario)
        {
            ViewBag.usuario = Session["username"];
            List<Models.ViewModels.DropdownViewModel> lst = null; 
                lst = (from d in db.Usuario
                 select new DropdownViewModel
                 {
                     id_usuario = d.id_usuario,
                     nombre_usuario = d.nombre_usuario
                 }).ToList();

            List<SelectListItem> items = lst.ConvertAll(x =>
            {
                return new SelectListItem()
                {
                    Text = x.nombre_usuario,
                    Value = x.id_usuario.ToString(),
                    Selected = false
                };
            });

            ViewBag.items = items;
  
            return View();     
        }

        [HttpPost]
        public JsonResult GuardarJuego(Juego juegoGuardar) {
            // return juegoGuardar != null;
            juegoGuardar.fecha_creacionjuego = DateTime.Now;
            if (ModelState.IsValid)
            {
               db.Juego.Add(juegoGuardar);
               db.SaveChanges();
               ModelState.Clear();
            }
            //return Json("ok");
            return Json(juegoGuardar);

        }
    }
}