module settings.directives {
    angular.module('app.settings').directive('userListItem', function (): ng.IDirective {
        return {
            restrict: 'AE',
            templateUrl: 'html/settings/directives/user-list-item.html',
            scope: {
                user: '='
            }
        }
    })
}