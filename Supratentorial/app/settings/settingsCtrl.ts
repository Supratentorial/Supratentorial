/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../contacts/contactsinterfaces.ts" />

module settings.controllers {
    "use strict"
    export class SettingsCtrl {

        staffMembers: interfaces.IPerson[];
        modalOptions: ng.ui.bootstrap.IModalSettings = {
            templateUrl: "html/settings/staff-details.html",
            controller: "staffDetailsCtrl as vm",
            size: "lg",
            keyboard: false, 
            backdrop: "static"
        };

        tabData: any = [
            {
                heading: "Staff Members",
                route: "settings.staff-members"
            }, {
                heading: "Matter Types",
                route: "settings.matter-types"
            }
        ];

        static $inject = ['$modal'];
        constructor(private $modal : ng.ui.bootstrap.IModalService) {

        }

        newStaffMember() {
            this.$modal.open(this.modalOptions);
        }
    }
    angular.module("app.settings").controller("SettingsCtrl", settings.controllers.SettingsCtrl);
}