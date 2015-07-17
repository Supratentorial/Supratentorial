var matters;
(function (matters) {
    var directives;
    (function (directives) {
        angular.module("app.matters").directive("matterListItem", function () {
            return {
                restrict: "E",
                templateUrl: "html/matters/directives/matter-list-item.html",
                scope: {
                    matter: "="
                }
            };
        });
    })(directives = matters.directives || (matters.directives = {}));
})(matters || (matters = {}));
//# sourceMappingURL=matterListItem.js.map