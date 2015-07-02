module common.directives {
    angular.module("app.common").directive("autofocusElement", (): ng.IDirective => {
        return {
            restrict: 'A',
            link: function ($scope, element) {
                element[0].focus();
            }
        }
    });
}