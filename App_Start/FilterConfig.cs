using System.Web;
using System.Web.Mvc;

namespace _IPC2_IGameOthello
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
