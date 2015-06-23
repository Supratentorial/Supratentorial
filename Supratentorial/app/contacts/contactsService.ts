/// <reference path="contactsinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />


module contacts.services {
    "use strict"
    export class ContactsService implements interfaces.IContactsService {

        static $inject = ["$http"];
        constructor(private $http: ng.IHttpService) {
        }

        getRecentPeople() {
            return this.$http.get("api/people/")
                .then((response: any) => {
                return response.data;
            });
        }

        searchPeople(searchString: string) {
            return this.$http.get("api/people?searchString=" + searchString).then((response: any) => { return response.data; });
        }

        getPersonById(id: number): ng.IPromise<interfaces.IPerson> {
            return this.$http.get("api/people/" + id)
                .then((response: any) => {
                return response.data;
            });
        }

        getOrganisationById(id: number): ng.IPromise<interfaces.IOrganisation> {
            return this.$http.get("api/organisations/" + id)
                .then((response: any) => {
                return response.data;
            });
        }

        saveOrganisation(organisation: interfaces.IOrganisation): ng.IPromise<interfaces.IOrganisation> {
            if (organisation.organisationId === 0) {
                return this.$http.post(
                    "api/organisations",
                    JSON.stringify(organisation),
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then((response: any) => {
                    return response.data;
                });
            }
            else {
                return this.$http.put(("api/organisations/" + organisation.organisationId),
                    JSON.stringify(organisation),
                    { headers: { "Content-Type": "application/json" } })
                    .then((response: any) => {
                    return response.data;
                });
            }
        }

        savePerson(person: interfaces.IPerson): ng.IPromise<interfaces.IPerson> {
            if (person.personId === 0) {
                return this.$http.post(
                    "api/people",
                    JSON.stringify(person),
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then((response: any) => {
                    return response.data;
                });
            }
            else {
                return this.$http.put(("api/people/" + person.personId),
                    JSON.stringify(person),
                    { headers: { "Content-Type": "application/json" } })
                    .then((response: any) => {
                    return response.data;
                });
            }
        }
    }
    angular.module("app.contacts").service("contactsService", services.ContactsService);
}