module matters.controllers {
    export class NewMatterCtrl {

        selectedClient: interfaces.IPerson;

        static $inject = ['contactsService'];
        constructor(private contactsService : interfaces.IContactsService){
            
        }

        searchContacts(searchString: string) {
            return this.contactsService.searchPeople(searchString);
        }
    }
    angular.module('app.matters').controller('NewMatterCtrl', matters.controllers.NewMatterCtrl);
}