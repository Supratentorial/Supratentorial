using Microsoft.Owin;
using Owin;
using System.Configuration;
using System.Web.Http;


[assembly: OwinStartup(typeof(Supratentorial.Startup))]
namespace Supratentorial
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();
            ConfigureAuth(app);
            WebApiConfig.Register(config);
            app.UseWebApi(config);
        }

        public void ConfigureAuth(IAppBuilder app)
        {
            app.UseWindowsAzureActiveDirectoryBearerAuthentication(new Microsoft.Owin.Security.ActiveDirectory.WindowsAzureActiveDirectoryBearerAuthenticationOptions
            {
                Audience = ConfigurationManager.AppSettings["ida:ClientID"],
                Tenant = ConfigurationManager.AppSettings["ida:Tenant"]
            });
        }
    }
}