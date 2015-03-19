using System;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Web.Http;
using Microsoft.AspNet.SignalR;
using MicrosoftTechDaysDemoApplication.Server.Models;
using MicrosoftTechDaysDemoApplication.Server.Services;

namespace MicrosoftTechDaysDemoApplication.Server
{
    public class HomeController : ApiController
    {
        private readonly PerformanceCounter _cpuCounter = new PerformanceCounter("Processor", "% Processor Time", "_Total");
        readonly IHubContext _hubContext;

        public HomeController()
        {
            _hubContext = GlobalHost.ConnectionManager.GetHubContext<MyHub>();

            CreateTimer();
        }

        [HttpGet]
        public IHttpActionResult GetAllMyPersons()
        {
            return Ok(Singleton.Instance.Persons);
        }

        [HttpPost]
        public IHttpActionResult AddPerson([FromBody] Person person)
        {
            Person personToAdd = new Person
            {
                Id = Guid.NewGuid(),
                Age = person.Age,
                Name = person.Name
            };

            Singleton.Instance.Persons.Add(personToAdd);

            _hubContext.Clients.All.personAdded(personToAdd);

            return Ok(personToAdd);
        }

        [HttpPost]
        public IHttpActionResult DeletePerson([FromBody] Person person)
        {
            Person personToRemove = Singleton.Instance.Persons.First(x => x.Id == person.Id);

            Singleton.Instance.Persons.Remove(personToRemove);

            _hubContext.Clients.All.personDeleted(person);

            return Ok(person);
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