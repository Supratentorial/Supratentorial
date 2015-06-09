module contacts.directives {
    angular.module('app.contacts').directive('phoneInput', function (): ng.IDirective {
        return {
            restrict: 'E',
            templateUrl: 'html/contacts/directives/phone-input.html',
            scope: {
                phone: '='
            }
        }
    })
} 