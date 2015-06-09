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
            ContactsService.prototype.getOrganisationById = function (id) {
                return this.$http.get('api/organisations/' + id)
                    .then(function (response) {
                    return response.data;
                });
            };
            ContactsService.prototype.saveOrganisation = function (organisation) {
                if (organisation.organisationId === 0) {
                    return this.$http.post('api/organisations', JSON.stringify(organisation), {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                        return response.data;
                    });
                }
                else {
                    return this.$http.put(('api/organisations/' + organisation.organisationId), JSON.stringify(organisation), { headers: { "Content-Type": "application/json" } })
                        .then(function (response) {
                        return response.data;
                    });
                }
            };
            ContactsService.prototype.savePerson = function (person) {
                if (person.personId === 0) {
                    return this.$http.post('api/people', JSON.stringify(person), {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                        return response.data;
                    });
                }
                else {
                    return this.$http.put(('api/people/' + person.personId), JSON.stringify(person), { headers: { "Content-Type": "application/json" } })
                        .then(function (response) {
                        return response.data;
                    });
                }
            };
            ContactsService.$inject = ['$http'];
            return ContactsService;
        })();
        services.ContactsService = ContactsService;
        angular.module("app.contacts").service("contactsService", services.ContactsService);
    })(services = contacts.services || (contacts.services = {}));
})(contacts || (contacts = {}));
//# sourceMappingURL=contactsservice.js.map