var matters;
(function (matters) {
    var services;
    (function (services) {
        'use strict';
        var MatterService = (function () {
            function MatterService($http) {
                this.$http = $http;
            }
            MatterService.prototype.saveMatter = function (matter) {
                if (matter.matterId === 0) {
                }
            };
            MatterService.$inject = ['$http'];
            return MatterService;
        })();
        services.MatterService = MatterService;
        angular.module("app.matters").service("mattersService", services.MatterService);
    })(services = matters.services || (matters.services = {}));
})(matters || (matters = {}));
//# sourceMappingURL=mattersservice.js.map