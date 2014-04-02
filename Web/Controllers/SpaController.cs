using System.IO;
using System.Net;
using System.Net.Http;
using System.Web.Hosting;
using System.Web.Http;

namespace Web.Controllers
{
    [System.Web.Mvc.AllowAnonymous]
    public sealed class SpaController : ApiController
    {
        public HttpResponseMessage Get()
        {
            var indexHtml = HostingEnvironment.MapPath("~/index.html");

            var stringContent = new StreamContent(File.OpenRead(indexHtml));
            var response = new HttpResponseMessage(HttpStatusCode.OK) { Content = stringContent };

            return response;
        }
    }
}
