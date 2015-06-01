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
            ContactsService.prototype.getRecentPeople = function () {
                return this.$http.get('api/people/')
                    .then(function (response) {
                    return response.data;
                });
            };
            ContactsService.prototype.getPeopleByLastName = function (queryString) {
                return this.$http.get('api/people' + queryString)
                    .then(function (response) {
                    return response.data;
                });
            };
            ContactsService.prototype.getPersonById = function (id) {
                return this.$http.get('api/people/' + id)
                    .then(function (response) {
                    return response.data;
                });
            };
            ContactsService.prototype.savePerson = function (person) {
                this.$http.post('api/people', JSON.stringify(person), {
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
            ContactsService.prototype.updateContact = function (person) {
            };
            ContactsService.$inject = ['$http'];
            return ContactsService;
        })();
        services.ContactsService = ContactsService;
        angular.module("app.contacts").service("contactsService", services.ContactsService);
    })(services = contacts.services || (contacts.services = {}));
})(contacts || (contacts = {}));
//# sourceMappingURL=contactsservice.js.map