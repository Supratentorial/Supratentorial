/// <reference path="../typings/angularjs/angular.d.ts" />

module contacts {
    var contactsModule: ng.IModule = angular.module('app.contacts', ['ui.bootstrap', 'ngMaterial'])
        .controller(controllers);
}