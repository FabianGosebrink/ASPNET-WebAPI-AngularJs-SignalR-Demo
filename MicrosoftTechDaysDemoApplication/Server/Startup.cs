using System;
using System.Collections.Generic;
using System.Net.Http.Formatting;
using System.Web.Http;
using Microsoft.Owin;
using MicrosoftTechDaysDemoApplication.Server.Models;
using MicrosoftTechDaysDemoApplication.Server.Services;
using Owin;

[assembly: OwinStartup(typeof(MicrosoftTechDaysDemoApplication.Server.Startup))]

namespace MicrosoftTechDaysDemoApplication.Server
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
            //app.UseWelcomePage();
            var config = new HttpConfiguration();

            config.Formatters.Clear();
            config.Formatters.Add(new JsonMediaTypeFormatter());

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { action = RouteParameter.Optional, id = RouteParameter.Optional }
            );

            app.UseWebApi(config);
            app.MapSignalR();

            //ADD DUMMY DATA
            IList<Person> persons = new List<Person>();
            persons.Add(new Person() { Id = Guid.NewGuid(), Age = 34, Name = "Claudio" });
            persons.Add(new Person() { Id = Guid.NewGuid(), Age = 28, Name = "Fabi" });

            Singleton.Instance.Persons = new List<Person>(persons);
        }
    }
}
