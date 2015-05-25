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
            ContactsCtrl.$inject = ["$modal"];
            return ContactsCtrl;
        })();
        controllers.ContactsCtrl = ContactsCtrl;
    })(controllers = contacts.controllers || (contacts.controllers = {}));
})(contacts || (contacts = {}));
//# sourceMappingURL=contactsCtrl.js.map