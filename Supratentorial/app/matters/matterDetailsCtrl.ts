/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="app.matters.ts" />


module matters.controllers {
    export class MatterDetailsCtrl {

        matterTitle: string = 'New Matter';

        static $inject = [];
        constructor() {

        }
    }
    angular.module('app.matters').controller('MatterDetailsCtrl', matters.controllers.MatterDetailsCtrl);
}