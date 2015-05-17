/// <reference path="mattermodels.ts" />

module matters {
    'use strict'   

    export class MatterService implements interfaces.IMattersService {
        static $inject = ['$http'];

        constructor(private $http: angular.IHttpService) { }

        getAllMatters(): models.Matter[]{
            var matter = new models.Matter();
            matter.id = 1;
            matter.clientName = "Mumford";
            var matterList: Array<models.Matter> = [matter];
            return matterList;
        }

        addMatter(matter: models.Matter): ng.IPromise<models.Matter> {
            return this.$http.post('api/matters', matter).then((response: ng.IHttpPromiseCallbackArg<models.Matter>): any => {
                return <models.Matter>response.data;
            });
        }
    }
}