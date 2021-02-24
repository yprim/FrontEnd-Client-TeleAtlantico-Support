export class Issue{

    id: number=0;
    report_number: string;
    address:string;
    contactPhone:string;
    contactEmail:string;
    status:string;
    description:string;
    service:string;
    idUser:number;
    creationDate: Date;
    creationUser: Date;
    supportUser_asigned?:string;
    updateDate?: Date;
    updateUser?: string;
}