/// <reference path="typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="typings/angularjs/angular.d.ts" />
var app;
(function (app) {
    var StateConfig = (function () {
        function StateConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, adalAuthenticationServiceProvider) {
            this.$stateProvider = $stateProvider;
            this.$urlRouterProvider = $urlRouterProvider;
            this.$locationProvider = $locationProvider;
            this.$httpProvider = $httpProvider;
            this.adalAuthenticationServiceProvider = adalAuthenticationServiceProvider;
            this.$stateProvider
                .state("matters", {
                url: "/matters",
                templateUrl: "/html/matters/matters.html",
                controller: "MattersCtrl as vm",
                requireADLogin: true
            }).state("matters.my-matters", {
                url: "/matters/my-matters",
                templateUrl: "/html/matters/matters.my-matters.html",
                controller: "MattersCtrl as vm"
            }).state("matters.archived", {
                url: "/matters/archived",
                templateUrl: "/html/matters/matters.archived.html"
            }).state("matter-details", {
                url: "/matter-details",
                templateUrl: "html/matters/matter-details.html",
                controller: "MatterDetailsCtrl as vm"
            }).state("new-matter", {
                url: "/new-matter",
                templateUrl: "html/matters/new-matter.html",
                controller: "NewMatterCtrl as vm"
            }).state("dashboard", {
                url: "/",
                templateUrl: "/html/dashboard/dashboardPartial.html"
            }).state("contacts", {
                url: "/contacts",
                templateUrl: "/html/contacts/contacts.html",
                controller: "ContactsCtrl as vm",
                requireADLogin: true
            }).state("person", {
                url: "/people",
                templateUrl: "html/contacts/contact-shell.html",
                controller: "PersonDetailsCtrl as vm"
            }).state("person.basic", {
                url: "/{id:int}/basic",
                templateUrl: "html/contacts/person-basic.html"
            }).state("person.biographical", {
                url: "/{id:int}/biographical",
                templateUrl: "html/contacts/person-biographical.html"
            }).state("person.financial", {
                url: "/{id:int}/financial",
                templateUrl: "html/contacts/person-financial.html"
            }).state("organisation", {
                url: "/organisations",
                templateUrl: "html/contacts/contact-shell.html",
                controller: "OrganisationDetailsCtrl as vm"
            }).state("organisation.basic", {
                url: "/{id:int}/basic",
                templateUrl: "html/contacts/organisation-basic.html"
            }).state("settings", {
                url: "/settings",
                templateUrl: "html/settings/settings.html",
                controller: "SettingsCtrl as vm"
            }).state("settings.users", {
                url: "/users",
                templateUrl: "html/settings/users.html",
                controller: "UserCtrl as vm"
            }).state("settings.user-details", {
                url: "/user/{userId:int}/details",
                templateUrl: "html/settings/user-details.html",
                controller: "UserDetailsCtrl as vm"
            }).state("settings.matter-types", {
                url: "/matter-types",
                templateUrl: "html/settings/matter-types.html"
            }).state("settings.matter-type-details", {
                url: "/matter-type/{matterTypeId:int}/details",
                templateUrl: "html/settings/matter-type-details.html",
                controller: "MatterTypeDetailsCtrl as vm"
            });
            this.$locationProvider.html5Mode(true);
            this.adalAuthenticationServiceProvider.init({
                tenant: "supratentorial.onmicrosoft.com",
                clientId: "b25d39ee-e012-434a-8660-2f61f0ec764e",
                cacheLocation: 'localStorage'
            }, this.$httpProvider);
        }
        StateConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider", "adalAuthenticationServiceProvider"];
        return StateConfig;
    })();
    app.StateConfig = StateConfig;
    app.appModule = angular.module("app", ["ui.router", "ui.router.tabs", "app.contacts", "app.matters", "app.settings", "app.common", "AdalAngular"]);
    app.appModule.config(StateConfig);
})(app || (app = {}));
//# sourceMappingURL=app.js.map