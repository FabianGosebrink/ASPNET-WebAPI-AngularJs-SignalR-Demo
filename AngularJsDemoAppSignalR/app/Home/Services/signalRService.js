(function () {
    "use strict";

    angular
        .module("home.homeModule")
        .factory("mysignalRservice", mysignalRservice);

    mysignalRservice.$inject = ["$rootScope", "appSettings"];

    /* @ngInject */
    function mysignalRservice($rootScope, appSettings) {
        var myHubProxy = null;

        var initialize = function() {

            myHubProxy = $.connection.myHub;

            $.connection.hub.logging = true;

            myHubProxy.client.personAdded = function(data) {
                $rootScope.$emit("personAdded", data);
            };

            //$.connection.hub.url = appSettings.serverPath + 'signalr';

            myHubProxy.client.personDeleted = function(data) {
                $rootScope.$emit("personDeleted", data);
            };

            myHubProxy.client.addMessage = function(data) {
                $rootScope.$emit("addMessage", data);
            };

            myHubProxy.client.newCpuValue = function(data) {
                $rootScope.$emit("newCpuValue", data);
            };

            //Starting connection
            $.connection.hub.start()
                .done(function () {
                    console.log('Now connected, connection ID=' + $.connection.hub.id);
                })
                .fail(function() {
                    console.log('Could not connect');
                });
        };

        var sendMessage = function (message) {
            myHubProxy.server.send(message);
        };

        return {
            initialize: initialize,
            sendMessage: sendMessage
        };
    }
})();
