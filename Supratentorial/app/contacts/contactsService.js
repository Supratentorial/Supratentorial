/// <reference path="contactsinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
var contacts;
(function (contacts) {
    var services;
    (function (services) {
        var ContactsService = (function () {
            function ContactsService($http) {
                this.httpService = $http;
            }
            ContactsService.prototype.getContactById = function (id) {
                this.httpService.get('api/contacts/' + id)
                    .success(function (data, status, headers, stausText) {
                    console.log(JSON.stringify(data, null, 4));
                })
                    .error(function () {
                    console.log("An error occurred.");
                });
                var contact = {};
                return contact;
            };
            ContactsService.prototype.saveContact = function (contact) {
                console.log("Save contact on contactsServices has been called.");
                this.httpService.post('api/contacts', JSON.stringify(contact), {
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
            ContactsService.$inject = ['$http'];
            return ContactsService;
        })();
        services.ContactsService = ContactsService;
        angular.module("app.contacts").service("contactsService", services.ContactsService);
    })(services = contacts.services || (contacts.services = {}));
})(contacts || (contacts = {}));
//# sourceMappingURL=contactsservice.js.map