/// <reference path="matterinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="mattersservice.ts" />

module matters.controllers {
    "use strict"
    export class MattersCtrl {

        title: string;
        matters: interfaces.IMatterDTO[] = [];
        gridAPI: any;
        clientCellTemplate: string = '<div class="ngCellText" ng-class="col.colIndex()"><button ui-sref="contacts.details.basic({contactId: {{client.contactId}}})" ng-click="$event.stopPropagation()" class="btn btn-link" ng-repeat="client in row.entity.clients">{{client.displayName}}</button></div>';
        gridOptions: any = {
            rowHeight: 35,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            enableFullRowSelection: true,
            enableRowSelection: true,
            multiSelect: false,
            enableRowHeaderSelection: false,
            data: "vm.matters",
            columnDefs: [
                { field: "matterId", displayName: "Matter ID", width: 100 },
                { field: "name", displayName: "Matter Name" },
                { field: "clients", displayName: "Clients", width: 500, cellTemplate: this.clientCellTemplate },
                { field: "matterType", displayName: "Matter Type" },
                { field: "status", displayName: "Status" }
            ]
        }


        static $inject = ["mattersService", "$scope", "$state"];
        constructor(private mattersService: interfaces.IMattersService, private $scope : ng.IScope, private $state : ng.ui.IStateService) {
            this.mattersService.getMatters().then((matters: interfaces.IMatterDTO[]) => {
                this.matters = matters;
            });
            this.gridOptions.onRegisterApi = function (gridApi) {
                //set gridApi on scope
                this.gridApi = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    $state.go("matters.details.view", {matterId: row.entity.matterId});
                });
            }
        }

        getTableHeight = function () {
            var rowHeight = 35;
            var headerHeight = 35;
            return {
                height: (this.matters.length * rowHeight + headerHeight) + "px"
            };
        };

    }
    angular.module("app.matters").controller("MattersCtrl", matters.controllers.MattersCtrl);
}