'use strict';
homeModule.factory("home.services.peopleService", [
    "$http", "$q", "common.services.arrayHelper", function ($http, $q, arrayHelper) {

        var urlPrefix = '/api/home/';
        var _allPeople = [];

        var _getAllPeople = function () {

            var deferred = $q.defer();

            $http.get(urlPrefix + "GetAllMyPersons")
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

            $http.post(urlPrefix + "AddPerson", newPersonToAdd)
                .then(function (result) {
                    // Successful
                    //var newlyCreatedPerson = result.data;
                    //arrayHelper.addItemToArray(_allPeople, newlyCreatedPerson);
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

            $http.post(urlPrefix + "DeletePerson", personToDelete)
                .then(function (result) {
                    // Successful
                    //arrayHelper.removeFromArray(_allPeople, result.data);
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