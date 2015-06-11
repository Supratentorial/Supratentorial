/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="app.matters.ts" />
/// <reference path="matterinterfaces.ts" />
/// <reference path="../contacts/contactsinterfaces.ts" />


module matters.controllers {
    export class MatterDetailsCtrl {

        matterTitle: string = 'New Matter';
        clients = [{ name: "Homer Simpson", id: 1 }];
        peopleResponsible = [{name: "Helena Mumford", id: 1}]


        static $inject = ['$modal'];
        constructor(private $modal : ng.ui.bootstrap.IModalService) {   
        }

        editRelationship() {
            this.$modal.open({
                templateUrl: 'html/matters/matter-add-relationship.html',
                controller: 'relationshipsCtrl'
            })
        }
    }
    angular.module('app.matters').controller('MatterDetailsCtrl', matters.controllers.MatterDetailsCtrl);
}