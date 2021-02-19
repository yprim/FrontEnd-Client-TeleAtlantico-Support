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
    name : ['',[ Validators.required]],
    first_surname : ['',[ Validators.required]],
    second_surname : ['',[ Validators.required]],
   
    address : ['',[ Validators.required]],
    email : ['',[ Validators.required, Validators.email]],

    phone : ['',[ Validators.required, Validators.pattern("^[0-9]{8}$")]],
    second_contact : ['',[ Validators.required, Validators.pattern("^[0-9]{8}$")]],
    
    password : ['',[ Validators.required, Validators.minLength(8)]],
   
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
    

      this.newClient.name=this.registerForm.get("name").value;
      this.newClient.first_surname=this.registerForm.get("first_surname").value;
      this.newClient.second_surname=this.registerForm.get("second_surname").value;
      this.newClient.phone=this.registerForm.get("phone").value;
      this.newClient.second_contact=this.registerForm.get("second_contact").value;
      this.newClient.email=this.registerForm.get("email").value;
      this.newClient.password=this.registerForm.get("password").value;
      this.newClient.address=this.registerForm.get("address").value;

      this.registerForm.get("television")?this.newClient.television=1:this.newClient.television=0;
      this.registerForm.get("internet")?this.newClient.internet=1:this.newClient.internet=0;
      this.registerForm.get("mobile_phone")?this.newClient.mobile_phone=1:this.newClient.mobile_phone=0;
      this.registerForm.get("telephone")?this.newClient.telephone= 1:this.newClient.telephone= 0;
      this.newClient.creation_User="user";
      this.newClient.creation_Date= new Date();

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
