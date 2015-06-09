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
                templateUrl: '/html/matters/matters.archived.html'
            })
                .state('matter-details', {
                url: '/matter-details',
                templateUrl: 'html/matters/matter-details.html',
                controller: 'MatterDetailsCtrl as vm'
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
                .state('person', {
                url: '/people',
                templateUrl: 'html/contacts/contact-shell.html',
                controller: 'PersonDetailsCtrl as vm'
            })
                .state('person.basic', {
                url: '/{id:int}/basic',
                templateUrl: 'html/contacts/person-basic.html',
            })
                .state('person.biographical', {
                url: '/{id:int}/biographic',
                templateUrl: 'html/contacts/person-biographical.html'
            })
                .state('person.financial', {
                url: '/{id:int}/financial',
                templateUrl: 'html/contacts/person-financial.html'
            })
                .state('organisation', {
                url: '/organisations',
                templateUrl: 'html/contacts/contact-shell.html'
            }).state('organisation.basic', {
                url: '/{id:int}/baisc',
                templateUrl: 'html/contacts/organisation-basic.html'
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