var contacts;
(function (contacts) {
    var directives;
    (function (directives) {
        "use strict";
        angular.module("app.contacts").directive("phoneInput", function () {
            return {
                restrict: "E",
                templateUrl: "html/contacts/directives/phone-input.html",
                scope: {
                    phone: "="
                }
            };
        });
    })(directives = contacts.directives || (contacts.directives = {}));
})(contacts || (contacts = {}));
//# sourceMappingURL=phone-input.js.map