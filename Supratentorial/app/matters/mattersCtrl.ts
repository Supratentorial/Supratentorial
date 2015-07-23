/// <reference path="matterinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="mattersservice.ts" />

module matters.controllers {
    "use strict"
    export class MattersCtrl {

        title: string;
        matters: interfaces.IMatterDTO[] = [];
        gridOptions: any = {
        }

        static $inject = ["mattersService"];
        constructor(private mattersService: interfaces.IMattersService) {
            this.mattersService.getMatters().then((matters: interfaces.IMatterDTO[]) => {
                this.matters = matters;
            });
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