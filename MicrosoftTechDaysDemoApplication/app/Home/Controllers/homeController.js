"use strict";
homeModule.controller('home.controllers.homeController', [
    '$scope', 'home.services.peopleService', 'toaster', 'cfpLoadingBar', 'mysignalRservice', 'common.services.arrayHelper',
    function ($scope, peopleService, toaster, cfpLoadingBar, mysignalRservice, arrayHelper) {

        $scope.chatMessages = [];
        $scope.messageText = "";
        $scope.date = "";
        $scope.peopleService = peopleService;

        mysignalRservice.initialize();

        var getPeople = function () {
            cfpLoadingBar.start();

            peopleService.getAllPeople().then(
                function () {
                    //Success
                },
                function () {
                    //Error
                    toaster.pop("Error", "Error", "Error");
                });

            cfpLoadingBar.complete();
        };

        $scope.$parent.$on("personAdded", function (e, data) {
            if (!arrayHelper.isItemInArray(peopleService.allPeople, data)) {
                arrayHelper.addItemToArray(peopleService.allPeople, data);
            }
        });

        $scope.$parent.$on("personDeleted", function (e, data) {
            if (arrayHelper.isItemInArray(peopleService.allPeople, data)) {
                arrayHelper.removeFromArray(peopleService.allPeople, data);
            }
        });

        $scope.$parent.$on("addMessage", function (e, data) {
            $scope.$apply($scope.chatMessages.push(data));
        });

        $scope.$parent.$on("newCpuValue", function (e, data) {
            $scope.$apply($scope.cpuUsage = data);
        });

        $scope.newPerson = {};

        var _addPerson = function () {
            peopleService.addPerson($scope.newPerson)
                .then(
                    function () {
                        $scope.newPerson = null;
                        toaster.pop("success", "Success", "Person added");
                    },
                    function () {
                        //Error
                        toaster.pop("Error", "Error", "Error while adding person");
                    }
                );
        };

        var _deletePerson = function (personToDelete) {
            peopleService.deletePerson(personToDelete)
                .then(
                    function () {
                        toaster.pop("success", "Success", "Person deleted");
                    },
                    function () {
                        //Error
                        toaster.pop("Error", "Error", "Error while removing person");
                    });
        };

        var _sendChat = function () {
            mysignalRservice.sendMessage($scope.messageText);
            $scope.messageText = "";
        };

        getPeople();

        $scope.addPerson = _addPerson;
        $scope.deletePerson = _deletePerson;
        $scope.sendChat = _sendChat;
    }
]);

