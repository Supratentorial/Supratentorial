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
                templateUrl: '/html/contacts/contactsPartial.html',
                controller: 'ContactsCtrl as vm'
            })
                .state('addContact', {
                url: '/add-contacts',
                templateUrl: 'html/contacts/addContactPartial.html',
                controller: 'AddContactCtrl as vm'
            });
            this.$locationProvider.html5Mode(true);
        }
        StateConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
        return StateConfig;
    })();
    app_1.StateConfig = StateConfig;
    app_1.app = angular.module('app', ['ui.router', 'app.contacts', 'app.matters']);
    app_1.app.config(StateConfig);
})(app || (app = {}));
//# sourceMappingURL=app.js.map