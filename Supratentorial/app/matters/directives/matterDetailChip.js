var matters;
(function (matters) {
    var directives;
    (function (directives) {
        angular.module('app.matters').directive('matterDetailChip', function () {
            return {
                restrict: 'E',
                templateUrl: 'html/matters/directives/matter-detail-chip.html'
            };
        });
    })(directives = matters.directives || (matters.directives = {}));
})(matters || (matters = {}));
//# sourceMappingURL=matterDetailChip.js.map