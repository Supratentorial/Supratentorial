
module matters.services {
    'use strict'

    export class MatterService implements interfaces.IMattersService {
        static $inject = ['$http'];

        constructor(private $http: angular.IHttpService) { }

        getMatters(): ng.IPromise<interfaces.IMatter[]> {
            return this.$http.get("api/matters").then((response: any) => { return response.data; })
        }

        getMatterTypes(): ng.IPromise<interfaces.IMatterType[]> {
            return this.$http.get("api/mattertypes").then((response: any) => { return response.data; });
        }

        getMatterTypeById(matterTypeId: number): ng.IPromise<interfaces.IMatterType> {
            return this.$http.get("api/mattertypes/" + matterTypeId).then((response: any) => { return response.data; });
        }

        getRelationshipTypes(): ng.IPromise<interfaces.IRelationshipType[]> {
            return this.$http.get("api/relationshiptypes").then((response: any) => { return response.data });
        }

        getMatterById(matterId: number): ng.IPromise<interfaces.IMatter> {
            return this.$http.get("api/matters/" + matterId).then((response: any) => { return response.data });
        }

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