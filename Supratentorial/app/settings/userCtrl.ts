/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="settingsinterfaces.ts" />
/// <reference path="userservice.ts" />

module settings.controllers {
    export class UserCtrl {

        penis: string = "penis";
        static $inject = ["userService"];
        userProfiles: interfaces.IUserDTO[] = [];

        constructor(private userService: interfaces.IUserService) {
            this.userService.getUsers().then((users: interfaces.IUserDTO[]) => {
                this.userProfiles = users.slice();
                console.log(this.userProfiles);
            });
        }
    }
    angular.module("app.settings").controller("UserCtrl", settings.controllers.UserCtrl);
}