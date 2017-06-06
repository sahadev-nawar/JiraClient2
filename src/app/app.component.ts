import { Component, OnInit, OnChanges, OnDestroy, ViewEncapsulation} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  title = 'app works!';
  loggedIn: boolean = false;
  log: string;
  tiles = [
    {text: 'One', cols: 3, rows: 4, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor (private http: Http, private login: LoginService, private router: Router) {}

    ngOnInit() {
     // localStorage.setItem('loggedIn' , 'false');
      this.loggedIn = false;
      this.log = 'false';
    }
    logout() {
      this.login.logout();
      console.log('this is logout  ' + localStorage.getItem('loggedIn'));
      this.router.navigate(['/login']);
    }
    ngDoCheck() {
      this.log = localStorage.getItem('loggedIn');
      if (this.log === 'true') {
        this.loggedIn = true;
      }else {
        this.loggedIn = false;
      }
    }
    ngOnDestroy(): void {
      localStorage.clear();
    }
}
