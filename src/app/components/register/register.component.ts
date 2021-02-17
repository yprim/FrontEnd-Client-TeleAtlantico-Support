import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public registerForm = this.fb.group({
    id:0,
    name : ['',[ Validators.required]],
    firstSurname : ['',[ Validators.required]],
    secondSurname : ['',[ Validators.required]],
   
    address : ['',[ Validators.required]],
    email : ['',[ Validators.required, Validators.email]],

    phone : ['',[ Validators.required, Validators.pattern("^[0-9]{8}$")]],
    secondContact : ['',[ Validators.required, Validators.pattern("^[0-9]{8}$")]],
    
    password : ['',[ Validators.required, Validators.minLength(8)]],
   
    television : false,
    mobilePhone : false,
    telephone : false,
    internet : false,
    
  });

  constructor(private fb:FormBuilder,private router:Router) { } 

  ngOnInit(): void {
  }

  createUser(){

    if(!this.serviceValid){
      return;
    }

    if(this.registerForm.invalid){
      return;
    }

    console.log(this.registerForm.value);

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
    if(this.registerForm.get('mobilePhone').value){
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
