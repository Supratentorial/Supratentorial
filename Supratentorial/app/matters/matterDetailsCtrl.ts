/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="app.matters.ts" />


module matters.controllers {
    export class MatterDetailsCtrl {

        matterTitle: string = 'New Matter';
        entities = [{ name: "Blake Mumford" }, { name: "Helena Mumford" }];
        matterRelationships = [{ type: "Client", contact: { name: "Blake Mumford" } }, { type: "Client", contact: { name: "Helena Mumford"} }];

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