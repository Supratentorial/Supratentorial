module matters.directives {
    angular.module('app.matters').directive('contactChip', function (): ng.IDirective {
        return {
            restrict: 'E',
            templateUrl: 'html/matters/directives/contact-chip.html',
            scope: {
                 contact: '='
            }
        }
    })
}