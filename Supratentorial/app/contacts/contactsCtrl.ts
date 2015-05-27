/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="contactsservice.ts" />
/// <reference path="contactsinterfaces.ts" />

module contacts.controllers {
    "use strict"

    export class ContactsCtrl {
        modalService: angular.ui.bootstrap.IModalService;
        title: string;

        static $inject = ["$modal"];
        constructor($modal: angular.ui.bootstrap.IModalService) {
            this.modalService = $modal;
            this.title = "Contacts";
        }
    }

}