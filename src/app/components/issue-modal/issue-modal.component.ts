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
    
    id: 0,
    idUser: 0,
    
    reportNumber : new Date().getTime()+'-'+ 'userId',
    address : 'Turri',    
    contactPhone : 88888888,
    email : 'djndj@hoiijndsf.com',  
 
    status : 'Ingresado', 

    supportUserAsigned : 'Gretel',
    
    service :['Telefono',[ Validators.required]],  
    description : ['Algo',[ Validators.required]],    



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
