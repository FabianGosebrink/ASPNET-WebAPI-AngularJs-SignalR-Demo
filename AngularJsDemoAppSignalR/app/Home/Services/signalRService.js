(function () {
    "use strict";

    angular
        .module("home.homeModule")
        .factory("mysignalRservice", mysignalRservice);

    mysignalRservice.$inject = ["$rootScope", "appSettings"];

    /* @ngInject */
    function mysignalRservice($rootScope, appSettings) {
        var proxy = null;

        var initialize = function() {
            //Getting the connection object
            var connection = $.hubConnection(appSettings.serverPath + "signalr");

            //Creating proxy
            this.proxy = connection.createHubProxy('MyHub');

            //Publishing an event when server pushes a message
            this.proxy.on('personAdded', function(data) {
                $rootScope.$emit("personAdded", data);
            });

            this.proxy.on('personDeleted', function(data) {
                $rootScope.$emit("personDeleted", data);
            });

            this.proxy.on('addMessage', function(data) {
                $rootScope.$emit("addMessage", data);
            });

            this.proxy.on('newCpuValue', function(data) {
                $rootScope.$emit("newCpuValue", data);
            });


            //Starting connection
            connection.start().done(function() {
                    console.log('Now connected, connection ID=' + connection.id);
                })
                .fail(function() {
                    console.log('Could not connect');
                });
        };

        var sendMessage = function (message) {
            //Invoking method defined in hub
            this.proxy.invoke('Send', message);
        };

        return {
            initialize: initialize,
            sendMessage: sendMessage
        };
    }
})();
