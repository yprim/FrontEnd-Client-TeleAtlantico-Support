import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  constructor( private modal:ModalService) { }

  public modalSubs:Subscription;

  ngOnDestroy(): void {
    this.modalSubs.unsubscribe(); 
  } 

  ngOnInit(): void {
    this.modalSubs = this.modal.newIssue
      .subscribe( resp =>{ 
//loadIssues
      })
  }

  openModal(){
    this.modal.openModal();
  }

  issueDetail(issueId:number){
       
    this.openModal();
    console.log(issueId);
    

  }

}
