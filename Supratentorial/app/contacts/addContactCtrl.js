/// <reference path="contactsinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
var contacts;
(function (contacts) {
    var controllers;
    (function (controllers) {
        "use strict";
        var AddContactCtrl = (function () {
            function AddContactCtrl($http) {
                this.$http = $http;
                this.httpService = $http;
                this.titleOptions = ["Mr", "Mrs", "Ms", "Miss", "Master", "Doctor", "Other"];
                this.phoneOptions = ["Home", "Work", "Mobile", "Fax"];
            }
            //TODO: Find out best practice for return type for saving an entity. ? Return the entity ?Return status string
            AddContactCtrl.prototype.saveContact = function () {
                var contact = { id: 0, lastName: this.lastName, firstName: this.firstName, dateOfBirth: this.dateOfBirth };
                this.httpService.post('api/contacts', contact)
                    .success(function (data, status, headers, statusText) {
                    console.log("Contact saved successfullly");
                })
                    .error(function () {
                    console.log("Contact did not save.");
                });
                return true;
            };
            AddContactCtrl.prototype.addEmail = function () {
                var email = {};
                email.email = this.email;
            };
            AddContactCtrl.controllerId = "AddContactCtrl";
            AddContactCtrl.$inject = ['$http'];
            return AddContactCtrl;
        })();
        controllers.AddContactCtrl = AddContactCtrl;
    })(controllers = contacts.controllers || (contacts.controllers = {}));
})(contacts || (contacts = {}));
//# sourceMappingURL=addContactCtrl.js.map