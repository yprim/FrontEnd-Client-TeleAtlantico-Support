export class Client{

    constructor(
       
    public id: number,
    public name: string,
    public first_surname:string,
    public second_surname:string,
    public address:string,
    public phone:string,
    public second_contact:string,
    public email:string,
    public password:string,
    public television: 0 | 1,
    public mobilePhone: 0 | 1,
    public telephone : 0 | 1,
    public internet : 0 | 1,
    public creation_Date: Date,
    public creation_User: Date,
    public update_Date?: Date,
    public update_User?: string
    ){}


    

    







}