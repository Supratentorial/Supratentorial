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
            //Determine if user wants to create person/company and set appropriate values to null.
            var contactId = this.$state.params["contactId"];
            this.contact = {
                addresses: [],
                emailAddresses: [{ emailId: 0, address: "", isPreferred: true, isArchived: false, dateArchived: null, contactId: contactId }],
                phoneNumbers: [{ phoneId: 0, isPreferred: true, type: this.phoneOptions[2], number: "", areaCode: "", countryCode: "", contactId: contactId }],
                type: "",
                contactId: contactId,
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
                    title: ""
                },
                contactStatus: 1
            }
            if (this.contact.contactId !== 0) {
                this.contactsService.getContactById(this.contact.contactId).then((contact: interfaces.IContact): void => {
                    this.contact = contact;
                    //Figure out contact type based on filled properties.
                    this.dateOfBirthString = moment(contact.person.dateOfBirth).format("DD-MM-YYYY");
                })
            }
            this.tabData = [
                {
                    heading: "Basic Details",
                    route: "contacts.details.basic",
                    params: {
                        contactId: this.contact.contactId
                    }
                },
                {
                    heading: "Biographical",
                    route: "contacts.details.biographical",
                    params: {
                        contactId: this.contact.contactId
                    }
                },
                {
                    heading: "Financial",
                    route: "contacts.details.financial",
                    parmas: {
                        contactId: this.contact.contactId
                    }
                }
            ]
        }


        //TODO: Display confirmation to user that contact has been saved.
        saveContact() {
            var dateOfBirth = null;
            if (this.dateOfBirthString) { dateOfBirth = moment.utc(this.dateOfBirthString, "DD-MM-YYYY").toDate(); }
            this.contact.person.dateOfBirth = dateOfBirth;
            this.contactsService.saveContact(this.contact).then((contact: interfaces.IContact): void => {
                this.contact = contact;
                this.$state.go('contacts');
            });
        }

        addEmail() {
            if (this.contact.emailAddresses.length < 3) {
                var email = <interfaces.IEmailAddress>{ emailId: 0, address: "", isPreferred: false, isArchived: false, dateArchived: null, contactId: this.contact.contactId };
                this.contact.emailAddresses.push(email);
            }
        }

        deleteEmail(index, email: interfaces.IEmailAddress) {
            if (email.emailId === 0 && this.contact.emailAddresses.length > 1) {
                if (index > -1) { this.contact.emailAddresses.splice(index, 1) }
            } else {
                email.isArchived = true;
            }
        }

        addPhone() {
            if (this.contact.phoneNumbers.length < 5) {
                var phone = <interfaces.IPhoneNumber>{ phoneId: 0, number: null, isPreferred: false, contactId: this.contact.contactId };
                this.contact.phoneNumbers.push(phone);
            }
        }

        deletePhone(index, phone: interfaces.IPhoneNumber) {
            if (phone.phoneId === 0 && this.contact.phoneNumbers.length > 1) {
                if (index > -1) { this.contact.phoneNumbers.splice(index, 1) }
            }
        }

        cancel() {
            //Todo: Prevent navigation if unsaved values.
            this.$state.go("contacts");
        }
    }
    angular.module('app.contacts').controller('ContactDetailsCtrl', contacts.controllers.ContactDetailsCtrl);
}