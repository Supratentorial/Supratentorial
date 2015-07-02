/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="contactsservice.ts" />
/// <reference path="contactsinterfaces.ts" />

module contacts.controllers {
    "use strict"

    export class ContactsCtrl {

        searchString: string = "";
        contactsList: interfaces.IPerson[] = [];

        static $inject = ["contactsService", "$scope"];
        constructor(private contactsService: interfaces.IContactsService, private $scope : ng.IScope) {
            this.$scope.$watch(() => this.searchString,
                (newValue: string, oldValue: string) => {
                    this.searchContacts();
                });
        }

        getRecentContacts() {
            this.contactsService.getRecentPeople().then((recentContacts: interfaces.IPerson[]) => {
                this.contactsList = recentContacts;
            });
        }

        searchContacts() {
            console.log(this.searchString);
            if (this.searchString) {
                this.contactsService.searchPeople(this.searchString).then((contactsResult: interfaces.IPerson[]) => {
                    this.contactsList = contactsResult.slice();
                });
            } else {
                this.contactsList.length = 0;
            }
        }
    }
    angular.module('app.contacts').controller('ContactsCtrl', contacts.controllers.ContactsCtrl);
}