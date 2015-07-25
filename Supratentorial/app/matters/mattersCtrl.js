/// <reference path="matterinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="mattersservice.ts" />
var matters;
(function (matters_1) {
    var controllers;
    (function (controllers) {
        "use strict";
        var MattersCtrl = (function () {
            function MattersCtrl(mattersService, $scope, $state) {
                var _this = this;
                this.mattersService = mattersService;
                this.$scope = $scope;
                this.$state = $state;
                this.matters = [];
                this.clientCellTemplate = '<div class="ngCellText" ng-class="col.colIndex()"><button ui-sref="contacts.details.basic({contactId: {{client.contactId}}})" ng-click="$event.stopPropagation()" class="btn btn-link" ng-repeat="client in row.entity.clients">{{client.displayName}}</button></div>';
                this.gridOptions = {
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
                };
                this.getTableHeight = function () {
                    var rowHeight = 35;
                    var headerHeight = 35;
                    return {
                        height: (this.matters.length * rowHeight + headerHeight) + "px"
                    };
                };
                this.mattersService.getMatters().then(function (matters) {
                    _this.matters = matters;
                });
                this.gridOptions.onRegisterApi = function (gridApi) {
                    //set gridApi on scope
                    this.gridApi = gridApi;
                    gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                        $state.go("matters.details.view", { matterId: row.entity.matterId });
                    });
                };
            }
            MattersCtrl.$inject = ["mattersService", "$scope", "$state"];
            return MattersCtrl;
        })();
        controllers.MattersCtrl = MattersCtrl;
        angular.module("app.matters").controller("MattersCtrl", matters.controllers.MattersCtrl);
    })(controllers = matters_1.controllers || (matters_1.controllers = {}));
})(matters || (matters = {}));
//# sourceMappingURL=mattersctrl.js.map