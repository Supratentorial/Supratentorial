using Owin;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Supratentorial
{
    public partial class Startup
    {
        public void ConfigureAuth(IAppBuilder app) {
            app.UseWindowsAzureActiveDirectoryBearerAuthentication(new Microsoft.Owin.Security.ActiveDirectory.WindowsAzureActiveDirectoryBearerAuthenticationOptions
            {
                Audience = ConfigurationManager.AppSettings["ida:Audience"],
                Tenant = ConfigurationManager.AppSettings["ida:Tenant"]
            });
        }
    }
}