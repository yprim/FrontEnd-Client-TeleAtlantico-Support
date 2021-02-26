import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { IssueService } from '../../services/issue.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  client:Client=this.clientService.client;

  public issueForm = this.fb.group({
    id: 0, 
    idUser: this.client.id,    
    reportNumber : this.newReportNumber(),
    address : this.client.address,    
    contactPhone : this.client.phone,
    contactEmail : this.client.email,
    status : 'Ingresado', 
    supportUserAsigned : '',    
    service :[0,[ Validators.required]],  
    description : ['',[ Validators.required]],
    creationDate: new Date(),
    creationUser: this.client.id
  });

  constructor(private fb:FormBuilder,
              private clientService:ClientService,
              private issueService:IssueService) { 
  }

  ngOnInit(): void {
    
  }

  registerIssue(){

    if(this.issueForm.invalid){
      return;
    } 

    if( this.issueForm.get("service").value == 0){
      return;
    }

    if( (this.issueForm.get("description").value).trim() == ''){
      return;
    }

    this.issueService.addIssue(this.issueForm.value)
    .subscribe( resp =>{
     
        this.modal('','Registro Exitoso');
        this.issueForm.get('description').setValue('');
        this.issueForm.get('service').setValue(0);
        this.issueForm.get('reportNumber').setValue(this.newReportNumber());
     
    });
    
  }

  valueNoValid(value:string) {  
    return this.issueForm.get(value).invalid && this.issueForm.get(value).touched
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
            //this.router.navigateByUrl(url);
          }
        })     
  }

  newReportNumber(){
    return this.client.id +'-'+ new Date().getTime();
  }

}
