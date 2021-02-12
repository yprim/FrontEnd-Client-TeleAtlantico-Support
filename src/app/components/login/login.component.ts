import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public loginForm = this.fb.group({
    email : ['',[ Validators.required, Validators.email]],
    password : ['',[ Validators.required, Validators.minLength(8)]],
  });

  constructor(  private fb:FormBuilder,
                private router:Router) { }

  ngOnInit(): void {
  }

  valueNoValid(value:string) {  
    return this.loginForm.get(value).invalid && this.loginForm.get(value).touched
  }

  loginUser(){

    console.log(this.loginForm.value);   

    this.router.navigateByUrl('/home');
     

  }

}
