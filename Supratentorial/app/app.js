/// <reference path="typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="typings/angularjs/angular.d.ts" />
var app;
(function (app) {
    var StateConfig = (function () {
        function StateConfig($stateProvider, $urlRouterProvider, $locationProvider) {
            this.$stateProvider = $stateProvider;
            this.$urlRouterProvider = $urlRouterProvider;
            this.$locationProvider = $locationProvider;
            this.$stateProvider
                .state('matters', {
                url: '/matters',
                templateUrl: '/html/matters/matters.html',
                controller: 'MattersCtrl as vm'
            })
                .state('matters.my-matters', {
                url: '/matters/my-matters',
                templateUrl: '/html/matters/matters.my-matters.html',
                controller: 'MattersCtrl as vm'
            })
                .state('matters.archived', {
                url: '/matters/archived',
                templateUrl: '/html/matters/matters.archived.html',
            })
                .state('dashboard', {
                url: '/',
                templateUrl: '/html/dashboard/dashboardPartial.html'
            })
                .state('contacts', {
                url: '/contacts',
                templateUrl: '/html/contacts/contacts.html',
                controller: 'ContactsCtrl as vm'
            })
                .state('contact-details', {
                url: '/contact-details',
                templateUrl: 'html/contacts/contact-details.html',
                controller: 'ContactDetailsCtrl as vm'
            })
                .state('contact-details.basic', {
                url: '/{id:int}/basic',
                templateUrl: 'html/contacts/contact-details.basic.html'
            })
                .state('contact-details.biographical', {
                url: '/{id:int}/biographic',
                templateUrl: 'html/contacts/contact-details.biographical.html'
            })
                .state('contact-details.financial', {
                url: '/{id:int}/financial',
                templateUrl: 'html/contacts/contact-details.financial.html'
            });
            this.$locationProvider.html5Mode(true);
        }
        StateConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
        return StateConfig;
    })();
    app.StateConfig = StateConfig;
    app.appModule = angular.module('app', ['ui.router', 'ui.router.tabs', 'app.contacts', 'app.matters']);
    app.appModule.config(StateConfig);
})(app || (app = {}));
//# sourceMappingURL=app.js.map