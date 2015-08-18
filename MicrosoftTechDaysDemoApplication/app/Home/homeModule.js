(function () {
    'use strict';

    var homeModule = angular.module('home.homeModule', ['ngRoute']);

    homeModule.config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "home.controllers.homeController",
                controllerAs: "viewModel",
                templateUrl: "app/Home/Templates/overview.html"
            })
            .otherwise({ redirectTo: "/" });
    });

})();