import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Client } from '../models/client.model';
import { LoginForm } from '../interfaces/login.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const base_url = environment.base_url;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  public auth:any;
  public client:Client;

  constructor( private http:HttpClient ) { }


get userId():number{
    return this.client.id || 0;
} 


  addClient( client: Client ){
    const url = `${base_url}/client/add/`;
    return this.http.post<any>(url, JSON.stringify(client),httpOptions)
    .pipe(
      tap((client) => console.log('added client')),
      catchError(this.handleError<any>('addClient'))
    );
  }

  login( formData: LoginForm){
  }

  
  logout(){
  }

  
  listClients(){
    const url = `${base_url}/client/clients/`;
    return this.http.get(url);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}