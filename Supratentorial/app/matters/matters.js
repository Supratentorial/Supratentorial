var matters;
(function (matters) {
    matters.mattersModule = angular.module('app.matters', []);
    matters.mattersModule.service('MattersService', matters.MatterService);
    matters.mattersModule.controller('MattersCtrl', matters.MattersCtrl);
})(matters || (matters = {}));
//# sourceMappingURL=matters.js.map