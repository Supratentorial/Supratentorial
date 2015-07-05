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
            ContactsService.prototype.getContactById = function (contactId) {
                return this.$http.get("api/contacts/" + contactId)
                    .then(function (response) {
                    return response.data;
                });
            };
            ContactsService.prototype.saveContact = function (contact) {
                //If an email or phone number is blank, delete it
                for (var i = 0; i < contact.emailAddresses.length; i++) {
                    if (!contact.emailAddresses[i].address) {
                        if (i > -1) {
                            contact.emailAddresses.splice(i, 1);
                        }
                    }
                }
                for (var i = 0; i < contact.phoneNumbers.length; i++) {
                    if (!contact.phoneNumbers[i].number) {
                        if (i > -1) {
                            contact.phoneNumbers.splice(i, 1);
                        }
                    }
                }
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