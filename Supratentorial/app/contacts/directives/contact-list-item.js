angular.module('app.contacts').directive('contactListItem', function () {
    return {
        scope: {
            contact: '='
        },
        restrict: 'E',
        templateUrl: 'html/contacts/directives/contact-list-item.html'
    };
});
//# sourceMappingURL=contact-list-item.js.map