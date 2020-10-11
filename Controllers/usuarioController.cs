using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using _IPC2_IGameOthello.Models;
using _IPC2_IGameOthello.Othello;


namespace _IPC2_IGameOthello.Controllers
{
    public class usuarioController : Controller
    {

        public OthelloIGameEntities3 db = new OthelloIGameEntities3();

        // GET: usuario
        public ActionResult Dashboard()
        {
            return View();
        }

    }
}