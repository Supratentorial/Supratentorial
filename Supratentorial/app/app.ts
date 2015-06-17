/// <reference path="typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="typings/angularjs/angular.d.ts" />

module app {
    export class StateConfig {
        static $inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

        constructor(private $stateProvider: ng.ui.IStateProvider, private $urlRouterProvider: ng.ui.IUrlRouterProvider, private $locationProvider: ng.ILocationProvider) {
            this.$stateProvider
                .state('matters', <ng.ui.IState>{
                url: '/matters',
                templateUrl: '/html/matters/matters.html',
                controller: 'MattersCtrl as vm'
            })
                .state('matters.my-matters', <ng.ui.IState>{
                url: '/matters/my-matters',
                templateUrl: '/html/matters/matters.my-matters.html',
                controller: 'MattersCtrl as vm'
            })
                .state('matters.archived', <ng.ui.IState>{
                url: '/matters/archived',
                templateUrl: '/html/matters/matters.archived.html'
            })
                .state('matter-details', <ng.ui.IState>{
                url: '/matter-details',
                templateUrl: 'html/matters/matter-details.html',
                controller: 'MatterDetailsCtrl as vm'
            })
                .state('new-matter', <ng.ui.IState>{
                url: '/new-matter',
                templateUrl: 'html/matters/new-matter.html',
                controller: 'NewMatterCtrl as vm'

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
                .state('person', <ng.ui.IState>{
                url: '/people',
                templateUrl: 'html/contacts/contact-shell.html',
                controller: 'PersonDetailsCtrl as vm'
            })
                .state('person.basic', <ng.ui.IState>{
                url: '/{id:int}/basic',
                templateUrl: 'html/contacts/person-basic.html',
            })
                .state('person.biographical', <ng.ui.IState>{
                url: '/{id:int}/biographical',
                templateUrl: 'html/contacts/person-biographical.html'
            })
                .state('person.financial', <ng.ui.IState>{
                url: '/{id:int}/financial',
                templateUrl: 'html/contacts/person-financial.html'
            })
                .state('organisation', <ng.ui.IState>{
                url: '/organisations',
                templateUrl: 'html/contacts/contact-shell.html',
                controller: 'OrganisationDetailsCtrl as vm'
            }).state('organisation.basic', <ng.ui.IState>{
                url: '/{id:int}/basic',
                templateUrl: 'html/contacts/organisation-basic.html'
            }).state('settings', <ng.ui.IState>{
                url: '/settings',
                templateUrl: 'html/settings/settings.html',
                controller: 'SettingsCtrl as vm'
            }).state('settings.staff-members', <ng.ui.IState>{
                url: '/staff-members',
                templateUrl: 'html/settings/staff.html'
            }).state('settings.matter-types', <ng.ui.IState>{
                url: '/matter-types',
                templateUrl: 'html/settings/matter-types.html'
            })
            this.$locationProvider.html5Mode(true);
        }
    }
    export var appModule: ng.IModule = angular.module('app', ['ui.router', 'ui.router.tabs', 'app.contacts', 'app.matters', 'app.settings']);
    appModule.config(StateConfig);
}