import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {


  email = '';



  btnDisabled = false;

  constructor(
    private router: Router,
    private data: DataService,
    private rest: RestApiService,
  ) { }

  ngOnInit () { }

  validate () {

    if (this.email) {
      return true;
    } else {
      this.data.error('Email is not entered.');
    }

  }

  async forgetpassword () {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        const data = await this.rest.post(
          'https://newlooks-api.herokuapp.com/api/v1/users/forgotPassword',
          {

            email: this.email,

          },
        );
        if (data) {
          // localStorage.setItem('token', data['token']);
          //await this.data.getProfile();
          this.data.success('Password reset Email was sent successful!');
        } else {
          this.data.error(data['oops! a problem occured check the email again']);
        }
      }
    } catch (error) {
      this.data.error(error.error.message);
    }
    this.btnDisabled = false;
  }
}
