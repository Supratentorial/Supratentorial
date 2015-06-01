/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="mattersservice.ts" />
/// <reference path="mattersctrl.ts" />


module matters {
    var mattersModule: ng.IModule = angular.module('app.matters', [])
        .controller(controllers);
}