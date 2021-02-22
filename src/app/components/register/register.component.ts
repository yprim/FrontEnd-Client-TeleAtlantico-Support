import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newClient:Client=new Client();

  public registerForm = this.fb.group({
    id:0,
    name : ['Test',[ Validators.required]],
    first_surname : ['Test',[ Validators.required]],
    second_surname : ['Test',[ Validators.required]],
   
    address : ['Test',[ Validators.required]],
    email : ['test@test.com',[ Validators.required, Validators.email]],

    phone : ['12587452',[ Validators.required, Validators.pattern("^[0-9]{8}$")]],
    second_contact : ['12587452',[ Validators.required, Validators.pattern("^[0-9]{8}$")]],
    
    password : ['12345678',[ Validators.required, Validators.minLength(8)]],
   
    television : false,
    mobile_phone : false,
    telephone : false,
    internet : false,
    
  });

  constructor(private fb:FormBuilder,private router:Router, private clientService:ClientService) { } 

  ngOnInit(): void {
  }

  createUser(){

    if(!this.serviceValid){
      return;
    }

    if(this.registerForm.invalid){
      return;
    }

      this.newClient.Name=this.registerForm.get("name").value;
      this.newClient.FirstSurname=this.registerForm.get("first_surname").value;
      this.newClient.SecondSurname=this.registerForm.get("second_surname").value;
      this.newClient.Phone=this.registerForm.get("phone").value;
      this.newClient.SecondContact=this.registerForm.get("second_contact").value;
      this.newClient.Email=this.registerForm.get("email").value;
      this.newClient.Password=this.registerForm.get("password").value;
      this.newClient.Address=this.registerForm.get("address").value;

      console.log(this.registerForm.get("television"));
      
      this.registerForm.get("television").value ? (this.newClient.Television=1) : (this.newClient.Television=0);
      this.registerForm.get("internet").value?this.newClient.Internet=1:this.newClient.Internet=0;
      this.registerForm.get("mobile_phone").value?this.newClient.MobilePhone=1:this.newClient.MobilePhone=0;
      this.registerForm.get("telephone").value?this.newClient.Telephone= 1:this.newClient.Telephone= 0;
      
      this.newClient.CreationUser='new client';
      this.newClient.CreationDate= new Date();


    this.clientService.addClient(this.newClient)
    .subscribe( resp =>{
      if(resp > 0){
        this.modal('/login','Registro Exitoso');
      }else{
        this.modal('','Error. Intente de nuevo');
      }      
    });
  }  

  valueNoValid(value:string) {  
    return this.registerForm.get(value).invalid && this.registerForm.get(value).touched
  }

  get serviceValid() { 

    if(this.registerForm.get('television').value){
      return true;
    }
    if(this.registerForm.get('mobile_phone').value){
      return true;
    }
    if(this.registerForm.get('telephone').value){
      return true;
    }
    if(this.registerForm.get('internet').value){
      return true;
    }
    return false;
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
