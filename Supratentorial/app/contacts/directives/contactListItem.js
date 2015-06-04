var contacts;
(function (contacts) {
    var directives;
    (function (directives) {
        angular.module('app.contacts').directive('contactListItem', function () {
            return {
                scope: {
                    contact: '='
                },
                restrict: 'E',
                templateUrl: 'html/contacts/directives/contact-list-item.html'
            };
        });
    })(directives = contacts.directives || (contacts.directives = {}));
})(contacts || (contacts = {}));
//# sourceMappingURL=contactListItem.js.map