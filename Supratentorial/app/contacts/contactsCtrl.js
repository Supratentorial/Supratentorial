/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="contactsservice.ts" />
/// <reference path="contactsinterfaces.ts" />
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
//# sourceMappingURL=contactsctrl.js.map