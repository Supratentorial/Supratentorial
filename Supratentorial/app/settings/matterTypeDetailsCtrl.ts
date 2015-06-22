/// <reference path="../typings/angularjs/angular.d.ts" />


module settings.controllers {
    export class MatterTypeDetailsCtrl {

        category: string;
        categoryOptions = [{ name: "Family Law" }, { name: "Conveyancing" }, {name: "Wills and Estates"}]

        static $inject = [];
        constructor() {

        }

    }

    angular.module("app.settings").controller("MatterTypeDetailsCtrl", settings.controllers.MatterTypeDetailsCtrl);
} 