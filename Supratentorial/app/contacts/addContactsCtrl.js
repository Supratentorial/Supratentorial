/// <reference path="contactsinterfaces.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
var contacts;
(function (contacts) {
    var controllers;
    (function (controllers) {
        "use strict";
        var AddContactsCtrl = (function () {
            function AddContactsCtrl($modalInstance) {
                this.$modalInstance = $modalInstance;
                this.modalInstance = $modalInstance;
            }
            //TODO: Find out best practice for return type for saving an entity. ? Return the entity ?Return status string
            AddContactsCtrl.prototype.addContact = function (contact) {
                this.modalInstance.close();
                return true;
            };
            AddContactsCtrl.controllerId = "AddContactsCtrl";
            AddContactsCtrl.$inject = ['$modalInstance'];
            return AddContactsCtrl;
        })();
        controllers.AddContactsCtrl = AddContactsCtrl;
    })(controllers = contacts.controllers || (contacts.controllers = {}));
})(contacts || (contacts = {}));
//# sourceMappingURL=addContactsCtrl.js.map