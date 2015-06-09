var matters;
(function (matters) {
    var directives;
    (function (directives) {
        angular.module('app.matters').directive('matterRelationship', function () {
            return {
                restrict: 'EA',
                templateUrl: 'html/matters/directives/matter-relationship.html',
                scope: {
                    matterRelationship: '='
                }
            };
        });
    })(directives = matters.directives || (matters.directives = {}));
})(matters || (matters = {}));
//# sourceMappingURL=matterRelationship.js.map