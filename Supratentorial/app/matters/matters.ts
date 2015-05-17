module matters {
    export var mattersModule: ng.IModule = angular.module('app.matters', []);
    mattersModule.service('MattersService', MatterService);
    mattersModule.controller('MattersCtrl',matters.MattersCtrl);
}