module matters.directives {
    angular.module('app.matters').directive('matterDetailChip', function (): ng.IDirective {
        return {
            restrict: 'E',
            templateUrl: 'html/matters/directives/matter-detail-chip.html'
        }
    });
}