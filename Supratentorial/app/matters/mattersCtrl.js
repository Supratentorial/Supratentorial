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
                this.matters = [];
                this.gridOptions = {};
                this.getTableHeight = function () {
                    var rowHeight = 35;
                    var headerHeight = 35;
                    return {
                        height: (this.matters.length * rowHeight + headerHeight) + "px"
                    };
                };
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