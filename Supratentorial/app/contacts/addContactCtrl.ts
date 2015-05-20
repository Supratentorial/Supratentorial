/// <reference path="contactsinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
module contacts.controllers {
    "use strict"
    interface IAddContactCtrl {
        titleOptions: string[]//E.g. Mr, Mrs...
        phoneOptions: string[];//E.g. Work, mobile, home...
        title: string;
        lastName: string;
        firstName: string;
        dateOfBirthString: string;
        dateOfBirth: Date;
        saveContact(): any;

    }

    export class AddContactCtrl implements IAddContactCtrl {
        static controllerId: string = "AddContactCtrl";

        httpService: ng.IHttpService;

        title: string;
        lastName: string;
        firstName: string;
        dateOfBirthString: string;
        dateOfBirth: Date;

        phoneNumberType: string;
        email: string;
        emailAddresses: interfaces.IEmailAddress[];
        titleOptions: string[];
        phoneOptions: string[];

        static $inject = ['$http'];
        constructor(private $http: ng.IHttpService) {
            this.httpService = $http;
            this.titleOptions = ["Mr", "Mrs", "Ms", "Miss", "Master", "Doctor", "Other"]
            this.phoneOptions = ["Home", "Work", "Mobile", "Fax"]
        }

        //TODO: Find out best practice for return type for saving an entity. ? Return the entity ?Return status string
        saveContact() {
            var contact = <interfaces.IContact>{ id: 0, lastName: this.lastName, firstName: this.firstName, dateOfBirth: this.dateOfBirth };
            this.httpService.post('api/contacts', contact)
                .success(function (data, status, headers, statusText) {
                console.log("Contact saved successfullly");
            })
                .error(function () {
                console.log("Contact did not save.");
            });
            return true;
        }

        addEmail() {
            var email = <interfaces.IEmailAddress>{};
            email.email = this.email;
        }
    }
}