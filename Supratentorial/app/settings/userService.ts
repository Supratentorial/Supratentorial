module settings.services {
    export class UserService implements interfaces.IUserService {

        static $inject = ["$http"];
        constructor(private $http: ng.IHttpService) {
        }

        getUsers(): ng.IPromise<interfaces.IUserDTO[]> {
            return this.$http.get("api/users").then((response: any) => { return response.data; });
        }

        getUserById(userId: string): ng.IPromise<interfaces.IUserDTO> {
            return this.$http.get("api/users?userId=" + userId).then((response: any) => { return response.data });
        }

        saveUser(user : interfaces.IUserDTO) {
            if (user.userId === "") { 
                return this.$http.post(
                    "api/users",
                    JSON.stringify(user),
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

    angular.module("app.settings").service("userService", settings.services.UserService);
}