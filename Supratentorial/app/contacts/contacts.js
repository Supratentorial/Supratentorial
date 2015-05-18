/// <reference path="../typings/angularjs/angular.d.ts" />
var contacts;
(function (contacts) {
    var contactsModule = angular.module('app.contacts', ['ui.bootstrap', 'ngMaterial'])
        .controller(contacts.controllers);
})(contacts || (contacts = {}));
//# sourceMappingURL=contacts.js.map