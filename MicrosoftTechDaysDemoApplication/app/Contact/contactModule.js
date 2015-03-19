"use strict";
var contactModule = angular.module('contact.contactModule', ['ngRoute']);

contactModule.config(function($routeProvider) {
    $routeProvider
        .when("/contact", {
            controller: "contact.controllers.contactController",
            templateUrl: "/app/Contact/Templates/contact.html"
        })
        .otherwise({ redirectTo: "/" });
});