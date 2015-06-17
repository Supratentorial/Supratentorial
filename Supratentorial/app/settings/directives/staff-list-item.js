var settings;
(function (settings) {
    var directives;
    (function (directives) {
        angular.module('app.settings').directive('staffListItem', function () {
            return {
                restrict: 'AE',
                templateUrl: 'html/settings/directives/staff-list-item.html',
                scope: {
                    person: '='
                }
            };
        });
    })(directives = settings.directives || (settings.directives = {}));
})(settings || (settings = {}));
//# sourceMappingURL=staff-list-item.js.map