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
    id_user: this.client.id,    
    report_number : this.newReportNumber,
    address : this.client.address,    
    contact_phone : this.client.phone,
    contact_email : this.client.email,
    status : 'Ingresado', 
    support_user_asigned : '',    
    service :[0,[ Validators.required]],  
    description : ['',[ Validators.required]],
    creation_Date: new Date(),
    creation_User: this.client.id
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

    this.issueService.addIssue(this.issueForm.value)
    .subscribe( resp =>{
      if(resp > 0){
        this.modal('','Registro Exitoso');
        this.issueForm.get('description').setValue('');
        this.issueForm.get('service').setValue(0);
        this.issueForm.get('report_number').setValue(this.newReportNumber);
      }else{
        this.modal('','Error, Intente de nuevo')
      }
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
            //to do
          }
        })     
  }

  newReportNumber(){
    return this.client.id +'-'+ new Date().getTime();
  }

}
