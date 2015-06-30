/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../contacts/contactsservice.ts" />

module settings.controllers {
    interface IUserDetailsCtrl {
        userId: string;
        pageTitle: string;
    }
    export class UserDetailsCtrl implements IUserDetailsCtrl {
        pageTitle: string = "Edit Staff Member";
        userId: string = "";
        firstName: string;
        lastName: string;
        titleOptions = [{ title: "Mr" }, { title: "Mrs" }, { title: "Ms" }, { title: "Miss" }, { title: "Master" }, { title: "Doctor" }, { title: "Professor" }]
        jobTitleOptions = [{ jobTitle: "Solicitor" }, { jobTitle: "Paralegal" }, { jobTitle: "Secretary" }]
        jobTitle: string;
        title: string;
        terminationDate: Date;
        commencementDate: Date;
        emailAddresses: interfaces.IEmailAddress[];

        static $inject = ['userService', '$state'];
        constructor(private userService: interfaces.IUserService, private $state: ng.ui.IStateService) {
            this.userId = this.$state.params['userId'];
            if (this.userId === "") {
                this.pageTitle = "New Staff Member";
            } else {
                this.userService.getUserById(this.userId).then((user: interfaces.IUserDTO) : void => {
                    this.userId = user.userId;
                });
            }
        }

        mapToUserDTO(): interfaces.IUserDTO {
            var displayName = this.firstName + " " + this.lastName;
            var userDTO: interfaces.IUserDTO = {
                userId: this.userId,
                firstName: this.firstName,
                lastName: this.lastName,
                jobTitle: this.jobTitle,
                displayName: displayName
            }
            return userDTO;
        }

        saveUser() {
            this.userService.saveUser(this.mapToUserDTO());
            this.$state.go('settings.users');
        }

        cancel() {
            this.$state.go('settings.users');
        }
    }
    angular.module("app.settings").controller("UserDetailsCtrl", settings.controllers.UserDetailsCtrl);
}