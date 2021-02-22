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
    name : ['Angula',[ Validators.required]],
    first_surname : ['Primero',[ Validators.required]],
    second_surname : ['Segundo',[ Validators.required]],
   
    address : ['Turri',[ Validators.required]],
    email : ['correo@correo.com',[ Validators.required, Validators.email]],

    phone : ['88888888',[ Validators.required, Validators.pattern("^[0-9]{8}$")]],
    second_contact : ['22222222',[ Validators.required, Validators.pattern("^[0-9]{8}$")]],
    
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

      console.log(this.registerForm.get("name").value);
    

      this.newClient.Name=this.registerForm.get("name").value;
      this.newClient.FirstSurname=this.registerForm.get("first_surname").value;
      this.newClient.SecondSurname=this.registerForm.get("second_surname").value;
      this.newClient.Phone=this.registerForm.get("phone").value;
      this.newClient.SecondContact=this.registerForm.get("second_contact").value;
      this.newClient.Email=this.registerForm.get("email").value;
      this.newClient.Password=this.registerForm.get("password").value;
      this.newClient.Address=this.registerForm.get("address").value;

      this.registerForm.get("television")?this.newClient.Television=1:this.newClient.Television=0;
      this.registerForm.get("internet")?this.newClient.Internet=1:this.newClient.Internet=0;
      this.registerForm.get("mobile_phone")?this.newClient.MobilePhone=1:this.newClient.MobilePhone=0;
      this.registerForm.get("telephone")?this.newClient.Telephone= 1:this.newClient.Telephone= 0;
      this.newClient.CreationUser="user";
      this.newClient.CreationDate= new Date();

    this.clientService.addClient(this.newClient)
    .subscribe( resp =>{
      console.log(resp);
      
    });

    let timerInterval
    Swal.fire({
      title: 'Registro Exitoso',
      html: 'Inicie sesión',
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
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
       this.router.navigateByUrl('/login');
      }
    })


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
  
}
