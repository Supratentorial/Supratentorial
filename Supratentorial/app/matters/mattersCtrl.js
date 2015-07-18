/// <reference path="matterinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="mattersservice.ts" />
var matters;
(function (matters_1) {
    var controllers;
    (function (controllers) {
        "use strict";
        var MattersCtrl = (function () {
            function MattersCtrl(mattersService) {
                var _this = this;
                this.mattersService = mattersService;
                this.tabData = [
                    {
                        heading: "My Matters",
                        route: "matters.my-matters"
                    }, {
                        heading: "Archived Matters",
                        route: "matters.archived"
                    }
                ];
                this.matters = [];
                this.mattersService.getMatters().then(function (matters) {
                    _this.matters = matters;
                });
            }
            MattersCtrl.$inject = ["mattersService"];
            return MattersCtrl;
        })();
        controllers.MattersCtrl = MattersCtrl;
        angular.module("app.matters").controller("MattersCtrl", matters.controllers.MattersCtrl);
    })(controllers = matters_1.controllers || (matters_1.controllers = {}));
})(matters || (matters = {}));
//# sourceMappingURL=mattersctrl.js.map