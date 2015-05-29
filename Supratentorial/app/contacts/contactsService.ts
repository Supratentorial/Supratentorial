/// <reference path="contactsinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />


module contacts.services {
    export class ContactsService implements interfaces.IContactsService {

        static $inject = ['$http'];
        constructor(private $http: ng.IHttpService) {
        }

        getRecentContacts() {
            return this.$http.get('api/contacts/')
                .then((response: any) => {
                return response.data;
            });
        }

        getContactsByLastName(queryString: string) {
            return this.$http.get('api/contacts' + queryString)
                .then((response: any) => {
                    return response.data;
            });
        }

        getContactById(id: number): ng.IPromise<interfaces.IContact> {
            return this.$http.get('api/contacts/' + id)
                .then((response: any) => {
                return response.data;
            });
        }

        saveContact(contact: interfaces.IContact) {
            this.$http.post(
                'api/contacts',
                JSON.stringify(contact),
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

        updateContact(contact: interfaces.IContact) {

        }
    }
    angular.module("app.contacts").service("contactsService", services.ContactsService)
}