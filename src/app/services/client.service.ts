import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Client } from '../models/client.model';
import { LoginForm } from '../interfaces/login.interface';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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
  userToken: string = '';

  constructor( private http:HttpClient ) { }


  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

listClients(){
  const url = `${base_url}/client/clients/`;
  return this.http.get(url).pipe(
    map(this.extractData),
    catchError(this.handleError<any>('list clients'))
    );
}


 addClient( client: Client ){
    const url = `${base_url}/client/add`;
    return this.http.post<any>(url, JSON.stringify(client), httpOptions).pipe(
      tap((client) => console.log('added client')),
      catchError(this.handleError<any>('addClient'))
    );
  }

  login( client: Client ){
    const url = `${base_url}/client/login`;
    return this.http.post<any>(url, JSON.stringify(client), httpOptions).pipe(
      tap((client) => console.log('login client')),
      catchError(this.handleError<any>('login')),
      map(resp =>{
        if(resp){
          this.saveToken(resp.id);        }
          return resp;
      })
    );
  }

  isLogin(): boolean{
    return parseInt( this.userToken) > 0;
  }

  private saveToken(idClient: string){
    this.userToken = idClient;
    localStorage.setItem('token', this.userToken);
 }


  
  logout(){
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