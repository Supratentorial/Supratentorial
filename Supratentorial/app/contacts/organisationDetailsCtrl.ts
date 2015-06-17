/// <reference path="contactsservice.ts" />
/// <reference path="contactsinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angular-ui-router/angular-ui-router.d.ts" />


module contacts.controllers {
    "use strict"
    interface IOrganisationDetailsCtrl {
        organisationId: number;
        phoneOptions: string[];


        saveContact();
        mapOrganisation(): interfaces.IOrganisation;
    }

    export class OrganisationDetailsCtrl implements IOrganisationDetailsCtrl {

        organisationId: number = 0;
        organisationType: string = "Business";
        emailAddresses: interfaces.IEmailAddress[] = [];
        phoneNumbers: interfaces.IPhoneNumber[] = [];

        phoneOptions: string[]= ["Home", "Work", "Mobile", "Fax"];
        tabData: any;

        static $inject = ["contactsService", "$state"];

        constructor(private contactsService: interfaces.IContactsService, private $state: ng.ui.IStateService) {
            this.organisationId = this.$state.params["id"];
            if (this.organisationId !== 0) {
                this.contactsService.getOrganisationById(this.organisationId).then((organisation: interfaces.IOrganisation): void => {
                    this.organisationId = organisation.organisationId;
                    this.emailAddresses = organisation.emailAddresses;
                    this.phoneNumbers = organisation.phoneNumbers;
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
                    route: "organisation.basic",
                    params: {
                        id: this.organisationId
                    }
                }
            ]
        }

        //TODO: Write unit test for mapping code.
        mapOrganisation() {
            var organisation = <interfaces.IOrganisation>{
                organisationId: this.organisationId,
                phoneNumbers: this.phoneNumbers,
                emailAddresses: this.emailAddresses
            };
            return organisation;
        }

        //TODO: Display confirmation to user that contact has been saved.
        saveContact() {
            this.contactsService.saveOrganisation(this.mapOrganisation()).then((organisation: interfaces.IOrganisation): void => {
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
    angular.module('app.contacts').controller('OrganisationDetailsCtrl', contacts.controllers.OrganisationDetailsCtrl);
}