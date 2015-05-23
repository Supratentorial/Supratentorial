/// <reference path="contactsinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/moment/moment.d.ts" />
var contacts;
(function (contacts) {
    var controllers;
    (function (controllers) {
        "use strict";
        var AddContactCtrl = (function () {
            function AddContactCtrl($http) {
                this.$http = $http;
                this.title = "";
                this.lastName = "";
                this.firstName = "";
                this.middleNamesString = "";
                this.dateOfBirthString = "";
                this.emailString = "";
                this.phoneNumberString = "";
                this.phoneNumberType = "";
                this.httpService = $http;
                this.titleOptions = ["Mr", "Mrs", "Ms", "Miss", "Master", "Doctor", "Other"];
                this.phoneOptions = ["Home", "Work", "Mobile", "Fax"];
                //TODO: Load email addresses from service.
                this.emailAddresses = [];
                this.phoneNumbers = [];
                if (this.emailAddresses.length === 0) {
                    var email = { id: 0, email: "", isPreferred: true };
                    this.emailAddresses.push(email);
                }
                if (this.phoneNumbers.length === 0) {
                    this.addPhone();
                }
            }
            //TODO: Find out best practice for return type for saving an entity. ? Return the entity ?Return status string
            //TODO: Refactor into service and mapping method.
            //TODO: Write unit test for mapping code.
            AddContactCtrl.prototype.saveContact = function () {
                var dateOfBirth = moment(this.dateOfBirthString, "DD-MM-YYYY").toDate();
                var middleNames = this.middleNamesString.split(" ");
                var currentPhoneNumber = {};
                var contact = {
                    id: 0,
                    lastName: this.lastName,
                    firstName: this.firstName,
                    middleNames: middleNames,
                    dateOfBirth: dateOfBirth,
                    title: this.title,
                    phoneNumbers: this.phoneNumbers,
                    emailAddresses: this.emailAddresses
                };
                console.log(contact);
                this.httpService.post('api/contacts', JSON.stringify(contact), {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .success(function (data, status, headers, statusText) {
                    //TODO: Display confirmation of successful save to user.
                    console.log("Contact saved successfullly");
                })
                    .error(function (data, satus, headers, config) {
                    //TODO: Display error to user if one occurs.
                    console.log(JSON.stringify(data, null, 4));
                });
                return true;
            };
            AddContactCtrl.prototype.addEmail = function () {
                var email = { id: 0, email: "", isPreferred: false };
                this.emailAddresses.push(email);
            };
            AddContactCtrl.prototype.deleteEmail = function (index, email) {
                //TODO: If id == 0 don't require save
                //TODO: If only 1 email, don't allow it to be deleted
                if (email.id === 0 && this.emailAddresses.length > 1) {
                    if (index > -1) {
                        this.emailAddresses.splice(index, 1);
                    }
                }
            };
            AddContactCtrl.prototype.addPhone = function () {
                var phone = { id: 0, number: null, isPreferred: false };
                this.phoneNumbers.push(phone);
            };
            AddContactCtrl.prototype.cancel = function () {
                console.log("cancel button clicked");
            };
            AddContactCtrl.controllerId = "AddContactCtrl";
            AddContactCtrl.$inject = ['$http'];
            return AddContactCtrl;
        })();
        controllers.AddContactCtrl = AddContactCtrl;
    })(controllers = contacts.controllers || (contacts.controllers = {}));
})(contacts || (contacts = {}));
//# sourceMappingURL=addContactCtrl.js.map