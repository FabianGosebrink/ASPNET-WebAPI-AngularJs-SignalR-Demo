var homeModule = angular.module('home.homeModule', ['ngRoute']);

homeModule.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            controller: "home.controllers.homeController",
            templateUrl: "/app/Home/Templates/overview.html"
        })
        .otherwise({ redirectTo: "/" });
});