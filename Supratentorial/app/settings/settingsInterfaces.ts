module interfaces {
    export interface IUserDTO {
        userId: string;
        firstName: string;
        lastName: string;
        jobTitle: string;
        displayName: string;
    }

    export interface IUserService {
        getUserById(userId: string): ng.IPromise<interfaces.IUserDTO>;
        getUsers(): ng.IPromise<interfaces.IUserDTO[]>;
        saveUser(user: IUserDTO): void;
    }
}