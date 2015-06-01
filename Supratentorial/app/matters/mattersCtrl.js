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
                this.tabData = [
                    {
                        heading: "My Matters",
                        route: "matters.my-matters"
                    }, {
                        heading: "Archived Matters",
                        route: "matters.archived"
                    }
                ];
            }
            MattersCtrl.$inject = ["mattersService"];
            return MattersCtrl;
        })();
        controllers.MattersCtrl = MattersCtrl;
        angular.module("app.matters").controller("MattersCtrl", matters.controllers.MattersCtrl);
    })(controllers = matters.controllers || (matters.controllers = {}));
})(matters || (matters = {}));
//# sourceMappingURL=mattersctrl.js.map