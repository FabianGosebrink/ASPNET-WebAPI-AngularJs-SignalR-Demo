using Microsoft.AspNet.SignalR;

namespace AngularJsDemoAppSignalR.Server
{
    public class MyHub : Hub
    {
        public void Send(string message)
        {
            Clients.All.addMessage(message);
        }
    }
}