import { Component, OnInit } from '@angular/core';
import { ResponseJira } from '../object/response-jira';
import { RequestJira } from '../object/request-jira';
import { JiraCreated } from '../object/jira-created';
import { Observable } from 'rxjs/Observable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { CreateJiraService } from '../services/create-jira.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-bulk-create-jira',
  templateUrl: './bulk-create-jira.component.html',
  styleUrls: ['./bulk-create-jira.component.css'],
  providers: [CreateJiraService]
})
export class BulkCreateJiraComponent implements OnInit {

data: any[];
errMsg: string;
newData: any;
r_Jira: ResponseJira[] = [];
n_Jira: ResponseJira[] = [];
jiraSelectedList: string [] = [] ;
allJiraSelected: boolean;
isjirasorted: boolean = false;
req_Jira: RequestJira[] = [];
d_Jira: ResponseJira[] = [];
jira_success: JiraCreated;
some: string;

  constructor(private createJiraService: CreateJiraService, private http: Http) { }

  ngOnInit() {
    this.createJiraService.getMetadata()
        .subscribe(resData => this.r_Jira = resData,
                   resErr => this.errMsg = resErr );
  }
  checkAll(event: any) {
        if (event.target.checked){
                 this.r_Jira.forEach((t: any) => {
                 t.checked = true;
                 this.allJiraSelected = true ;
            });
            } else {
            this.r_Jira.forEach((t: any) => {
            t.checked = false;
            this.allJiraSelected = false;
            });
        }
    }
    resetAll() {
     this.r_Jira.forEach((t: any) => {
     t.checked = false;
        });
    }
    sortSupport() {
        if (!this.isjirasorted) {
        this.r_Jira.forEach(element => {
           if (!(_.includes(element.Title, 'SUPPORT'))) {
                this.n_Jira.push(element);
           }
        });
        console.log(this.n_Jira);
        this.isjirasorted = true;
        }
    }
    jiraSelected(list: string , event: any){
        if (event.target.checked) {
                this.jiraSelectedList.push(list);
        } else {
            let index = this.jiraSelectedList.indexOf(list);
            this.jiraSelectedList.splice(index, 1);
        }

        console.log(this.jiraSelectedList);
    }

}
