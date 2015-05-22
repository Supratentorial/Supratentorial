/// <reference path="contactsinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/moment/moment.d.ts" />

module contacts.controllers {
    "use strict"
    interface IAddContactCtrl {
        titleOptions: string[]//E.g. Mr, Mrs...
        phoneOptions: string[];//E.g. Work, mobile, home...
        title: string;
        lastName: string;
        firstName: string;
        middleNamesString: string;
        dateOfBirthString: string;
        saveContact(): any;
    }

    export class AddContactCtrl implements IAddContactCtrl {
        static controllerId: string = "AddContactCtrl";

        httpService: ng.IHttpService;

        title: string = "";
        lastName: string = "";
        firstName: string = "";
        middleNamesString: string = "";

        dateOfBirthString: string = "";
        emailString: string = "";
        emailAddresses: interfaces.IEmailAddress[];
        phoneNumbers: interfaces.IPhoneNumber[];
        phoneNumberString: string = "";
        phoneNumberType: string = "";
        titleOptions: string[];
        phoneOptions: string[];

        static $inject = ['$http'];
        constructor(private $http: ng.IHttpService) {
            this.httpService = $http;
            this.titleOptions = ["Mr", "Mrs", "Ms", "Miss", "Master", "Doctor", "Other"]
            this.phoneOptions = ["Home", "Work", "Mobile", "Fax"]
            //TODO: Load email addresses from service.
            this.emailAddresses = [];
            this.phoneNumbers = [];
        }

        //TODO: Find out best practice for return type for saving an entity. ? Return the entity ?Return status string
        //TODO: Refactor into service and mapping method.
        //TODO: Write unit test for mapping code.
        saveContact() {
            var dateOfBirth = moment(this.dateOfBirthString, "DD-MM-YYYY").toDate();
            var middleNames = this.middleNamesString.split(" ");
            var currentPhoneNumber = <interfaces.IPhoneNumber>{};

            var contact = <interfaces.IContact>{
                id: 0,
                lastName: this.lastName,
                firstName: this.firstName,
                middleNames: middleNames,
                dateOfBirth: dateOfBirth,
                title: this.title,
                phoneNumbers: this.phoneNumbers,
                emailAddresses: this.emailAddresses
            };
            console.log(contact);
            this.httpService.post(
                'api/contacts',
                JSON.stringify(contact),
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .success(function (data, status, headers, statusText) {
                console.log("Contact saved successfullly");
            })
                .error(function (data, satus, headers, config) {
                console.log(JSON.stringify(data, null, 4));
            });
            return true;
        }

        addEmail() {
            var email = <interfaces.IEmailAddress>{ id: 0, email: "" };
            this.emailAddresses.push(email);
        }

        addPhone() {
            var phone = <interfaces.IPhoneNumber>{ id: 0, number: null };
            this.phoneNumbers.push(phone);
        }

        cancel() {
            console.log("cancel button clicked");
        }
    }
}