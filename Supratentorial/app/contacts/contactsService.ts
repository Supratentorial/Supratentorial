/// <reference path="contactsinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />


module contacts.services {
    "use strict"
    export class ContactsService implements interfaces.IContactsService {

        static $inject = ["$http"];
        constructor(private $http: ng.IHttpService) {
        }

        getRecentContacts() {
            return this.$http.get("api/contacts/")
                .then((response: any) => {
                return response.data;
            });
        }

        searchContacts(searchString: string) : ng.IPromise<interfaces.IContact[]> {
            return this.$http.get("api/contacts?searchString=" + searchString).then((response: any) => { return response.data; });
        }

        getContactById(id: number): ng.IPromise<interfaces.IContact> {
            return this.$http.get("api/contacts/" + id)
                .then((response: any) => {
                return response.data;
            });
        }

        saveContact(contact: interfaces.IContact): ng.IPromise<interfaces.IContact> {
            if (contact.contactId === 0) {
                return this.$http.post(
                    "api/contacts",
                    JSON.stringify(contact),
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then((response: any) => {
                    return response.data;
                });
            }
            else {
                return this.$http.put(("api/contacts/" + contact.contactId),
                    JSON.stringify(contact),
                    { headers: { "Content-Type": "application/json" } })
                    .then((response: any) => {
                    return response.data;
                });
            }
        }
    }
    angular.module("app.contacts").service("contactsService", services.ContactsService);
}