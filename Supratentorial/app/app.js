/// <reference path="typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="typings/angularjs/angular.d.ts" />
var app;
(function (app_1) {
    var StateConfig = (function () {
        function StateConfig($stateProvider, $urlRouterProvider, $locationProvider) {
            this.$stateProvider = $stateProvider;
            this.$urlRouterProvider = $urlRouterProvider;
            this.$locationProvider = $locationProvider;
            this.$stateProvider
                .state('matters', {
                url: '/matters',
                templateUrl: '/html/matters/mattersPartial.html'
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
                url: '/basic',
                templateUrl: 'html/contacts/contact-details.basic.html'
            })
                .state('contact-details.biographic', {
                url: '/biographic',
                templateUrl: 'html/contacts/contact-details.biographic.html'
            });
            this.$locationProvider.html5Mode(true);
        }
        StateConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
        return StateConfig;
    })();
    app_1.StateConfig = StateConfig;
    app_1.app = angular.module('app', ['ui.router', 'ui.router.tabs', 'app.contacts', 'app.matters']);
    app_1.app.config(StateConfig);
})(app || (app = {}));
//# sourceMappingURL=app.js.map