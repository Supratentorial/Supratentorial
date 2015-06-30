/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../contacts/contactsinterfaces.ts" />

module settings.controllers {
    "use strict"
    export class SettingsCtrl {

        tabData: any = [
            {
                heading: "Staff",
                route: "settings.users"
            }, {
                heading: "Matter Types",
                route: "settings.matter-types"
            }
        ];

        static $inject = [];
        constructor() {

        }
    }
    angular.module("app.settings").controller("SettingsCtrl", settings.controllers.SettingsCtrl);
}