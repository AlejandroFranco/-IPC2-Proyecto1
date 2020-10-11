using System.Web;
using System.Web.Optimization;

namespace _IPC2_IGameOthello
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
               bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                            "~/Scripts/jquery-3.5.1.min.js"));

                bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                            "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/Othello").Include(
                          "~/Scripts/Othello.js"));
            // Utilice la versión de desarrollo de Modernizr para desarrollar y obtener información. De este modo, estará
            // para la producción, use la herramienta de compilación disponible en https://modernizr.com para seleccionar solo las pruebas que necesite.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                            "~/Scripts/modernizr-*"));

                bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                          "~/Scripts/bootstrap.min.js"));

                bundles.Add(new StyleBundle("~/Content/css").Include(
                          "~/Content/bootstrap.min.css"
                        /*  "~/Content/site.css"*/));

            bundles.Add(new StyleBundle("~/Content/Othello").Include(
                      "~/Content/Othello.css"));
        }
    }
}
