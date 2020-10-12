using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml.Schema;
using _IPC2_IGameOthello.Models;
using _IPC2_IGameOthello.Models.ViewModels;
using _IPC2_IGameOthello.Othello;


namespace _IPC2_IGameOthello.Controllers
{
    public class usuarioController : Controller
    {
        private readonly Random _random = new Random();
        public OthelloIGameEntities3 db = new OthelloIGameEntities3();

        // GET: usuario
        public ActionResult Dashboard()
        {
         //   int idUsuario = (int)Session["idUsuario"];
            /*  var totalFilas = db.Usuario.Where(x => x.rol == 2 ).ToList();
              int aleatorio = numeroRandom(0,totalFilas.Count);
              if (aleatorio == idUsuario){
                  aleatorio = numeroRandom(0, totalFilas.Count);
              }
              var usr2 =  db.Usuario.FirstOrDefault(u => u.id_usuario == aleatorio);
              ViewBag.usuario2 = usr2.nombre_usuario;*/
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
    }
}