module interfaces {
    export interface IContact {
        id : number;
        title : string;
        firstName : string;
        lastName : string;
        middleNames : string[];
        dateOfBirth : Date;
        phoneNumbers: IPhoneNumber[];
        emailAddresses: IEmailAddress[];
        staffProfile?: IStaffProfile;
        address: IAddress[];
        biographicalProperties: IBiographicalProperties;
    }

    export interface IClientProfile {
        dateOfDeath : Date;
        dateOfSeparation: Date;
        dateOfDivorce: Date;
        childrenId : number[];
    }

    export interface ISolicitorProfile {
        practice : IPractice;
    }

    export interface IStaffProfile {
        commencementDate: Date;
        terminationDate: Date;
        position: string;
    }

    export interface IBiographicalProperties {
        placeOfDeath: string;
        nationality: string;
        countryOfBirth: string;
        dateOfDeath: Date;
    }
    export interface IPractice{
        id : number;
        name : string;
        phone : IPhoneNumber;
        address : IAddress;
    }

    export interface IEmailAddress {
        id: number;
        email: string;
        isPreferred?: boolean;
    }

    export interface IPhoneNumber {
        id: number;
        countryCode: number;
        areaCode: number;
        type: string;
        isPreferred: boolean;
        number: number;
    }

    export interface IAddress{
        id: number;
        unitNumber : number;
        streetNumber : number;
        state : string;
        country : string;
        postCode : number;
        isMailing : boolean;
        isResidential : boolean;
    }
}