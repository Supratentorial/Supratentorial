module matters.directives {
    angular.module('app.matters').directive('buttonChip', function (): ng.IDirective {
        return {
            restrict: 'E', 
            templateUrl: 'html/matters/directives/button-chip.html',
            scope: {
                img : '@',
                text : '@'
            }
        }
    });
}