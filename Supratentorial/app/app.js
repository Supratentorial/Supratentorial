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
            }).state("matter-details", {
                url: "/matter-details",
                controller: "MatterDetailsCtrl as vm"
            }).state("matter-details.view", {
                url: "/{matterId :int}/view",
                templateUrl: "html/matters/matter-details.html",
            }).state("matter-details.edit", {
                url: "/{matterId:int}/edit",
                templateUrl: "html/matters/edit-matter-details.html"
            }).state("dashboard", {
                url: "/",
                templateUrl: "/html/dashboard/dashboardPartial.html"
            }).state("contacts", {
                url: "/contacts",
                templateUrl: "/html/contacts/contacts.html",
                controller: "ContactsCtrl as vm",
                requireADLogin: true
            }).state("contact-details", {
                url: "/contact-details",
                templateUrl: "html/contacts/contact-shell.html",
                controller: "ContactDetailsCtrl as vm"
            }).state("contact-details.basic", {
                url: "/{contactId:int}/basic",
                templateUrl: "html/contacts/contact-basic.html"
            }).state("contact-details.biographical", {
                url: "/{contactId:int}/biographical",
                templateUrl: "html/contacts/contact-biographical.html"
            }).state("contact-details.financial", {
                url: "/{contactId:int}/financial",
                templateUrl: "html/contacts/contact-financial.html"
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
                clientId: "b25d39ee-e012-434a-8660-2f61f0ec764e"
            }, this.$httpProvider);
        }
        StateConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider", "adalAuthenticationServiceProvider"];
        return StateConfig;
    })();
    app.StateConfig = StateConfig;
    app.appModule = angular.module("app", ["ui.router", "ui.grid", "ui.grid.autoResize", "ui.router.tabs", "app.contacts", "app.matters", "app.settings", "app.common", "AdalAngular"]);
    app.appModule.config(StateConfig);
})(app || (app = {}));
//# sourceMappingURL=app.js.map