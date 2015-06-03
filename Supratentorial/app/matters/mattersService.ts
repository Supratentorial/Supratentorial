
module matters.services {
    'use strict'   

    export class MatterService implements interfaces.IMattersService {
        static $inject = ['$http'];

        constructor(private $http: angular.IHttpService) { }

    }
    angular.module("app.matters").service("mattersService", services.MatterService);
}