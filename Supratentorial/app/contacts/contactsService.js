/// <reference path="contactsinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
var contacts;
(function (contacts) {
    var services;
    (function (services) {
        "use strict";
        var ContactsService = (function () {
            function ContactsService($http) {
                this.$http = $http;
            }
            ContactsService.prototype.getRecentContacts = function () {
                return this.$http.get("api/contacts/")
                    .then(function (response) {
                    return response.data;
                });
            };
            ContactsService.prototype.searchContacts = function (searchString) {
                return this.$http.get("api/contacts?searchString=" + searchString).then(function (response) { return response.data; });
            };
            ContactsService.prototype.getContactById = function (id) {
                return this.$http.get("api/contacts/" + id)
                    .then(function (response) {
                    return response.data;
                });
            };
            ContactsService.prototype.saveContact = function (contact) {
                if (contact.contactId === 0) {
                    return this.$http.post("api/contacts", JSON.stringify(contact), {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                        return response.data;
                    });
                }
                else {
                    return this.$http.put(("api/contacts/" + contact.contactId), JSON.stringify(contact), { headers: { "Content-Type": "application/json" } })
                        .then(function (response) {
                        return response.data;
                    });
                }
            };
            ContactsService.$inject = ["$http"];
            return ContactsService;
        })();
        services.ContactsService = ContactsService;
        angular.module("app.contacts").service("contactsService", services.ContactsService);
    })(services = contacts.services || (contacts.services = {}));
})(contacts || (contacts = {}));
//# sourceMappingURL=contactsservice.js.map