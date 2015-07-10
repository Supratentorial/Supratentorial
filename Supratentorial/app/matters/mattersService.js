var matters;
(function (matters) {
    var services;
    (function (services) {
        'use strict';
        var MatterService = (function () {
            function MatterService($http) {
                this.$http = $http;
            }
            MatterService.prototype.MATTER_STATUS_ACTIVE = function () { return 1; };
            MatterService.prototype.getMatterTypes = function () {
                return this.$http.get("api/matterTypes").then(function (response) { return response.data; });
            };
            MatterService.prototype.getMatterTypeById = function (matterTypeId) {
                return this.$http.get("api/matterType/" + matterTypeId).then(function (response) { return response.data; });
            };
            MatterService.prototype.saveMatter = function (matter) {
                if (matter.matterId === 0) {
                    return this.$http.post("api/matters", JSON.stringify(matter), {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                        return response.data;
                    });
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