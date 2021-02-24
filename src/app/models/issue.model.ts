export class Issue{

    id: number=0;
    reportNumber: string;
    address:string;
    contactPhone:string;
    contactEmail:string;
    status:string;
    description:string;
    service:string;
    idUser:number;
    creationDate: Date;
    creationUser: Date;
    supportUserAsigned?:string;
    updateDate?: Date;
    updateUser?: string;
}