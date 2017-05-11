import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  user: string;
  loggedIn: boolean;
    constructor() { }

    login (username: string, pass: string): boolean {
        console.log("i am raechin here " + username + pass);
        localStorage.setItem('currentuser', btoa(username + ':' + pass));
        this.user = localStorage.getItem('currentuser');
        console.log(localStorage.getItem('currentuser'));
        if (this.user === 'YWRtaW46YWRtaW4=') {
            localStorage.setItem('loggedIn', 'true');
            return true;
        }else {
            localStorage.setItem('loggedIn', 'false');
            return false;
        }
    }
    logout() {
        localStorage.setItem('currentuser', null);
        localStorage.setItem('loggedIn', 'false');
    }

}
