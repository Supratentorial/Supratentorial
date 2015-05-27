/// <reference path="contactsinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />


module contacts.services {
    export class ContactsService implements interfaces.IContactsService {

        httpService: ng.IHttpService;

        static $inject = ['$http'];
        constructor($http: ng.IHttpService) {
            this.httpService = $http;
        }

        getContactById(id: number) {
            this.httpService.get('api/contacts/' + id)
                .success(function (data, status, headers, stausText) {
                console.log(JSON.stringify(data, null, 4));
            })
                .error(function () {
                console.log("An error occurred.");
            });

            var contact = <interfaces.IContact>{};
            return contact;
        }

        saveContact(contact: interfaces.IContact) {
            console.log("Save contact on contactsServices has been called.");
            this.httpService.post(
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
    }
    angular.module("app.contacts").service("contactsService", services.ContactsService)
}