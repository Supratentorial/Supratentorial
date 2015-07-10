module matters.controllers {
    "use strict"
    export class EditMatterDetailsCtrl {
        
        users = [];
        matter: interfaces.IMatter;
        isEditMode: boolean;
        clients: interfaces.IContact[];
        peopleResponsible: interfaces.IUserDTO[];
        primaryPerson: interfaces.IUserDTO;
        matterTypes: interfaces.IMatterType[];

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
            this.getMatterTypes();
        }


        searchContacts(searchString: string) {
            return this.contactsService.searchContacts(searchString);
        }

        getUsers() {
            console.log();
            return this.userService.getUsers();
            
        }

        getMatterTypes() {
            return this.mattersService.getMatterTypes().then((matterTypes : interfaces.IMatterType[]) => {
                this.matterTypes = matterTypes;
            });
        }

        saveMatter() {
            for (var i = 0; i < this.clients.length; i++) {
                var relationship = <interfaces.IRelationship>{
                    relationshipId: this.mattersService.MATTER_STATUS_ACTIVE(),
                    relationshipType: this
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