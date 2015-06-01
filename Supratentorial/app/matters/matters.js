/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="mattersservice.ts" />
/// <reference path="mattersctrl.ts" />
var matters;
(function (matters) {
    var mattersModule = angular.module('app.matters', [])
        .controller(matters.controllers);
})(matters || (matters = {}));
//# sourceMappingURL=matters.js.map