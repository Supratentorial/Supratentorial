/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="contactsservice.ts" />
/// <reference path="contactsinterfaces.ts" />
var contacts;
(function (contacts) {
    var controllers;
    (function (controllers) {
        "use strict";
        var ContactsCtrl = (function () {
            function ContactsCtrl(contactsService, $scope) {
                var _this = this;
                this.contactsService = contactsService;
                this.$scope = $scope;
                this.searchString = "";
                this.contactsList = [];
                this.$scope.$watch(function () { return _this.searchString; }, function (newValue, oldValue) {
                    _this.searchContacts();
                });
            }
            ContactsCtrl.prototype.getRecentContacts = function () {
                var _this = this;
                this.contactsService.getRecentPeople().then(function (recentContacts) {
                    _this.contactsList = recentContacts;
                });
            };
            ContactsCtrl.prototype.searchContacts = function () {
                var _this = this;
                console.log(this.searchString);
                if (this.searchString) {
                    this.contactsService.searchPeople(this.searchString).then(function (contactsResult) {
                        _this.contactsList = contactsResult.slice();
                    });
                }
                else {
                    this.contactsList.length = 0;
                }
            };
            ContactsCtrl.$inject = ["contactsService", "$scope"];
            return ContactsCtrl;
        })();
        controllers.ContactsCtrl = ContactsCtrl;
        angular.module('app.contacts').controller('ContactsCtrl', contacts.controllers.ContactsCtrl);
    })(controllers = contacts.controllers || (contacts.controllers = {}));
})(contacts || (contacts = {}));
//# sourceMappingURL=contactsctrl.js.map