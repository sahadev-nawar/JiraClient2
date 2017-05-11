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
some: Response;

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
    createJira() {
                let a_Jira: ResponseJira = new ResponseJira();
        if (this.allJiraSelected) {

        }else {
            this.jiraSelectedList.forEach(element => {
             a_Jira = _.find(this.r_Jira, function(o){return o['Incident ID'] === element; });
             this.d_Jira.push(a_Jira);
            });
            console.log("this is inside jira" + this.d_Jira);
             //this.req_Jira.splice(0, this.req_Jira.length);
             //this.req_Jira.length = 0;
             for (let i = 0; i < this.d_Jira.length; i++) {
                let request: RequestJira = new RequestJira();
                request.fields.project.key = 'HPSHTOJ';
                request.fields.summary = this.d_Jira[i].Title;
                request.fields.description = this.d_Jira[i].Description;
                //request.fields.issuetype.id = this.d_Jira[i]['Incident ID'];
                //request.fields.issuetype.name = 'Task';
                //request.fields.customfield_10002 = 'admin';
                // // request.fields.components.components.forEach(e => {
                // //  e.name = 'Kasia2';
                // //  });
                request.fields.assignee.name = this.d_Jira[i].Assignee;
                request.fields.priority.id = 3;
                this.req_Jira.push(request);
             }
             this.req_Jira.forEach(element => {
                 console.log('element ' + JSON.stringify(element));
                 this.createJiraService.createBulkJira(element)
                 .subscribe(resData => this.some = resData,
                   resErr => this.errMsg = resErr );
             });
            //console.log('response ' + JSON.parse(this.some));
        }
        console.log('record is trying to insert in jira ' + JSON.stringify(this.jira_success));
    }

}
