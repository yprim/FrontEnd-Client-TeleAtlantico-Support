import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { CommentService } from '../../services/comment.service';
import { Issue } from '../../models/issue.model';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.css']
})
export class IssueDetailsComponent implements OnInit {

  issue:Issue;
  comments:Comment[];

  constructor(private route: ActivatedRoute,
              private issueService:IssueService,
              private commentService:CommentService) { }

  ngOnInit(): void {
    this.loadIssue();
  }

  loadIssue(){
    console.log(this.route.snapshot.params['id']);
    
    this.issueService.getIssueById(this.route.snapshot.params['id'])
    .subscribe( issue => {
      this.issue = issue;
      this.loadComments(this.issue.reportNumber);  
    });  
  }

   loadComments(id){
    this.commentService.getCommentByIssueId(id)
    .subscribe( commets => {
      this.comments = commets;
      console.log(this.comments);      
    });  
  }

}
