import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LoginInfo } from '../../object/login-info';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css'],
  providers: [LoginService]
})
export class AuthorizeComponent implements OnInit {
  public jiraAuth: LoginInfo;
  AuthForm: FormGroup;
  username: string;
  password: string;
  user: string;
  constructor(private logon: LoginService, private router: Router) {  }

  ngOnInit() {
    this.jiraAuth = {
        username: '',
        password: ''
    };
    this.AuthForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });
  }
  redirect() {
    this.router.navigate(['bulkCreate']);
  }
  loginForSingle() {
    if (this.logon.login(this.AuthForm.get('username').value, this.AuthForm.get('password').value)) {
      this.redirect();
      console.log(localStorage.getItem('loggedIn'));
      console.log(localStorage.getItem('currentuser'));
      return localStorage.getItem('loggedIn');
    }else {
     alert('Please check the username or password');
    }
  }

}
