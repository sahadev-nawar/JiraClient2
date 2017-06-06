import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ResponseJira } from '../../object/response-jira';
import { RequestJira } from '../../object/request-jira';
import { JiraCreated } from '../../object/jira-created';
import { Observable } from 'rxjs/Observable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { CreateJiraService } from '../../services/create-jira.service';
import * as _ from 'lodash';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { JiraHpsmMap } from '../../object/jira-hpsm';
import { CSVToJsonComponent } from '../csvto-json/csvto-json.component';
import {AuthorizeComponent} from '../authorize/authorize.component';
import { ComingSoonComponent } from '../coming-soon/coming-soon.component';

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
isjirasorted: boolean;
req_Jira: RequestJira[] = [];
d_Jira: ResponseJira[] = [];
jira_success: JiraCreated;
some: Response;
closeResult: string;
jira_Response: JiraCreated;
list_Jira_Created: JiraHpsmMap[] = [];
jiraHpsm: JiraHpsmMap;
in_Progress_Spinner: boolean;
record_not_available: string;
is_csv_uploaded: boolean = true;
  constructor(private createJiraService: CreateJiraService, private http: Http, private modalService: NgbModal) { }

  ngOnInit() {
      console.log(localStorage.getItem('is_jira_sorted_ldb') === 'true');
   if (localStorage.getItem('is_jira_sorted_ldb') === 'true') {
       //this.isjirasorted = true;
        console.log('this is stored in localstorage ' + localStorage.getItem('sorted_jira_list_display'));
        this.n_Jira = JSON.parse(localStorage.getItem('sorted_jira_list_display'));
    }
  }
  ngAfterViewChecked() {
    const csvtojson: CSVToJsonComponent = new CSVToJsonComponent(null, null);
    this.r_Jira = JSON.parse(localStorage.getItem('r_Jira'));
    // this.isjirasorted = false;
    //    if (!this.isjirasorted) {
    //     console.log('this is stored in localstorage ' + localStorage.getItem('sorted_jira_list_display'));
    //     this.n_Jira = JSON.parse(localStorage.getItem('sorted_jira_list_display'));
    // }
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
        if (this.r_Jira === null) {
            this.is_csv_uploaded = false;
            this.record_not_available = 'Please Upload the CSV File';
        }else {
            this.is_csv_uploaded = true;
            if (!this.isjirasorted) {
                if (this.n_Jira != null) {
                    this.n_Jira.splice(0, this.n_Jira.length);
                }
                this.r_Jira.forEach(element => {
                if (!(_.includes(element.Title, 'SUPPORT'))) {
                    this.n_Jira.push(element);
                    }
                });
            this.isjirasorted = true;
            localStorage.setItem('is_jira_sorted_ldb', 'true');
            localStorage.setItem('sorted_jira_list_display', JSON.stringify(this.n_Jira)) ;
            }
        }
    }
    jiraSelected(list: string , event: any) {
        if (event.target.checked) {
                this.jiraSelectedList.push(list);
        } else {
            const index = this.jiraSelectedList.indexOf(list);
            this.jiraSelectedList.splice(index, 1);
        }

        console.log(this.jiraSelectedList);
    }
    createJira() {
        let a_Jira: ResponseJira = new ResponseJira();
        let test: string;
        this.in_Progress_Spinner  = true;
        if (this.allJiraSelected) {

        }else {
            this.jiraSelectedList.forEach(element => {
            a_Jira = _.find(this.r_Jira, function(o){return o['Incident ID'] === element; });
            this.d_Jira.push(a_Jira);
        });
        console.log("this is selected Jira " + this.d_Jira);
        console.log("this is a_Jira " + a_Jira);
             for (let i = 0; i < this.d_Jira.length; i++) {
                let request: RequestJira = new RequestJira();
                request.fields.project.key = 'HPSMTOJ';
                request.fields.summary = this.d_Jira[i].Title;
                request.fields.description = this.d_Jira[i].Description;
                request.fields.issuetype.name = 'Bug';
                request.fields.issuetype.id = '10000';
                request.fields.customfield_10002 = 'admin';
                request.fields.assignee.name = '';
                request.fields.priority.id = '3';
                this.req_Jira.push(request);
                }
                this.req_Jira.forEach(element => {
                    this.createJiraService.createBulkJira(element)
                    .subscribe( data => {
                        test = data;
                        this.jira_Response = JSON.parse(test);
                        console.log('Json response: ' + JSON.stringify(this.jira_Response));
                        if (this.jira_Response === null) {
                            console.log('jira response is null');
                            alert('Jira server is down');
                        }else {
                            this.in_Progress_Spinner = false;
                            let done = JiraCreated [100] = [];
                            done.push(this.jira_Response);
                            console.log(JSON.stringify(this.jira_Response.key));
                            this.mapdata(element, this.jira_Response.key);
                        }
                    });
                });
            }
    }
    getdata() {
        let test: string;
        this.createJiraService.getData()
                 .subscribe( data => {
                     test = data;
                    console.log(test);
                });
    }
    mapdata(req: RequestJira, res: string ) {
        if (req != null) {
            const jirahpsm: JiraHpsmMap =  new JiraHpsmMap();
            jirahpsm.Hpsm_id = req.fields.summary;
            jirahpsm.Jira_id = res;
            this.list_Jira_Created.push(jirahpsm);
            console.log(JSON.stringify(this.list_Jira_Created));
            this.n_Jira.forEach(element => {
                if (element.Title === jirahpsm.Hpsm_id) {
                    element.jiraCreated = jirahpsm.Jira_id;
                }
            });
            localStorage.setItem('sorted_jira_list_display', JSON.stringify(this.n_Jira)) ;
        }
    }
    // below is code for Modal of info button
    open(content, list: string , event: any) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
    }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
