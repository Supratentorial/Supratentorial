module interfaces {
    export interface IPerson {
        personId: number;
        title: string;
        firstName: string;
        lastName: string;
        middleNames?: string;
        dateOfBirth?: Date;
        phoneNumbers?: IPhoneNumber[];
        emailAddresses?: IEmailAddress[];
        staffProperties?: IStaffProperties;
        address?: IAddress[];
        biographicalProperties?: IBiographicalProperties;
    }

    export interface IOrganisation {
        organisationId: number;
        phoneNumbers: IPhoneNumber[];
        emailAddresses: IEmailAddress[];
        address?: IAddress[];
    }

    export interface IClientProperties {
        dateOfDeath: Date;
        dateOfSeparation: Date;
        dateOfDivorce: Date;
        childrenId: number[];
    }

    export interface ISolicitorProperties {
        practice: IPractice;
    }

    export interface IStaffProperties {
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
    export interface IPractice {
        id: number;
        name: string;
        phone: IPhoneNumber;
        address: IAddress;
    }

    export interface IEmailAddress {
        id: number;
        address: string;
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

    export interface IAddress {
        id: number;
        unitNumber: number;
        streetNumber: number;
        state: string;
        country: string;
        postCode: number;
        isMailing: boolean;
        isResidential: boolean;
    }

    export interface IContactsService {
        savePerson(person: IPerson): ng.IPromise<IPerson>;
        getPersonById(id: number): ng.IPromise<IPerson>;
        getRecentPeople(): ng.IPromise<IPerson[]>;
        searchPeople(searchString :string): ng.IPromise<IPerson[]>;
        getOrganisationById(id: number): ng.IPromise<IOrganisation>;
        saveOrganisation(organisation: IOrganisation): ng.IPromise<IOrganisation>;
    }
}