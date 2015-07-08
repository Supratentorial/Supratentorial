module interfaces {
    export interface IMatter {
        matterId: number;
        name: string;
        relationships: IRelationship[];
        userMatterAssociations: IUserMatterAssociation[];
    }

    export interface IMattersCtrl {

    }

    export interface IMattersService {
        saveMatter(matter: IMatter): any;
        MATTER_STATUS_ACTIVE(): number;
    }

    export interface IRelationship {
        relationshipId: number;
        dateCreated: Date;
        status: string;
        relationshipTypeId: number;
        contactId?: number;
    }

    export interface IUserMatterAssociation {
        userId: string;
        matterId: number;
        isPrimaryPerson: boolean;
    }
}