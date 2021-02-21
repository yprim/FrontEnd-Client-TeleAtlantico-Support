export class Issue{

    id: number=0;
    report_number: string;
    address:string;
    contact_phone:string;
    contact_email:string;
    status:string;
    description:string;
    service:string;
    id_user:number;
    creation_Date: Date;
    creation_User: Date;
    support_user_asigned?:string;
    update_Date?: Date;
    update_User?: string;
}