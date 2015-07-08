
module matters.services {
    'use strict'

    export class MatterService implements interfaces.IMattersService {
        static $inject = ['$http'];

        constructor(private $http: angular.IHttpService) { }

        MATTER_STATUS_ACTIVE(): number { return 1; }

        saveMatter(matter: interfaces.IMatter) {
            if (matter.matterId === 0) {
                return this.$http.post(
                    "api/matters",
                    JSON.stringify(matter),
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then((response: any) => {
                    return response.data;
                });
            }
        }

    }
    angular.module("app.matters").service("mattersService", services.MatterService);
}