/// <reference path="matterinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="mattersservice.ts" />

module matters.controllers {
    "use strict"
    export class MattersCtrl {

        title: string;
        matters: interfaces.IMatterDTO[] = [];
        gridOptions: any = {
            columnDefs: [
                { displayName: "Matter ID", name: "matterId" },
                { displayName: "Name", name: "name" },
                { displayName: "Clients", name: "clients" },
                { displayName: "People Involved", name: "peopleInvolved"},
                { displayName: "Type", name: "type" },
                { displayName: "Status", name: "status" }
            ]

        }

        static $inject = ["mattersService"];
        constructor(private mattersService: interfaces.IMattersService) {
            this.mattersService.getMatters().then((matters: interfaces.IMatterDTO[]) => {
                this.matters = matters;
            });
        }

        getTableHeight = function () {
            var rowHeight = 30;
            var headerHeight = 30;
            return {
                height: (this.matters.length * rowHeight + headerHeight) + "px"
            };
        };

    }
    angular.module("app.matters").controller("MattersCtrl", matters.controllers.MattersCtrl);
}