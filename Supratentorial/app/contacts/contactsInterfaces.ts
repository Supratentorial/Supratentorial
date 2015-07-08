module interfaces {
    export interface IPerson {
        title: string;
        firstName: string;
        lastName: string;
        middleNames?: string;
        dateOfBirth?: Date;
        biographicalProperties?: IBiographicalProperties;
    }

    export interface IContact {
        contactId: number;
        phoneNumbers: IPhoneNumber[];
        emailAddresses: IEmailAddress[];
        addresses: IAddress[];
        type: string;
        trust?: ITrust;
        company?: ICompany;
        person?: IPerson;
        contactStatus: number;
    }

    export interface IContactSearchResult {
        contactId: number;
        displayName: string;
        type: string;
        phoneNumbers: IPhoneNumber[];
        emailAddresses: IEmailAddress[];
        addresses: IAddress[];
        contactStatusId: number;
    }

    export interface ITrust {

    }

    export interface ICompany {

    }

    export interface IGovernmentDepartment {

    }

    export interface IBusiness {

    }

    export interface IFamilyLawDetails {
        dateOfDeath: Date;
        dateOfSeparation: Date;
        dateOfDivorce: Date;
        childrenId: number[];
    }

    export interface ISolicitorProperties {
        practice: IFirmDetails;
    }

    export interface IBiographicalProperties {
        placeOfDeath: string;
        nationality: string;
        countryOfBirth: string;
        dateOfDeath: Date;
    }
    export interface IFirmDetails {
        id: number;
        name: string;
        phone: IPhoneNumber;
        address: IAddress;
    }

    export interface IEmailAddress {
        emailId: number;
        address: string;
        isPreferred?: boolean;
        isArchived?: boolean;
        dateArchived?: Date;
        contactId: number;
    }

    export interface IPhoneNumber {
        phoneId: number;
        type: string;
        isPreferred: boolean;
        number: string;
        contactId: number;
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
        saveContact(person: IContact): ng.IPromise<IContact>;
        getContactById(id: number): ng.IPromise<IContact>;
        getRecentContacts(): ng.IPromise<IContactSearchResult[]>;
        searchContacts(searchString :string): ng.IPromise<IContactSearchResult[]>;
    }
}