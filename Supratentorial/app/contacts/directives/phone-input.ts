module contacts.directives {
    "use strict"
    angular.module("app.contacts").directive("phoneInput", function (): ng.IDirective {
        return {
            restrict: "E",
            templateUrl: "html/contacts/directives/phone-input.html",
            scope: {
                phone: "="
            }
        };
    });
} 