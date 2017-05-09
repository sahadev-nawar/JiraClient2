import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Jsonp} from '@angular/http';
import { RequestJira } from '../object/request-jira';
import { ResponseJira } from '../object/response-jira';
import { JiraCreated } from '../object/jira-created';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/filter';
import * as _ from 'lodash';

@Injectable()
export class CreateJiraService {

  username: string;
  password: any;
  constructor(private http: Http) { }

    getMetadata(): Observable<ResponseJira[]> {
        const url: string = 'src/assets/c_export.json';
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
}
