/// <reference path="matterinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="mattersservice.ts" />

module matters.controllers {
    "use strict"
    export class MattersCtrl implements interfaces.IMattersCtrl {

        tabData: any;
        title: string;

        static $inject = ["mattersService"];
        constructor(private mattersService: interfaces.IMattersService) {
            this.title = "Penis";
            this.tabData = [
                {
                    heading: "My Matters",
                    route: "matters.my-matters"
                },
                {
                    heading: "Biographical",
                    route: "contact-details.biographical"
                },
                {
                    heading: "Financial",
                    route: "contact-details.financial"
                }
            ]
        }
    }
}