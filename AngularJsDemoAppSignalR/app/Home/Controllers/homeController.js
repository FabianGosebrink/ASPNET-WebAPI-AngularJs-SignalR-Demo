(function () {
    "use strict";

    angular
           .module("home.homeModule")
           .controller("home.controllers.homeController", HomeController);

    HomeController.$inject = ['$scope', 'home.services.peopleService', 'toastr', 'cfpLoadingBar', 'mysignalRservice', '_'];


    function HomeController($scope, peopleService, toastr, cfpLoadingBar, mysignalRservice, _) {

        var vm = this;

        vm.peopleService = peopleService;
        vm.newPerson = {};

        vm.chatMessages = [];
        vm.messageText = "";
        vm.date = "";

        mysignalRservice.initialize();

        var getPeople = function () {
            cfpLoadingBar.start();

            peopleService.getAllPeople().then(
                function () {
                    //Success
                },
                function () {
                    //Error
                    toastr.error("An Error occured", "Error");
                }).then(function () {
                    cfpLoadingBar.complete();
                });
        };

        $scope.$parent.$on("personAdded", function (e, data) {
            var personExists = _.find(peopleService.allPeople, { Id: data.Id });

            if (!personExists) {
                peopleService.allPeople.push(data);
            }
        });

        $scope.$parent.$on("personDeleted", function (e, data) {
            var personExists = _.find(peopleService.allPeople, { Id: data.Id });

            if (personExists) {
                _.remove(peopleService.allPeople, function (person) {
                    return person.Id === data.Id;
                });
            }
        });

        $scope.$parent.$on("addMessage", function (e, data) {
            $scope.$apply(vm.chatMessages.push(data));
        });

        $scope.$parent.$on("newCpuValue", function (e, data) {
            $scope.$apply(vm.cpuUsage = data);
        });

        var _addPerson = function () {
            peopleService.addPerson(vm.newPerson)
                .then(
                    function () {
                        vm.newPerson = null;
                        toastr.success('Person added', 'Success!');
                    },
                    function (response) {
                        //Error
                        var errors = "";

                        if (response.data && response.data.ModelState) {
                            for (var key in response.data.ModelState) {
                                if (response.data.ModelState.hasOwnProperty(key)) {
                                    errors += response.data.ModelState[key] + '\r\n';
                                }
                            }
                        }
                        toastr.error(errors, "Error");
                    }
                );
        };

        var _deletePerson = function (personToDelete) {
            peopleService.deletePerson(personToDelete)
                .then(
                    function () {
                        toastr.success('Person deleted', 'Success!');
                    },
                    function () {
                        //Error
                        toastr.error("An Error occured", "Error");
                    });
        };

        var _sendChat = function () {
            mysignalRservice.sendMessage(vm.messageText);
            vm.messageText = "";
        };

        getPeople();

        vm.addPerson = _addPerson;
        vm.deletePerson = _deletePerson;
        vm.sendChat = _sendChat;
    }
})();
