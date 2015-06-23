var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var IndexCtrl = (function () {
            function IndexCtrl(adalAuthenticationService) {
                this.adalAuthenticationService = adalAuthenticationService;
            }
            IndexCtrl.prototype.logOut = function () {
                this.adalAuthenticationService.logOut();
            };
            IndexCtrl.prototype.logIn = function () {
                this.adalAuthenticationService.logIn();
            };
            IndexCtrl.$inject = ["adalAuthenticationService"];
            return IndexCtrl;
        })();
        controllers.IndexCtrl = IndexCtrl;
        angular.module("app").controller("IndexCtrl", controllers.IndexCtrl);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=indexCtrl.js.map