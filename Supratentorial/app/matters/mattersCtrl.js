/// <reference path="matterinterfaces.ts" />
var matters;
(function (matters) {
    "use strict";
    var MattersCtrl = (function () {
        function MattersCtrl(mattersService) {
            this.mattersService = mattersService;
        }
        MattersCtrl.prototype.getAllMatters = function () {
            this.matters = this.mattersService.getAllMatters();
        };
        MattersCtrl.$inject = ["matters.matterService"];
        return MattersCtrl;
    })();
    matters.MattersCtrl = MattersCtrl;
})(matters || (matters = {}));
//# sourceMappingURL=mattersCtrl.js.map