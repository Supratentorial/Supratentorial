var matters;
(function (matters) {
    var directives;
    (function (directives) {
        angular.module('app.matters').directive('addContactChip', function () {
            return {
                restrict: 'E',
                templateUrl: 'html/matters/directives/add-contact-chip.html'
            };
        });
    })(directives = matters.directives || (matters.directives = {}));
})(matters || (matters = {}));
//# sourceMappingURL=addContactChip.js.map