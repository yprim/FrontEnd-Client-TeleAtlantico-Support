import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

    if(this.loginForm.invalid){
      let email = document.getElementById("email");
      let password = document.getElementById("password");
      email.classList.add("is-invalid");
      password.classList.add("is-invalid");
      return;
    }
    

  let timerInterval
  Swal.fire({
    title: 'Ingreso Exitoso',
    html: 'Bienvenido',
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
      this.router.navigateByUrl('/home');
    }
  })
    console.log(this.loginForm.value);   
  }

}
