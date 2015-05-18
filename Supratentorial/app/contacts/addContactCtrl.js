/// <reference path="contactsinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
var contacts;
(function (contacts) {
    var controllers;
    (function (controllers) {
        "use strict";
        var AddContactCtrl = (function () {
            function AddContactCtrl() {
                this.title = "Add Contact";
            }
            //TODO: Find out best practice for return type for saving an entity. ? Return the entity ?Return status string
            AddContactCtrl.prototype.addContact = function (contact) {
                return true;
            };
            AddContactCtrl.controllerId = "AddContactCtrl";
            AddContactCtrl.$inject = [];
            return AddContactCtrl;
        })();
        controllers.AddContactCtrl = AddContactCtrl;
    })(controllers = contacts.controllers || (contacts.controllers = {}));
})(contacts || (contacts = {}));
//# sourceMappingURL=addContactCtrl.js.map