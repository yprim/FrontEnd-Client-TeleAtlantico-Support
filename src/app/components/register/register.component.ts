import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb:FormBuilder) { }

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
