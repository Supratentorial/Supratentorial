/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="contactsservice.ts" />
/// <reference path="contactsinterfaces.ts" />

module contacts.controllers {
    "use strict"

    export class ContactsCtrl {

        searchString: string = "";
        contactsList: interfaces.IContactDTO[] = [];

        static $inject = ["contactsService", "$scope"];
        constructor(private contactsService: interfaces.IContactsService, private $scope : ng.IScope) {
            this.$scope.$watch(() => this.searchString,
                (newValue: string, oldValue: string) => {
                    this.searchContacts();
                });
        }

        getRecentContacts() {
            this.contactsService.getRecentContacts().then((recentContacts: interfaces.IContactDTO[]) => {
                this.contactsList = recentContacts;
            });
        }

        searchContacts() {
            if (this.searchString) {
                this.contactsService.searchContacts(this.searchString).then((contactsResult: interfaces.IContactDTO[]) => {
                    this.contactsList = contactsResult.slice();
                });
            } else {
                this.contactsList.length = 0;
            }
        }
    }
    angular.module('app.contacts').controller('ContactsCtrl', contacts.controllers.ContactsCtrl);
}