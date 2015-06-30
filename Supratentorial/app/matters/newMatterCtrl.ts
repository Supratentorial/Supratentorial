module matters.controllers {
    "use strict"
    export class NewMatterCtrl {
        
        clients: interfaces.IPerson[];
        primaryPerson: interfaces.IUserDTO;
        peopleAssisting : interfaces.IUserDTO[] = [];
        users = [];

        static $inject = ["userService", "contactsService"];
        constructor(private userService : interfaces.IUserService, private contactsService : interfaces.IContactsService){
            this.userService.getUsers().then((response: interfaces.IUserDTO[]) => {
                this.users = response;
            })
        }

        searchContacts(searchString: string) {
            return this.contactsService.searchPeople(searchString);
        }

        getUserDisplayNames() {
            return this.userService.getUsers().then((response) : string[] => {
                var displayNames: string[] = [];
                for (var i = 0; i < response.length; i++) {
                    displayNames.push(response[i].displayName);
                }
                console.log(this.peopleAssisting);
                return displayNames;
            })
        }
    }
    angular.module("app.matters").controller("NewMatterCtrl", matters.controllers.NewMatterCtrl);
}