/// <reference path="../typings/angularjs/angular.d.ts" />
var contacts;
(function (contacts) {
    var contactsModule = angular.module('app.contacts', ['ui.bootstrap'])
        .controller(contacts.controllers);
})(contacts || (contacts = {}));
//# sourceMappingURL=contacts.js.map