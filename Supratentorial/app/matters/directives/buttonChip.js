var matters;
(function (matters) {
    var directives;
    (function (directives) {
        angular.module('app.matters').directive('buttonChip', function () {
            return {
                restrict: 'E',
                templateUrl: 'html/matters/directives/button-chip.html',
                scope: {
                    img: '@',
                    text: '@'
                }
            };
        });
    })(directives = matters.directives || (matters.directives = {}));
})(matters || (matters = {}));
//# sourceMappingURL=buttonChip.js.map