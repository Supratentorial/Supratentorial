module matters.directives {
    angular.module('app.matters').directive('matterRelationship', function () : ng.IDirective {
        return {
            restrict: 'EA',
            templateUrl: 'html/matters/directives/matter-relationship.html',
            scope: {
                matterRelationship: '='
            }
        }
    });
} 