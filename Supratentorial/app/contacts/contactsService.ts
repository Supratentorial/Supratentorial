/// <reference path="contactsinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />


module contacts.services {
    export class ContactsService implements interfaces.IContactsService {

        static $inject = ['$http'];
        constructor(private $http: ng.IHttpService) {
        }

        getRecentPeople() {
            return this.$http.get('api/people/')
                .then((response: any) => {
                return response.data;
            });
        }

        getPeopleByLastName(queryString: string) {
            return this.$http.get('api/people' + queryString)
                .then((response: any) => {
                    return response.data;
            });
        }

        getPersonById(id: number): ng.IPromise<interfaces.IPerson> {
            return this.$http.get('api/people/' + id)
                .then((response: any) => {
                return response.data;
            });
        }

        savePerson(person: interfaces.IPerson) {
            this.$http.post(
                'api/people',
                JSON.stringify(person),
                {
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
        }

        updateContact(person: interfaces.IPerson) {

        }
    }
    angular.module("app.contacts").service("contactsService", services.ContactsService)
}