/// <reference path="matterinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="mattersservice.ts" />

module matters.controllers {
    "use strict"
    export class MattersCtrl {

        tabData: any;
        title: string;
        matters: interfaces.IMatter[];

        static $inject = ["mattersService"];
        constructor(private mattersService: interfaces.IMattersService) {
            this.matters = [];
            this.mattersService.getMatters().then((matters: interfaces.IMatter[]) => {
                this.matters = matters;
            });
            this.tabData = [
                {
                    heading: "My Matters",
                    route: "matters.my-matters"
                }, {
                    heading: "Archived Matters",
                    route: "matters.archived"
                }
            ]
        }
    }
    angular.module("app.matters").controller("MattersCtrl", matters.controllers.MattersCtrl);
}