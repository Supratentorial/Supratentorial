module matters.controllers {
    "use strict"
    export class EditMatterDetailsCtrl {
        
        users = [];
        matter: interfaces.IMatter;
        isEditMode: boolean;
        clients: interfaces.IContact[];
        peopleResponsible: interfaces.IUserDTO[];
        primaryPerson: interfaces.IUserDTO;

        static $inject = ["userService", "contactsService", "mattersService"];
        constructor(private userService : interfaces.IUserService, private contactsService : interfaces.IContactsService, private mattersService :interfaces.IMattersService){
            this.userService.getUsers().then((response: interfaces.IUserDTO[]) => {
                this.users = response;
            })
            this.matter = {
                matterId: 0,
                name: "",
                relationships: [],
                userMatterAssociations: []
            }
        }


        searchContacts(searchString: string) {
            return this.contactsService.searchContacts(searchString);
        }

        getUsers() {
            console.log();
            return this.userService.getUsers();
            
        }

        saveMatter() {
            for (var i = 0; i < this.clients.length; i++) {
                var relationship = <interfaces.IRelationship>{
                    relationshipTypeId: this.mattersService.MATTER_STATUS_ACTIVE()
                };
                console.log(relationship.relationshipTypeId);
                console.log(relationship.relationshipId);
            }

            console.log(this.matter.relationships);
            //this.mattersService.saveMatter(this.matter);
        }
    }
    angular.module("app.matters").controller("EditMatterDetailsCtrl", matters.controllers.EditMatterDetailsCtrl);
}