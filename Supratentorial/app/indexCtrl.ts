module app.controllers {
    
    export class IndexCtrl {

        static $inject = ["adalAuthenticationService"];
        constructor(private adalAuthenticationService : any) {
        }
        
        logOut() {
            this.adalAuthenticationService.logOut();
        }
        
        logIn() {
            this.adalAuthenticationService.logIn();
        }    
    }

    angular.module("app").controller("IndexCtrl", controllers.IndexCtrl);
}