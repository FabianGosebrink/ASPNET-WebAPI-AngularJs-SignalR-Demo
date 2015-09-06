(function () {

    "use strict";

    angular.module("AngularJsDemoApp",
    [
        "ngRoute",
        "ngAnimate",
        "ngResource",
        "ui.bootstrap",
        "angular-loading-bar",
        "toastr",

        "app.common",
        "home.homeModule",
        "contact.contactModule"
    ]).config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }])
        .constant("appSettings",
        {
            serverPath: "http://localhost:63047"
        });

}());
