module matters.controllers {
    "use strict"
    export class MatterDetailsCtrl {

        users = [];
        matter: interfaces.IMatter;
        isEditMode: boolean;
        clients: interfaces.IContact[];
        peopleInvolved: interfaces.IUserDTO[] = [];
        creditTo: interfaces.IUserDTO;
        matterTypes: interfaces.IMatterType[];
        relationshipTypes: interfaces.IRelationshipType[] = [];

        static $inject = ["userService", "contactsService", "mattersService", "$state"];
        constructor(private userService: interfaces.IUserService, private contactsService: interfaces.IContactsService, private mattersService: interfaces.IMattersService, private $state: ng.ui.IStateService) {
            this.userService.getUsers().then((response: interfaces.IUserDTO[]) => {
                this.users = response;
            });
            var matterId = this.$state.params["matterId"];
            this.matter = {
                matterId: matterId, 
                name: "",
                relationships: [],
                userMatterAssociations: []
            }
            this.getMatterTypes();
            this.getRelationshipTypes();
            if (this.matter.matterId !== 0) {
                this.mattersService.getMatterById(this.matter.matterId).then((matter: interfaces.IMatter) : void => {
                    this.matter = matter;
                });
            }
            if (this.matter.relationships.length === 0) {

            }
        }


        searchContacts(searchString: string) {
            return this.contactsService.searchContacts(searchString);
        }

        getUsers() {
            return this.userService.getUsers();

        }

        getMatterTypes() {
            return this.mattersService.getMatterTypes().then((matterTypes: interfaces.IMatterType[]) => {
                this.matterTypes = matterTypes;
            });
        }

        getRelationshipTypes() {
            return this.mattersService.getRelationshipTypes().then((relationshipTypes: interfaces.IRelationshipType[]) => {
                this.relationshipTypes = relationshipTypes;
            });
        }

        saveMatter() {

            var clientRelationshipType: interfaces.IRelationshipType;
            for (var i = 0; i < this.relationshipTypes.length; i++) {
                if (this.relationshipTypes[i].name === "Client") {
                    clientRelationshipType = this.relationshipTypes[i];
                }
            }

            for (var i = 0; i < this.peopleInvolved.length; i++) {
                var userId = this.peopleInvolved[i].userId;
                var isCredit: boolean = false;
                if (userId === this.creditTo.userId) {
                    isCredit = true;
                } 
                var userMatterAssociation = <interfaces.IUserMatterAssociation>{
                    isPrimaryPerson: isCredit,
                    matterId: this.matter.matterId,
                    userId: userId
                }
                this.matter.userMatterAssociations.push(userMatterAssociation);
            }

            
            for (var i = 0; i < this.clients.length; i++) {
                var relationship = <interfaces.IRelationship>{
                    relationshipTypeId: clientRelationshipType.relationshipTypeId,
                    contactId: this.clients[i].contactId,
                    relationshipId: 0,
                    dateCreated: moment().toDate(),
                    status: "active"
                }
                this.matter.relationships.push(relationship);
            }
            var matter = <interfaces.IMatter>{
                matterId: this.matter.matterId,
                name: this.matter.name,
                userMatterAssociations: this.matter.userMatterAssociations,
                relationships: this.matter.relationships
            }
            console.log(JSON.stringify(this.matter, null, 4));
            this.mattersService.saveMatter(this.matter);
        }


        editMatter() {
            this.isEditMode = true;
            var state = "matters.details.edit({" + this.matter.matterId + "})";
            this.$state.go(state);
        }

        closeMatter() {
            this.$state.go("matters");
        }
    }
    angular.module("app.matters").controller("MatterDetailsCtrl", matters.controllers.MatterDetailsCtrl);
}