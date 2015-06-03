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
        middleNames: string;
        dateOfBirthString: string;
        saveContact();
        mapContact(): interfaces.IPerson;
    }

    export class ContactDetailsCtrl implements IContactDetailsCtrl {

        toolbarTitle: string = "";

        personId: number = 0;
        title: string = "";
        lastName: string = "";
        firstName: string = "";
        middleNames: string = "";

        countryOfBirth: string = "";
        nationality: string = "";
        placeOfDeath: string = "";
        dateOfDeathString: string = "";

        dateOfBirthString: string = "";
        emailString: string = "";
        emailAddresses: interfaces.IEmailAddress[] = [];
        phoneNumbers: interfaces.IPhoneNumber[] = [];
        phoneNumberString: string = "";
        phoneNumberType: string = "";
        titleOptions: string[];
        phoneOptions: string[];
        tabData: any;


        constructor(private contactsService: interfaces.IContactsService, private $state: ng.ui.IStateService) {
            this.titleOptions = ["Mr", "Mrs", "Ms", "Miss", "Master", "Doctor", "Other"]
            this.phoneOptions = ["Home", "Work", "Mobile", "Fax"]
            console.log(this.$state.params);
            this.personId = this.$state.params["id"];
            if (this.personId !== 0) {
                this.contactsService.getPersonById(this.personId).then((contact: interfaces.IPerson): void => {
                    this.firstName = contact.firstName;
                    this.lastName = contact.lastName;
                    this.title = contact.title;
                    this.dateOfBirthString = moment(contact.dateOfBirth).format("DD-MM-YYYY");
                    this.emailAddresses = contact.emailAddresses;
                    this.phoneNumbers = contact.phoneNumbers;
                    this.middleNames = contact.middleNames;
                });

            }
            if (this.emailAddresses.length === 0) {
                var email = <interfaces.IEmailAddress>{ id: 0, address: "", isPreferred: true }
                this.emailAddresses.push(email);
            }
            if (this.phoneNumbers.length === 0) {
                var phone = <interfaces.IPhoneNumber>{ id: 0, isPreferred: true, type: this.phoneOptions[2] }
                this.phoneNumbers.push(phone);
            }

            this.tabData = [
                {
                    heading: "Basic Details",
                    route: "contact-details.basic",
                    params: {
                        id: this.personId
                    }
                },
                {
                    heading: "Biographical",
                    route: "contact-details.biographical",
                    params: {
                        id: this.personId
                    }
                },
                {
                    heading: "Financial",
                    route: "contact-details.financial",
                    parmas: {
                        id: this.personId
                    }
                }
            ]         
        }

        //TODO: Write unit test for mapping code.
        mapContact() {
            var dateOfBirth = moment.utc(this.dateOfBirthString, "DD-MM-YYYY").toDate();

            var contact = <interfaces.IPerson>{
                personId: this.personId,
                lastName: this.lastName,
                firstName: this.firstName,
                middleNames: this.middleNames,
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

        //TODO: Display confirmation to user that contact has been saved.
        saveContact() {
            this.contactsService.savePerson(this.mapContact()).then((person: interfaces.IPerson): void => {
                this.$state.go('contacts');
            });
        }



        addEmail() {
            if (this.emailAddresses.length < 3) {
                var email = <interfaces.IEmailAddress>{ id: 0, address: "", isPreferred: false };
                this.emailAddresses.push(email);
            }
        }

        deleteEmail(index, email: interfaces.IEmailAddress) {
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