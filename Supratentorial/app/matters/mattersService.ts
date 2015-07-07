
module matters.services {
    'use strict'   

    export class MatterService implements interfaces.IMattersService {
        static $inject = ['$http'];

        constructor(private $http: angular.IHttpService) { }

        saveMatter(matter : interfaces.IMatter) {
            if (matter.matterId === 0) {
            }
        }

    }
    angular.module("app.matters").service("mattersService", services.MatterService);
}