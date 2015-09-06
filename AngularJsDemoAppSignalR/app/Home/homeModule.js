(function () {

    "use strict";

    var homeModule = angular
        .module("home.homeModule", ["ngRoute"]);

    homeModule.config(homeconfig);

    homeconfig.$inject = ["$routeProvider"];

    /* @ngInject */
    function homeconfig($routeProvider) {
        $routeProvider
             .when("/", {
                 controller: "home.controllers.homeController",
                 controllerAs: "viewModel",
                 templateUrl: "app/Home/Templates/homeOverview.html"
             })
             .otherwise({
                 redirectTo: "/"
             });
    }
})();
