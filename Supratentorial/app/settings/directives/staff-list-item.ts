module settings.directives {
    angular.module('app.settings').directive('staffListItem', function (): ng.IDirective {
        return {
            restrict: 'AE',
            templateUrl: 'html/settings/directives/staff-list-item.html',
            scope: {
                person: '='
            }
        }
    })
}