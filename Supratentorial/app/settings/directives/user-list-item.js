var settings;
(function (settings) {
    var directives;
    (function (directives) {
        angular.module('app.settings').directive('userListItem', function () {
            return {
                restrict: 'AE',
                templateUrl: 'html/settings/directives/user-list-item.html',
                scope: {
                    user: '='
                }
            };
        });
    })(directives = settings.directives || (settings.directives = {}));
})(settings || (settings = {}));
//# sourceMappingURL=user-list-item.js.map