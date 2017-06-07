import { Injectable } from '@angular/core';
import {} from '';
import { Http, Response, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Constant } from '../constants/constants';
import { ResponseJira } from '../object/response-jira';

@Injectable()
export class UploadCSVService {

  constructor(private http: Http) { }
  upload(fileToUpload: any): Observable<ResponseJira[]> {
    let input = new FormData();
    input.append('file', fileToUpload);
    const headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', 'text/plain');

    const options = new RequestOptions({ headers: headers});
    return this.http.post(Constant.baseURL + '/convert', input)
                    .map(res => res.json())
                    .catch(this.jiraFailed);
  }
  jiraFailed(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server Error with Jira Creation');
    }
}
