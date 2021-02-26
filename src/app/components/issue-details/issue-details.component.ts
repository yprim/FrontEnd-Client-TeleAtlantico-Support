import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { CommentService } from '../../services/comment.service';
import { Issue } from '../../models/issue.model';
import { Validators, FormBuilder } from '@angular/forms';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.css']
})
export class IssueDetailsComponent implements OnInit {

  issue:Issue;
  issueId:number=this.route.snapshot.params['id'];
  comments:Comment[]; 
  
  public commentForm = this.fb.group({
    id: 0, 
    idIssue: this.issueId,    
    reportNumber : '',
    description : ['',[ Validators.required]],
    creationDate: new Date(),
    creationUser: ''
  });

  constructor(private route: ActivatedRoute,
              private issueService:IssueService,
              private commentService:CommentService,
              private fb:FormBuilder,
              private clientService:ClientService) {
                this.issueId=this.route.snapshot.params['id'];
               }

  ngOnInit(): void {
    this.loadIssue();
  }

  loadIssue(){
    this.issueService.getIssueById(this.issueId)
    .subscribe( issue => {
      this.issue = issue;
      this.loadComments(this.issue.reportNumber);  
    });  
  }

   loadComments(reportNumber){
    this.commentService.getCommentByIssueId(reportNumber)
    .subscribe( commets => {
      this.comments = commets;
    });  
  }

  registerComment(){
    if(this.commentForm.invalid){
      return;
    }
    this.commentForm.get('reportNumber').setValue(this.issue.reportNumber);
    this.commentForm.get('creationUser').setValue(this.clientService.client.name);
    
    this.commentService.addComment(this.commentForm.value)
    .subscribe( resp =>{
      this.loadComments(this.issue.reportNumber);   
      this.commentForm.get('description').setValue('');
    });
  }

}
