'use strict';
homeModule.factory("home.services.peopleService", [
    "$http", "$q", function ($http, $q) {

        var url = 'http://localhost:63047/api/home/';
        var _allPeople = [];

        var _getAllPeople = function () {

            var deferred = $q.defer();

            $http.get(url)
                .then(function (result) {
                    // Successful
                    angular.copy(result.data, _allPeople);
                    deferred.resolve(result);
                },
                    function () {
                        // Error
                        deferred.reject();
                    });

            return deferred.promise;
        };

        var _addPerson = function (newPersonToAdd) {

            var deferred = $q.defer();

            $http.post(url, newPersonToAdd)
                .then(function (result) {
                    // Successful
                    // SignalR is doing the adding-Stuff
                    deferred.resolve(result);
                },
                    function () {
                        // Error
                        deferred.reject();
                    });

            return deferred.promise;
        };

        var _deletePerson = function (personToDelete) {

            var deferred = $q.defer();

            $http.delete(url + personToDelete.Id)
                .then(function (result) {
                    // Successful
                    // SignalR is doing the removing-Stuff
                    deferred.resolve(result);
                },
                    function () {
                        // Error
                        deferred.reject();
                    });

            return deferred.promise;
        };

        return {
            getAllPeople: _getAllPeople,
            addPerson: _addPerson,
            deletePerson: _deletePerson,
            allPeople: _allPeople
        }
    }
]);