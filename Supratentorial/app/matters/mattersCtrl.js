/// <reference path="matterinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="mattersservice.ts" />
var matters;
(function (matters) {
    var controllers;
    (function (controllers) {
        "use strict";
        var MattersCtrl = (function () {
            function MattersCtrl(mattersService) {
                this.mattersService = mattersService;
                this.matters = [];
                this.gridOptions = {
                    columnDefs: [
                        { displayName: "Matter ID", name: "matterId" },
                        { displayName: "Name", name: "name" },
                        { displayName: "Clients", name: "clients" },
                        { displayName: "People Involved", name: "peopleInvolved" },
                        { displayName: "Type", name: "type" },
                        { displayName: "Status", name: "status" }
                    ]
                };
                this.getTableHeight = function () {
                    var rowHeight = 30;
                    var headerHeight = 30;
                    return {
                        height: (this.matters.length * rowHeight + headerHeight) + "px"
                    };
                };
                //this.mattersService.getMatters().then((matters: interfaces.IMatterDTO[]) => {
                //    this.matters = matters;
                //});
            }
            MattersCtrl.$inject = ["mattersService"];
            return MattersCtrl;
        })();
        controllers.MattersCtrl = MattersCtrl;
        angular.module("app.matters").controller("MattersCtrl", matters.controllers.MattersCtrl);
    })(controllers = matters.controllers || (matters.controllers = {}));
})(matters || (matters = {}));
//# sourceMappingURL=mattersctrl.js.map