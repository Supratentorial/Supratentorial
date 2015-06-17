/// <reference path="../typings/angularjs/angular.d.ts" />

module settings.controllers {
    interface IStaffDetailsCtrl {
        staffId: number;
        pageTitle: string;
    }
    export class StaffDetailsCtrl implements IStaffDetailsCtrl{

        staffId: number = 0;
        pageTitle: string = "Edit Staff Member";
        titleOptions = [{ title: "Mr" }, { title: "Mrs" }, { title: "Ms" }, { title: "Miss" }, { title: "Master" }, { title: "Doctor" }, { title: "Professor" }]
        title: any;

        static $inject = ['contactsService'];
        constructor(private contactsService: interfaces.IContactsService) {
            if (this.staffId === 0) {
                this.pageTitle = "New Staff Member";
            }
        }

        saveStaffMember() {
            
        }
    }
    angular.module("app.settings").controller("staffDetailsCtrl", settings.controllers.StaffDetailsCtrl);
}