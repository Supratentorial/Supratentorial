/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="contactsservice.ts" />
/// <reference path="contactsinterfaces.ts" />
var contacts;
(function (contacts_1) {
    var controllers;
    (function (controllers) {
        "use strict";
        var ContactsCtrl = (function () {
            function ContactsCtrl(contactsService) {
                this.contactsService = contactsService;
                this.searchString = "";
                this.contactsList = [];
            }
            ContactsCtrl.prototype.getRecentContacts = function () {
                var _this = this;
                this.contactsService.getRecentContacts().then(function (contacts) {
                    _this.contactsList = contacts;
                });
            };
            ContactsCtrl.prototype.searchContacts = function () {
                var _this = this;
                var queryString = "?LastName=" + this.searchString;
                this.contactsService.getContactsByLastName(queryString).then(function (contacts) {
                    _this.contactsList = contacts;
                });
            };
            ContactsCtrl.$inject = ["contactsService"];
            return ContactsCtrl;
        })();
        controllers.ContactsCtrl = ContactsCtrl;
    })(controllers = contacts_1.controllers || (contacts_1.controllers = {}));
})(contacts || (contacts = {}));
//# sourceMappingURL=contactsctrl.js.map