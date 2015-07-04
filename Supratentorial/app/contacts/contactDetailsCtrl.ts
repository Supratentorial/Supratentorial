/// <reference path="contactsservice.ts" />
/// <reference path="contactsinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angular-ui-router/angular-ui-router.d.ts" />


module contacts.controllers {
    "use strict"
    interface IContactDetailsCtrl {
        titleOptions: string[];
        phoneOptions: string[];
        dateOfBirthString: string;
        saveContact();
    }

    export class ContactDetailsCtrl implements IContactDetailsCtrl {
        contact: interfaces.IContact;
        dateOfDeathString: string = "";
        dateOfBirthString: string = "";
        titleOptions: string[] = ["Mr", "Mrs", "Ms", "Miss", "Master", "Doctor", "Other"];
        phoneOptions: string[] = ["Home", "Work", "Mobile", "Fax"];
        tabData: any;

        static $inject = ["contactsService", "$state"];

        constructor(private contactsService: interfaces.IContactsService, private $state: ng.ui.IStateService) { 
            this.contact = {
                addresses : [],
                emailAddresses: [],
                phoneNumbers: [],
                type: "",
                contactId: this.$state.params["contactId"],
                person: {
                    firstName: "",
                    dateOfBirth: null,
                    biographicalProperties: {
                        countryOfBirth: null,
                        dateOfDeath: null,
                        placeOfDeath: "",
                        nationality: ""
                    },
                    lastName: "",
                    middleNames: "",
                    title:""
                }
            }
            if (this.contact.contactId !== 0) {
                this.contactsService.getContactById(this.contact.contactId).then((contact: interfaces.IContact): void => {
                    this.contact = contact;
                    //Figure out contact type based on filled properties.
                    this.dateOfBirthString = moment(contact.person.dateOfBirth).format("DD-MM-YYYY");
                });
            }
            if (this.contact.emailAddresses.length === 0) {
                var email = <interfaces.IEmailAddress>{ id: 0, address: "", isPreferred: true }
                this.contact.emailAddresses.push(email);
            }
            if (this.contact.phoneNumbers.length === 0) {
                var phone = <interfaces.IPhoneNumber>{ id: 0, isPreferred: true, type: this.phoneOptions[2] }
                this.contact.phoneNumbers.push(phone);
            }
            this.tabData = [
                {
                    heading: "Basic Details",
                    route: "contact-details.basic",
                    params: {
                        contactId: this.contact.contactId
                    }
                },
                {
                    heading: "Biographical",
                    route: "contact-details.biographical",
                    params: {
                        contactId: this.contact.contactId
                    }
                },
                {
                    heading: "Financial",
                    route: "contact-details.financial",
                    parmas: {
                        contactId: this.contact.contactId
                    }
                }
            ]
        }

        //TODO: Write unit test for mapping code.
        mapContact(): void {
            var dateOfBirth = null;
            if (this.dateOfBirthString) { dateOfBirth = moment.utc(this.dateOfBirthString, "DD-MM-YYYY").toDate(); }
            this.contact.person.dateOfBirth = dateOfBirth;
        }

        //TODO: Display confirmation to user that contact has been saved.
        saveContact() {
            this.contactsService.saveContact(this.contact).then((contact: interfaces.IContact): void => {
                this.contact = contact;
                this.$state.go('contacts');
            });
        }

        addEmail() {
            if (this.contact.emailAddresses.length < 3) {
                var email = <interfaces.IEmailAddress>{ id: 0, address: "", isPreferred: false };
                this.contact.emailAddresses.push(email);
            }
        }

        deleteEmail(index, email: interfaces.IEmailAddress) {
            if (email.id === 0 && this.contact.emailAddresses.length > 1) {
                if (index > -1) { this.contact.emailAddresses.splice(index, 1) }
            }
        }

        addPhone() {
            if (this.contact.phoneNumbers.length < 5) {
                var phone = <interfaces.IPhoneNumber>{ id: 0, number: null, isPreferred: false };
                this.contact.phoneNumbers.push(phone);
            }
        }

        deletePhone(index, phone: interfaces.IPhoneNumber) {
            if (phone.id === 0 && this.contact.phoneNumbers.length > 1) {
                if (index > -1) { this.contact.phoneNumbers.splice(index, 1) }
            }
        }

        cancel() {
            console.log("cancel button clicked");
        }
    }
    angular.module('app.contacts').controller('ContactDetailsCtrl', contacts.controllers.ContactDetailsCtrl);
}