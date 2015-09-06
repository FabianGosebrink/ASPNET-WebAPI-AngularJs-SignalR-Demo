(function () {

    "use strict";

    var contactModule = angular
        .module("contact.contactModule", ["ngRoute"]);

    contactModule.config(contactconfig);

    contactconfig.$inject = ["$routeProvider"];

    /* @ngInject */
    function contactconfig($routeProvider) {
        $routeProvider
              .when("/contact", {
                  controller: "contact.controllers.contactController",
                  templateUrl: "app/Contact/Templates/contact.html"
              })
            .otherwise({
                redirectTo: "/"
            });
    }
})();
