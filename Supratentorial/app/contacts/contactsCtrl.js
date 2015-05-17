/// <reference path="../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
var contacts;
(function (contacts) {
    var controllers;
    (function (controllers) {
        "use strict";
        var ContactsCtrl = (function () {
            function ContactsCtrl($modal) {
                this.modalService = $modal;
                this.title = "Contacts";
            }
            ContactsCtrl.prototype.openModal = function () {
                this.modalService.open({
                    templateUrl: 'html/contacts/addContactsPartial.html',
                    controller: 'AddModalCtrl as vm'
                });
            };
            ContactsCtrl.$inject = ["$modal"];
            return ContactsCtrl;
        })();
        controllers.ContactsCtrl = ContactsCtrl;
    })(controllers = contacts.controllers || (contacts.controllers = {}));
})(contacts || (contacts = {}));
//# sourceMappingURL=contactsCtrl.js.map