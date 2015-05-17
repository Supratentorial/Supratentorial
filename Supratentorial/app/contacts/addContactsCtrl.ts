/// <reference path="contactsinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
module contacts.controllers {
    "use strict"
    interface IAddContactsCtrl {
        addContact(contact : interfaces.IContact): any;
    }

    export class AddContactsCtrl implements IAddContactsCtrl {
        static controllerId: string = "AddContactsCtrl";
        modalInstance: angular.ui.bootstrap.IModalServiceInstance;
        title: string;

        static $inject = ['$modalInstance'];
        constructor(private $modalInstance : angular.ui.bootstrap.IModalServiceInstance) {
            this.modalInstance = $modalInstance;
            this.title = "Add Contact";
        }

        //TODO: Find out best practice for return type for saving an entity. ? Return the entity ?Return status string
        addContact(contact: interfaces.IContact) {
            this.modalInstance.close();
            return true;
        }
    }
}