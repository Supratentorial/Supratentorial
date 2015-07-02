var common;
(function (common) {
    var directives;
    (function (directives) {
        angular.module("app.common").directive("autofocusElement", function () {
            return {
                restrict: 'A',
                link: function ($scope, element) {
                    element[0].focus();
                }
            };
        });
    })(directives = common.directives || (common.directives = {}));
})(common || (common = {}));
//# sourceMappingURL=autofocusElement.js.map