/// <reference path="contactsinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/moment/moment.d.ts" />

module contacts.controllers {
    "use strict"
    interface IContactDetailsCtrl {
        titleOptions: string[];
        phoneOptions: string[];
        title: string;
        lastName: string;
        firstName: string;
        middleNamesString: string;
        dateOfBirthString: string;
        saveContact(): any;
    }

    export class ContactDetailsCtrl implements IContactDetailsCtrl {

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
        tabData: any;

        static $inject = ['$http'];
        constructor(private $http: ng.IHttpService) {
            this.tabData = [
                {
                    heading: "Basic Details",
                    route: "contact-details.basic"
                }, 
                {
                    heading: "Biographic",
                    route: "contact-details.biographical"
                }
            ]
            this.httpService = $http;
            this.titleOptions = ["Mr", "Mrs", "Ms", "Miss", "Master", "Doctor", "Other"]
            this.phoneOptions = ["Home", "Work", "Mobile", "Fax"]
            //TODO: Load email addresses from service.
            this.emailAddresses = [];
            this.phoneNumbers = [];
            if (this.emailAddresses.length === 0) {
                var email = <interfaces.IEmailAddress>{ id: 0, email: "", isPreferred: true }
                this.emailAddresses.push(email);
            }
            if (this.phoneNumbers.length === 0) {
                var phone = <interfaces.IPhoneNumber>{ id: 0, isPreferred: true, type: this.phoneOptions[2] }
                this.phoneNumbers.push(phone);
            }
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
                //TODO: Display confirmation of successful save to user.
                console.log("Contact saved successfullly");
            })
                .error(function (data, satus, headers, config) {
                //TODO: Display error to user if one occurs.
                console.log(JSON.stringify(data, null, 4));
            });
            return true;
        }

        addEmail() {
            var email = <interfaces.IEmailAddress>{ id: 0, email: "", isPreferred: false };
            this.emailAddresses.push(email);
        }

        deleteEmail(index, email: interfaces.IEmailAddress) {
            //TODO: If id == 0 don't require save
            //TODO: If only 1 email, don't allow it to be deleted
            if (email.id === 0 && this.emailAddresses.length > 1) {
                if (index > -1) { this.emailAddresses.splice(index, 1) }
            }
        }

        addPhone() {
            var phone = <interfaces.IPhoneNumber>{ id: 0, number: null, isPreferred: false };
            this.phoneNumbers.push(phone);
        }

        cancel() {
            console.log("cancel button clicked");
        }
    }
}