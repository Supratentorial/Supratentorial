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

        savePerson(person: interfaces.IPerson): ng.IPromise<interfaces.IPerson> {
            var promise: ng.IPromise<interfaces.IPerson>;
            if (person.personId === 0) {
                this.$http.post(
                    'api/people',
                    JSON.stringify(person),
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then((response: any) => {
                    promise = response.data;
                });
            }
            else {
                this.$http.put(('api/people/' + person.personId),
                    JSON.stringify(person),
                    { headers: { "Content-Type": "application/json" } })
                    .then((response: any) => {
                    promise = response.data;
                });
            }
            return promise;
        }
    }
    angular.module("app.contacts").service("contactsService", services.ContactsService);
}