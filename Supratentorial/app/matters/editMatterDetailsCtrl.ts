module matters.controllers {
    "use strict"
    export class EditMatterDetailsCtrl {
        
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
            return this.contactsService.searchContacts(searchString);
        }

        getUsers() {
            console.log(this.peopleAssisting);
            return this.userService.getUsers();
            
        }

        saveMatter() {
            //this.mattersServer.saveMatter(this.matter);
        }
    }
    angular.module("app.matters").controller("EditMatterDetailsCtrl", matters.controllers.EditMatterDetailsCtrl);
}