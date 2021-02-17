import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { LoginForm } from '../interfaces/login.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public auth:any;
  public user:User;

  constructor( ) { }


get userId():number{
    return this.user.id || 0;
} 


  addUser( user: User ){
  }

  
  login( formData: LoginForm){
  }

  
  logout(){
  }

  
  listUsers(){

  }


}