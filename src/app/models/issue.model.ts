export class Issue{

    Id: number=0;
    Report_number: string;
    Address:string;
    ContactPhone:string;
    ContactEmail:string;
    Status:string;
    Description:string;
    Service:string;
    IdUser:number;
    CreationDate: Date;
    CreationUser: Date;
    SupportUser_asigned?:string;
    UpdateDate?: Date;
    UpdateUser?: string;
}