/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="contactsservice.ts" />
/// <reference path="contactsinterfaces.ts" />

module contacts.controllers {
    "use strict"

    export class ContactsCtrl {

        searchString: string = "";
        contactsList: interfaces.IContact[] = [];

        static $inject = ["contactsService"];
        constructor(private contactsService: interfaces.IContactsService) {
        }

        getRecentContacts() {
            this.contactsService.getRecentContacts().then((contacts: interfaces.IContact[]) => {
                this.contactsList = contacts;
            });
        }

        searchContacts() {
            var queryString: string = "?LastName=" + this.searchString;
            this.contactsService.getContactsByLastName(queryString).then((contacts: interfaces.IContact[]) => {
                this.contactsList = contacts;
            });
        }
    }
}