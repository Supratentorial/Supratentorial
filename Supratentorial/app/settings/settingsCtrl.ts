/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../contacts/contactsinterfaces.ts" />

module settings.controllers {
    "use strict"
    export class SettingsCtrl {

        staffMembers: interfaces.IPerson[];

        tabData: any = [
            {
                heading: "Staff",
                route: "settings.staff"
            }, {
                heading: "Matter Types",
                route: "settings.matter-types"
            }
        ];

        static $inject = [];
        constructor() {

        }

        newStaffMember() {
            
        }
    }
    angular.module("app.settings").controller("SettingsCtrl", settings.controllers.SettingsCtrl);
}