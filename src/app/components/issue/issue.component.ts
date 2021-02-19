import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  public issueForm = this.fb.group({
    
    id: 0,
    idUser: 0,
    
    reportNumber : new Date().getTime()+'-'+ 'userId',
    address : 'Turri',    
    contactPhone : 88888888,
    email : 'djndj@hoiijndsf.com',  
 
    status : 'Ingresado', 

    supportUserAsigned : '',
    
    service :['',[ Validators.required]],  
    description : ['',[ Validators.required]],    



  });

  constructor(private fb:FormBuilder,
              private clientService:ClientService) { 

  }

  ngOnInit(): void {

  }

  registerIssue(){
    console.log(this.issueForm.value);
    
  }

  valueNoValid(value:string) {  
    return this.issueForm.get(value).invalid && this.issueForm.get(value).touched
  }

}
