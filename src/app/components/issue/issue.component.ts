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
    Id: 0, 
    IdUser: this.client.Id,    
    ReportNumber : this.newReportNumber(),
    Address : this.client.Address,    
    ContactPhone : this.client.Phone,
    ContactEmail : this.client.Email,
    Status : 'Ingresado', 
    SupportUserAsigned : '',    
    Service :[0,[ Validators.required]],  
    Description : ['',[ Validators.required]],
    CreationDate: new Date(),
    CreationUser: this.client.Id
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
        this.issueForm.get('Description').setValue('');
        this.issueForm.get('Service').setValue(0);
        this.issueForm.get('ReportNumber').setValue(this.newReportNumber());
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
            //this.router.navigateByUrl(url);
          }
        })     
  }

  newReportNumber(){
    return this.client.Id +'-'+ new Date().getTime();
  }

}
