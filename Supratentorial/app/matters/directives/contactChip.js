var matters;
(function (matters) {
    var directives;
    (function (directives) {
        angular.module('app.matters').directive('contactChip', function () {
            return {
                restrict: 'E',
                templateUrl: 'html/matters/directives/contact-chip.html',
                scope: {
                    contact: '='
                }
            };
        });
    })(directives = matters.directives || (matters.directives = {}));
})(matters || (matters = {}));
//# sourceMappingURL=contactChip.js.map