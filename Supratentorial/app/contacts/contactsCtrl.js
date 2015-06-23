/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="contactsservice.ts" />
/// <reference path="contactsinterfaces.ts" />
var contacts;
(function (contacts) {
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
                this.contactsService.getRecentPeople().then(function (recentContacts) {
                    _this.contactsList = recentContacts;
                });
            };
            ContactsCtrl.prototype.searchContacts = function () {
                var _this = this;
                this.contactsService.searchPeople(this.searchString).then(function (contactsReslt) {
                    _this.contactsList = contactsReslt;
                });
            };
            ContactsCtrl.$inject = ["contactsService"];
            return ContactsCtrl;
        })();
        controllers.ContactsCtrl = ContactsCtrl;
        angular.module('app.contacts').controller('ContactsCtrl', contacts.controllers.ContactsCtrl);
    })(controllers = contacts.controllers || (contacts.controllers = {}));
})(contacts || (contacts = {}));
//# sourceMappingURL=contactsctrl.js.map