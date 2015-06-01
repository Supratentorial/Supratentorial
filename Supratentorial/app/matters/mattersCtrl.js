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
                ];
            }
            MattersCtrl.$inject = ["mattersService"];
            return MattersCtrl;
        })();
        controllers.MattersCtrl = MattersCtrl;
    })(controllers = matters.controllers || (matters.controllers = {}));
})(matters || (matters = {}));
//# sourceMappingURL=mattersctrl.js.map