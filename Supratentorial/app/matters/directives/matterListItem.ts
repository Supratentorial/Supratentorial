module matters.directives {
    angular.module("app.matters").directive("matterListItem", (): ng.IDirective => {
        return {
            restrict: "E",
            templateUrl: "html/matters/directives/matter-list-item.html",
            scope: {
                matter: "="
            }
        }
    })
}