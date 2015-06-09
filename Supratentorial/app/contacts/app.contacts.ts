/// <reference path="contactsservice.ts" />
/// <reference path="contactsctrl.ts" />
/// <reference path="persondetailsctrl.ts" />
/// <reference path="contactsinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />

module contacts {
    var contactsModule: ng.IModule = angular.module('app.contacts', ['ui.bootstrap', 'ui.router']);
}