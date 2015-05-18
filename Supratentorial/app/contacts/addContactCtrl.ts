/// <reference path="contactsinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
module contacts.controllers {
    "use strict"
    interface IAddContactCtrl {
        addContact(contact : interfaces.IContact): any;
    }

    export class AddContactCtrl implements IAddContactCtrl {
        static controllerId: string = "AddContactCtrl";

        title: string;

        static $inject = [];
        constructor() {

            this.title = "Add Contact";
        }

        //TODO: Find out best practice for return type for saving an entity. ? Return the entity ?Return status string
        addContact(contact: interfaces.IContact) {
            
            return true;
        }
    }
}