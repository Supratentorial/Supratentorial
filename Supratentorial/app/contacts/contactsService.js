/// <reference path="contactsinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
var contacts;
(function (contacts) {
    var services;
    (function (services) {
        var ContactsService = (function () {
            function ContactsService($http) {
                this.$http = $http;
            }
            ContactsService.prototype.getRecentContacts = function () {
                return this.$http.get('api/contacts/')
                    .then(function (response) {
                    return response.data;
                });
            };
            ContactsService.prototype.getContactsByLastName = function (queryString) {
                return this.$http.get('api/contacts' + queryString)
                    .then(function (response) {
                    return response.data;
                });
            };
            ContactsService.prototype.getContactById = function (id) {
                return this.$http.get('api/contacts/' + id)
                    .then(function (response) {
                    return response.data;
                });
            };
            ContactsService.prototype.saveContact = function (contact) {
                this.$http.post('api/contacts', JSON.stringify(contact), {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .success(function (data, status, headers, statusText) {
                    //TODO: Display confirmation of successful save to user.
                    console.log("Contact saved successfullly." + data);
                })
                    .error(function (data, satus, headers, config) {
                    //TODO: Display error to user if one occurs.
                    console.log("Failed to save contact.");
                });
            };
            ContactsService.prototype.updateContact = function (contact) {
            };
            ContactsService.$inject = ['$http'];
            return ContactsService;
        })();
        services.ContactsService = ContactsService;
        angular.module("app.contacts").service("contactsService", services.ContactsService);
    })(services = contacts.services || (contacts.services = {}));
})(contacts || (contacts = {}));
//# sourceMappingURL=contactsservice.js.map