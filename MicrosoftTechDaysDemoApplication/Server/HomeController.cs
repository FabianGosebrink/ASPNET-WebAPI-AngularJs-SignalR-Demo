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
    [RoutePrefix("api/home")]
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

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult GetSingle(int id)
        {
            Person person = Singleton.Instance.Persons.FirstOrDefault(x => x.Id == id);

            if (person == null)
            {
                return NotFound();
            }
            
            return Ok(person);
        }

        [HttpPost]
        public IHttpActionResult AddPerson([FromBody] Person person)
        {
            if (person == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Person personToAdd = new Person
            {
                Id = !Singleton.Instance.Persons.Any() ? 1 : Singleton.Instance.Persons.Max(x => x.Id) + 1,
                Age = person.Age,
                Name = person.Name
            };

            Singleton.Instance.Persons.Add(personToAdd);

            _hubContext.Clients.All.personAdded(personToAdd);

            return Ok(personToAdd);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult DeletePerson(int id)
        {
            Person personToRemove = Singleton.Instance.Persons.First(x => x.Id == id);

            if (personToRemove == null)
            {
                return NotFound();
            }

            Singleton.Instance.Persons.Remove(personToRemove);

            _hubContext.Clients.All.personDeleted(personToRemove);

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