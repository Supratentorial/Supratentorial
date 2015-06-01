/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="contactsservice.ts" />
/// <reference path="contactsinterfaces.ts" />

module contacts.controllers {
    "use strict"

    export class ContactsCtrl {

        searchString: string = "";
        contactsList: interfaces.IPerson[] = [];

        static $inject = ["contactsService"];
        constructor(private contactsService: interfaces.IContactsService) {
        }

        getRecentContacts() {
            this.contactsService.getRecentPeople().then((recentContacts: interfaces.IPerson[]) => {
                this.contactsList = recentContacts;
            });
        }

        searchContacts() {
            var queryString: string = "?LastName=" + this.searchString;
            this.contactsService.getPeopleByLastName(queryString).then((contactsReslt: interfaces.IPerson[]) => {
                this.contactsList = contactsReslt;
            });
        }
    }
    angular.module('app.contacts').controller('ContactsCtrl', contacts.controllers.ContactsCtrl);
}