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
                var promise;
                if (person.personId === 0) {
                    this.$http.post('api/people', JSON.stringify(person), {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                        promise = response.data;
                    });
                }
                else {
                    this.$http.put(('api/people/' + person.personId), JSON.stringify(person), { headers: { "Content-Type": "application/json" } })
                        .then(function (response) {
                        promise = response.data;
                    });
                }
                return promise;
            };
            ContactsService.$inject = ['$http'];
            return ContactsService;
        })();
        services.ContactsService = ContactsService;
        angular.module("app.contacts").service("contactsService", services.ContactsService);
    })(services = contacts.services || (contacts.services = {}));
})(contacts || (contacts = {}));
//# sourceMappingURL=contactsservice.js.map