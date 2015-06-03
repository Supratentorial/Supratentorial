angular.module('app.contacts').directive('contactListItem', function (): ng.IDirective {
    return {
        scope: {
            contact: '='
        },
        restrict: 'E',
        templateUrl: 'html/contacts/directives/contact-list-item.html'
    }
});