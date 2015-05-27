/// <reference path="typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="typings/angularjs/angular.d.ts" />

module app {
    export class StateConfig {
        static $inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

        constructor(private $stateProvider: ng.ui.IStateProvider, private $urlRouterProvider: ng.ui.IUrlRouterProvider, private $locationProvider: ng.ILocationProvider) {
            this.$stateProvider
                .state('matters', <ng.ui.IState>{
                url: '/matters',
                templateUrl: '/html/matters/mattersPartial.html'
            })
                .state('dashboard', <ng.ui.IState>{
                url: '/',
                templateUrl: '/html/dashboard/dashboardPartial.html'
            })
                .state('contacts', <ng.ui.IState>{
                url: '/contacts',
                templateUrl: '/html/contacts/contacts.html',
                controller: 'ContactsCtrl as vm'
            })
                .state('contact-details', <ng.ui.IState>{
                url: '/contact-details',
                templateUrl: 'html/contacts/contact-details.html',
                controller: 'ContactDetailsCtrl as vm'
            })
                .state('contact-details.basic', <ng.ui.IState>{
                url: '/{id:int}/basic',
                templateUrl: 'html/contacts/contact-details.basic.html'
            })
                .state('contact-details.biographical', <ng.ui.IState>{
                url: '/{id:int}/biographic',
                templateUrl: 'html/contacts/contact-details.biographical.html'
                })
                .state('contact-details.financial', <ng.ui.IState>{
                url: '/{id:int}/financial',
                templateUrl: 'html/contacts/contact-details.financial.html'
            })
            this.$locationProvider.html5Mode(true);
        }
    }
    export var app: ng.IModule = angular.module('app', ['ui.router', 'ui.router.tabs', 'app.contacts', 'app.matters']);
    app.config(StateConfig);
}