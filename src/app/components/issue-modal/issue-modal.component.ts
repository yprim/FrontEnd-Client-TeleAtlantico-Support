import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-issue-modal',
  templateUrl: './issue-modal.component.html',
  styleUrls: ['./issue-modal.component.css']
})
export class IssueModalComponent implements OnInit {

  constructor( public modalService:ModalService,private fb:FormBuilder) { 
  }

  public issueForm = this.fb.group({
    
    Id: 0,
    IdUser: 0,
    
    ReportNumber : new Date().getTime()+'-'+ 'userId',
    Address : 'Turri',    
    ContactPhone : 88888888,
    Email : 'djndj@hoiijndsf.com',  
 
    Status : 'Ingresado', 

    SupportUserAsigned : 'Gretel',
    
    Service :['Telefono',[ Validators.required]],  
    Description : ['Algo',[ Validators.required]],    



  });

  ngOnInit(): void {
  }

  closeModal(){
    this.modalService.closeModal();
  }

  valueNoValid(value:string) {  
    return this.issueForm.get(value).invalid && this.issueForm.get(value).touched
  }

}
