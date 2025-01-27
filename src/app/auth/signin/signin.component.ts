import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { DataService } from 'src/app/data.service';
import { AppConst } from 'src/app/app-const';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email = '';
  password = '';

  btnDisabled = false;

  constructor(
    private router: Router,
    private rest: RestApiService,
    private data: DataService,
  ) { }

  ngOnInit () {


    this.data.logOut();

  }

  validate () {
    if (this.email) {
      if (this.password) {
        return true;
      } else {
        this.data.error('Password is not entered');
      }
    } else {
      this.data.error('Email is not entered.');
    }
  }

  async login () {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        const data = await this.rest.post(AppConst.serverPath +
          '/api/v1/users/login',
          {
            email: this.email,
            password: this.password,
          },
        );
        if (data) {
          localStorage.setItem('token', data['token']);
          //await this.data.getProfile();
          this.router.navigate(['/myaccount']);
        } else {
          this.data.error(data['message']);
          // console.log(data)
        }
      }
    } catch (error) {
      this.data.error(error.error.message);
      // console.log(error.error.message)
    }
    this.btnDisabled = false;
  }
}
