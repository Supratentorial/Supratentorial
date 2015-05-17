/// <reference path="../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
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
        openModal() {
            this.modalService.open({
                templateUrl: 'html/contacts/addContactsPartial.html',
                controller: 'AddModalCtrl as vm'
            })
        }
    }

}