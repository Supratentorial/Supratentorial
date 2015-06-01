/// <reference path="contactsservice.ts" />
/// <reference path="contactsinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angular-ui-router/angular-ui-router.d.ts" />


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
        saveContact();
        mapContact(): interfaces.IPerson;
    }

    export class ContactDetailsCtrl implements IContactDetailsCtrl {

        toolbarTitle: string = "";

        id: number = 0;
        title: string = "";
        lastName: string = "";
        firstName: string = "";
        middleNamesString: string = "";

        countryOfBirth: string = "";
        nationality: string = "";
        placeOfDeath: string = "";
        dateOfDeathString: string = "";

        dateOfBirthString: string = "";
        emailString: string = "";
        emailAddresses: interfaces.IEmailAddress[];
        phoneNumbers: interfaces.IPhoneNumber[];
        phoneNumberString: string = "";
        phoneNumberType: string = "";
        titleOptions: string[];
        phoneOptions: string[];
        tabData: any;

        static $inject = ["contactsService", "$state"];

        constructor(private contactsService: interfaces.IContactsService, private $state: ng.ui.IState) {
            this.id = this.$state.params.id;
            if (this.id === 0) {
                this.toolbarTitle = "New Contact";
            } else {
                this.contactsService.getPersonById(this.id).then((contact: interfaces.IPerson): void => {
                    this.firstName = contact.firstName;
                    this.lastName = contact.lastName;
                    this.title = contact.title;
                    
                });
                
            }

            this.tabData = [
                {
                    heading: "Basic Details",
                    route: "contact-details.basic",
                    params: {
                        id: this.id
                    }
                },
                {
                    heading: "Biographical",
                    route: "contact-details.biographical",
                    params: {
                        id: this.id
                    }
                },
                {
                    heading: "Financial",
                    route: "contact-details.financial",
                    parmas: {
                        id: this.id
                    }
                }
            ]

            this.titleOptions = ["Mr", "Mrs", "Ms", "Miss", "Master", "Doctor", "Other"]
            this.phoneOptions = ["Home", "Work", "Mobile", "Fax"]
            //TODO: Load email addresses from service.
            this.emailAddresses = [];
            this.phoneNumbers = [];
            if (this.emailAddresses.length === 0) {
                var email = <interfaces.IEmailAddress>{ id: 0, address: "", isPreferred: true }
                this.emailAddresses.push(email);
            }
            if (this.phoneNumbers.length === 0) {
                var phone = <interfaces.IPhoneNumber>{ id: 0, isPreferred: true, type: this.phoneOptions[2] }
                this.phoneNumbers.push(phone);
            }
        }

        //TODO: Write unit test for mapping code.
        mapContact() {
            var dateOfBirth = moment.utc(this.dateOfBirthString, "DD-MM-YYYY").toDate();

            var middleNames = this.middleNamesString.split(" ");

            var contact = <interfaces.IPerson>{
                id: 0,
                lastName: this.lastName,
                firstName: this.firstName,
                middleNames: middleNames,
                dateOfBirth: dateOfBirth,
                title: this.title,
                phoneNumbers: this.phoneNumbers,
                emailAddresses: this.emailAddresses
            };
            //Check if biographical properties exist, add them to contact if they do.
            if (this.countryOfBirth || this.placeOfDeath || this.nationality || this.dateOfDeathString) {
                var dateOfDeath = moment.utc(this.dateOfDeathString, "DD-MM-YYYY").toDate();
                var biographicalProperties = <interfaces.IBiographicalProperties>{
                    countryOfBirth: this.countryOfBirth,
                    nationality: this.nationality,
                    placeOfDeath: this.placeOfDeath,
                    dateOfDeath: dateOfDeath
                };
                contact.biographicalProperties = biographicalProperties;
            }
            return contact;
        }

        saveContact() {
            this.contactsService.savePerson(this.mapContact());
        }

        addEmail() {
            if (this.emailAddresses.length < 3) {
                var email = <interfaces.IEmailAddress>{ id: 0, address: "", isPreferred: false };
                this.emailAddresses.push(email);
            }
        }

        deleteEmail(index, email: interfaces.IEmailAddress) {
            //TODO: If id == 0 don't require save
            //TODO: If only 1 email, don't allow it to be deleted
            if (email.id === 0 && this.emailAddresses.length > 1) {
                if (index > -1) { this.emailAddresses.splice(index, 1) }
            }
        }

        addPhone() {
            if (this.phoneNumbers.length < 5) {
                var phone = <interfaces.IPhoneNumber>{ id: 0, number: null, isPreferred: false };
                this.phoneNumbers.push(phone);
            }
        }

        deletePhone(index, phone: interfaces.IPhoneNumber) {
            if (phone.id === 0 && this.phoneNumbers.length > 1) {
                if (index > -1) { this.phoneNumbers.splice(index, 1) }
            }
        }

        cancel() {
            console.log("cancel button clicked");
        }
    }
    angular.module('app.contacts').controller('ContactDetailsCtrl', contacts.controllers.ContactDetailsCtrl);
}