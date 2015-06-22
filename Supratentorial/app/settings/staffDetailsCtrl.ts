/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../contacts/contactsservice.ts" />

module settings.controllers {
    interface IStaffDetailsCtrl {
        staffId: number;
        pageTitle: string;
    }
    export class StaffDetailsCtrl implements IStaffDetailsCtrl {
        pageTitle: string = "Edit Staff Member";
        staffId: number = 0;
        firstName: string;
        lastName: string;
        titleOptions = [{ title: "Mr" }, { title: "Mrs" }, { title: "Ms" }, { title: "Miss" }, { title: "Master" }, { title: "Doctor" }, { title: "Professor" }]
        positionOptions = [{ position: "Solicitor" }, { position: "Paralegal" }, { position: "Secretary" }]
        position: string;
        title: string;
        terminationDate: Date;
        commencementDate: Date;
        emailAddresses: interfaces.IEmailAddress[];

        static $inject = ['contactsService', '$state'];
        constructor(private contactsService: interfaces.IContactsService, private $state: ng.ui.IStateService) {
            this.staffId = this.$state.params['staffId'];
            if (this.staffId === 0) {
                this.pageTitle = "New Staff Member";
            } else {
                this.contactsService.getPersonById(this.staffId).then((person: interfaces.IPerson) : void => {
                    this.title = person.title;
                    this.firstName = person.firstName;
                    this.lastName = person.lastName;
                    this.position = person.staffProperties.position;
                    this.commencementDate = person.staffProperties.commencementDate;
                    this.terminationDate = person.staffProperties.terminationDate;
                });
            }
        }

        mapToPerson(): interfaces.IPerson {
            var staffProperties: interfaces.IStaffProperties = {
                position: this.position,
                terminationDate: this.terminationDate,
                commencementDate: this.commencementDate
            }
            var staffMember: interfaces.IPerson = {
                personId: this.staffId,
                title: this.title,
                firstName: this.firstName,
                lastName: this.lastName,
                staffProperties: staffProperties,
                emailAddresses: this.emailAddresses
            }
            return staffMember;
        }

        saveStaffMember() {
            this.contactsService.savePerson(this.mapToPerson());
            this.$state.go('settings.staff');
        }

        cancel() {
            this.$state.go('settings.staff');
        }
    }
    angular.module("app.settings").controller("StaffDetailsCtrl", settings.controllers.StaffDetailsCtrl);
}