module interfaces {
    export interface IMatter {
        matterId: number;
        name: string;
        relationships: IRelationship[];
        userMatterAssociations: IUserMatterAssociation[];
    }
    export interface IMatterDTO {
        name: string;
        matterId: number;
        clients: IContactDTO[];
        status: string;
        peopleInvolved: IUserDTO[];
    }

    export interface IMattersCtrl {

    }

    export interface IMattersService {
        saveMatter(matter: IMatter): any;
        getMatterTypes(): ng.IPromise<interfaces.IMatterType[]>;
        getMatterTypeById(matterTypeId: number): ng.IPromise<interfaces.IMatterType>;
        getRelationshipTypes(): ng.IPromise<interfaces.IRelationshipType[]>;
        getMatterById(matterId: number): ng.IPromise<interfaces.IMatter>;
        getMatters(): ng.IPromise<interfaces.IMatterDTO[]>;
    }

    export interface IMatterType {
        matterTypeId: number;
        name: string;
        description: string;
        eventTemplates: IEventTemplate;
        relationshipTemplates: IRelationshipTemplate;
    }

    export interface IRelationshipTemplate {
        relationshipTemplateId: number;
        matterTypeId: number;
        relationshipTypeId: number;
    }

    export interface IEventTemplate {
        eventTemplateId: number;
        matterTypeId: number;
        eventTypeId: number;
    }

    export interface IRelationship {
        relationshipId: number;
        dateCreated: Date;
        status: string;
        relationshipTypeId: number;
        contactId?: number;
    }

    export interface IRelationshipType {
        relationshipTypeId: number;
        name: string;
        description: string;
        status: string;
    }

    export interface IUserMatterAssociation {
        userId: string;
        matterId: number;
        isPrimaryPerson: boolean;
    }
}