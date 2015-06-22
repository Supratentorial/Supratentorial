module matters.controllers {
    "use strict"
    export class NewMatterCtrl {
        
        clients: interfaces.IPerson[];
        primaryPerson: interfaces.IPerson;
        peopleAssisting = [];
        
        staffMembers = [{ name: "Andrew Mumford", email: "andrew@mumfordslawyers.com.au" }, {name: "Helena Mumford", email: "helena@mumfordslawyers.com.au"}]

        static $inject = ["contactsService"];
        constructor(private contactsService : interfaces.IContactsService){
            
        }

        searchContacts(searchString: string) {
            return this.contactsService.searchPeople(searchString);
        }

        getStaffMembers() {
            // return this.contactsService.getStaffMembers();
        }
    }
    angular.module("app.matters").controller("NewMatterCtrl", matters.controllers.NewMatterCtrl);
}