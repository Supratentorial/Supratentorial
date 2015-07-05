/// <reference path="typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="typings/angularjs/angular.d.ts" />

module app {
    export class StateConfig {
        "use strict"
        static $inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider", "adalAuthenticationServiceProvider"];

        constructor(private $stateProvider: ng.ui.IStateProvider, private $urlRouterProvider: ng.ui.IUrlRouterProvider, private $locationProvider: ng.ILocationProvider, private $httpProvider: ng.IHttpProvider, private adalAuthenticationServiceProvider: any) {
            this.$stateProvider
                .state("matters", <ng.ui.IState>{
                url: "/matters",
                templateUrl: "/html/matters/matters.html",
                controller: "MattersCtrl as vm",
                requireADLogin: true

            }).state("matters.my-matters", <ng.ui.IState>{
                url: "/matters/my-matters",
                templateUrl: "/html/matters/matters.my-matters.html",
                controller: "MattersCtrl as vm",
                requireADLogin: true

            }).state("matters.archived", <ng.ui.IState>{
                url: "/matters/archived",
                templateUrl: "/html/matters/matters.archived.html"

            }).state("view-matter-details", <ng.ui.IState>{
                url: "/matter-details/view/{matterId :int}",
                templateUrl: "html/matters/matter-details.html",
                controller: "MatterDetailsCtrl as vm"

            }).state("edit-matter-details", <ng.ui.IState>{
                url: "/matter-details/edit/{matterId:int}",
                templateUrl: "html/matters/edit-matter-details.html",
                controller: "EditMatterDetailsCtrl as vm"

            }).state("dashboard", <ng.ui.IState>{
                url: "/",
                templateUrl: "/html/dashboard/dashboardPartial.html",
                requireADLogin: true

            }).state("contacts", <ng.ui.IState>{
                url: "/contacts",
                templateUrl: "/html/contacts/contacts.html",
                controller: "ContactsCtrl as vm",
                requireADLogin: true

            }).state("contact-details", <ng.ui.IState>{
                url: "/contact-details",
                templateUrl: "html/contacts/contact-shell.html",
                controller: "ContactDetailsCtrl as vm"

            }).state("contact-details.basic", <ng.ui.IState>{
                url: "/{contactId:int}/basic",
                templateUrl: "html/contacts/contact-basic.html"

            }).state("contact-details.biographical", <ng.ui.IState>{
                url: "/{contactId:int}/biographical",
                templateUrl: "html/contacts/contact-biographical.html"

            }).state("contact-details.financial", <ng.ui.IState>{
                url: "/{contactId:int}/financial",
                templateUrl: "html/contacts/contact-financial.html"

            }).state("settings", <ng.ui.IState>{
                url: "/settings",
                templateUrl: "html/settings/settings.html",
                controller: "SettingsCtrl as vm"

            }).state("settings.users", <ng.ui.IState>{
                url: "/users",
                templateUrl: "html/settings/users.html",
                controller: "UserCtrl as vm"

            }).state("settings.user-details", <ng.ui.IState>{
                url: "/user/{userId:int}/details",
                templateUrl: "html/settings/user-details.html",
                controller: "UserDetailsCtrl as vm"

            }).state("settings.matter-types", <ng.ui.IState>{
                url: "/matter-types",
                templateUrl: "html/settings/matter-types.html"

            }).state("settings.matter-type-details", <ng.ui.IState>{
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
    }
    export var appModule: ng.IModule = angular.module("app", ["ui.router", "ui.router.tabs", "app.contacts", "app.matters", "app.settings", "app.common", "AdalAngular"]);
    appModule.config(StateConfig);
}