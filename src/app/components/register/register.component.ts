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
    secondContact : ['',[ Validators.required, Validators.minLength(8)]],
    
    password : ['',[ Validators.required, Validators.minLength(8)]],
   
    television : ['',[ Validators.required]],
    mobilePhone : ['',[ Validators.required]],
    telephone : ['',[ Validators.required]],
    internet : ['',[ Validators.required]],
    
  });

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  createUser(){

    

    if(this.registerForm.invalid){
      return;
    }

    console.log(this.registerForm.value);


  }    

  valueNoValid(value:string) {  
    return this.registerForm.get(value).invalid && this.registerForm.get(value).touched
  }
  
  
}
