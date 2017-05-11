import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Jsonp } from '@angular/http';
import { RequestJira } from '../object/request-jira';
import { ResponseJira } from '../object/response-jira';
import { JiraCreated } from '../object/jira-created';
import { JiraInCSV } from '../object/jira-in-csv';
import { Constant } from '../constants/constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/filter';
import * as _ from 'lodash';

@Injectable()
export class CreateJiraService {

  username: string;
  password: any;
  c_data: JiraInCSV[];
  r_data: ResponseJira[];
  createdJira: JiraCreated;
  constructor(private http: Http) { }

    getMetadata(): Observable<ResponseJira[]> {
        const url: string = Constant.csvFileURL;
        return this.http.get(url)
        .map((response: Response) => response.json())
        .catch(this.errorHandler);
    }
    errorHandler(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server Error');
    }
    authorize(u: string, p: string) {
        console.log(u , p);
    }
    createBulkJira(jira: RequestJira): Observable<Response> {
        this.username = 'admin';
        this.password = 'admin';
        const encode: string = btoa(this.username + ':' + this.password);
        const jiraCreationURL: string = Constant.baseURL + '/createJira';
        let body = JSON.stringify(jira);
        const headers = new Headers();
        headers.append('Content-Type', 'text/plain');
        headers.append('Access-Control-Allow-Origin', '*');

        //headers.append('Accept', 'application/json');
        //headers.append('Authorization', 'Basic '  + btoa(this.username + ':' + this.password));

        const options = new RequestOptions({ headers: headers});
        return this.http.post(jiraCreationURL, body, options)
        .map((res: Response) => res.json())
        .catch(this.jiraFailed);
    }
    jiraFailed(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server Error with Jira Creation');
    }
    getData() {
        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Content-Type', 'text/plain');
        let options = new RequestOptions({ headers: headers});
        return this.http.get('http://localhost:8045/hello', options)
        .map(res => res.text())
        .catch(this.jiraFailed);
    }
}
