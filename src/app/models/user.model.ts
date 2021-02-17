export class User{

    constructor(
       
    public id: number,
    public name: string,
    public firstSurname:string,
    public secondSurname:string,
    public address:string,
    public phone:string,
    public secondContact:string,
    public email:string,
    public password:string,
    public television: 0 | 1,
    public mobilePhone: 0 | 1,
    public telephone : 0 | 1,
    public internet : 0 | 1,
    public creationDate: Date,
    public creationUser: Date,
    public updateDate?: Date,
    public updateUser?: string
    ){}


    

    







}