import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  client:Client = new Client();


  public loginForm = this.fb.group({
    email : ['correo@correo.com',[ Validators.required, Validators.email]],
    password : ['12345678',[ Validators.required, Validators.minLength(8)]],
  });

  constructor(  private fb:FormBuilder,
                private router:Router,
                private clientService:ClientService) { }

  ngOnInit(): void {
  }

  valueNoValid(value:string) {  
    return this.loginForm.get(value).invalid && this.loginForm.get(value).touched
  }

  loginUser(){

     if(this.loginForm.invalid){
      let email = document.getElementById("email");
      let password = document.getElementById("password");
      email.classList.add("is-invalid");
      password.classList.add("is-invalid");
      return;
    }

  this.clientService.login(this.loginForm.value)
    .subscribe( client =>{
       if(client)   {
        this.client = client;
        this.modal('/home','Bienvenido: '+ this.client.name);            
       }else{
        this.modal('','Error al autentificar')
       }   
    });       
  }

  modal( url:string | '', message:String){
    let timerInterval
        Swal.fire({
        title: message,
        html: '',
        timer: 1000,
        didOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
          }, 50)
        },
        willClose: () => {
        clearInterval(timerInterval)
        }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            this.router.navigateByUrl(url);
          }
        })     
  }

}
