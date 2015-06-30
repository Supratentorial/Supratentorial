using Microsoft.Azure.ActiveDirectory.GraphClient;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Supratentorial.Utils
{
    public class AuthenticationHelper
    {
        public static async Task<string> GetAppTokenAsync() {
            var authEndPoint = ConfigurationManager.AppSettings["ida:AuthEndPoint"];
            var clientSecret = ConfigurationManager.AppSettings["ida:AppKey"];
            var clientId = ConfigurationManager.AppSettings["ida:ClientId"];
            
            var graphUrl = ConfigurationManager.AppSettings["ida:GraphUrl"];
            AuthenticationContext authContext = new AuthenticationContext(authEndPoint, false);

            ClientCredential clientCredential = new ClientCredential(clientId, clientSecret);
            AuthenticationResult authResult = await authContext.AcquireTokenAsync(graphUrl, clientCredential);
            Console.WriteLine(authResult.AccessToken);
            return authResult.AccessToken;
        }

        public static ActiveDirectoryClient GetActiveDirectoryClient() {
            Uri serviceRoot = new Uri(ConfigurationManager.AppSettings["ida:GraphApiEndPoint"]);
            ActiveDirectoryClient activeDirectoryClient = new ActiveDirectoryClient(serviceRoot, async () => await GetAppTokenAsync());
            return activeDirectoryClient;
        }
    } 
}