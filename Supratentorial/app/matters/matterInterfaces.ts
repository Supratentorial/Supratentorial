module interfaces {
    export interface IMatter {
        matterId: number;
        name: string;
        relationships: IRelationship[];
    }

    export interface IMattersCtrl {

    }

    export interface IMattersService {


    }

    export interface IRelationship {
        relationshipId: number;
        dateCreated: Date;
        status: string;
        relationshipTypeId: number;
        contactId?: number;
    }
}