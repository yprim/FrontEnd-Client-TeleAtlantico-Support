export class Comment{

    id: number=0;
    description:string;
    idIssue:number;
    reportNumber: string;
    creationDate: Date;
    creationUser: String;
    updateDate?: Date;
    updateUser?: string;
}