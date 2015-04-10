using System;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Threading;
using System.Web.Http;
using Microsoft.AspNet.SignalR;
using MicrosoftTechDaysDemoApplication.Server.Models;
using MicrosoftTechDaysDemoApplication.Server.Services;

namespace MicrosoftTechDaysDemoApplication.Server
{
    [RoutePrefix("api")]
    public class HomeController : ApiController
    {
        private readonly PerformanceCounter _cpuCounter = new PerformanceCounter("Processor", "% Processor Time", "_Total");
        readonly IHubContext _hubContext;

        public HomeController()
        {
            _hubContext = GlobalHost.ConnectionManager.GetHubContext<MyHub>();

            CreateTimer();
        }

        public IHttpActionResult Get()
        {
            return Ok(Singleton.Instance.Persons);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody] Person person)
        {
            Person personToAdd = new Person
            {
                Id = new Random().Next(1, 1000),
                Age = person.Age,
                Name = person.Name
            };

            Singleton.Instance.Persons.Add(personToAdd);

            _hubContext.Clients.All.personAdded(personToAdd);

            return Ok(personToAdd);
        }

        [Route("home/{personId}")]
        public IHttpActionResult Delete(int personId)
        {
            Person personToRemove = Singleton.Instance.Persons.First(x => x.Id == personId);

            Singleton.Instance.Persons.Remove(personToRemove);

            _hubContext.Clients.All.personDeleted(personId);

            return StatusCode(HttpStatusCode.NoContent);
        }

        private void CreateTimer()
        {
            if (Singleton.Instance.Timer == null)
            {
                Singleton.Instance.Timer = new Timer(OnTimerElapsed, null, 3000, 1500);
            }
        }

        private void OnTimerElapsed(object sender)
        {
            var cpuValue = _cpuCounter.NextValue();
            _hubContext.Clients.All.newCpuValue(Math.Round(cpuValue, 2));
        }
    }
}