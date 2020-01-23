import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name = '';
  email = '';
  password = '';
  password1 = '';
  // isSeller = false;

  btnDisabled = false;

  constructor(
    private router: Router,
    private data: DataService,
    private rest: RestApiService,
  ) { }

  ngOnInit () {



    this.data.logOut();



  }

  validate () {
    if (this.name) {
      if (this.email) {
        if (this.password) {
          if (this.password1) {
            if (this.password === this.password1) {
              return true;
            } else {
              this.data.error('Passwords do not match.');
            }
          } else {
            this.data.error('Confirmation Password is not entered');
          }
        } else {
          this.data.error('Password is not entered');
        }
      } else {
        this.data.error('Email is not entered.');
      }
    } else {
      this.data.error('Name is not entered.');
    }
  }

  async register () {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        const data = await this.rest.post(
          'https://newlooks-api.herokuapp.com/api/v1/users/signup',
          {
            name: this.name,
            email: this.email,
            password: this.password,
            passwordConfirm: this.password1,
          },
        );
        if (data) {
          localStorage.setItem('token', data['token']);
          //await this.data.getProfile();
          this.data.success('Registration successful!');
          this.router.navigate(['/myaccount']);
        } else {
          this.data.error(data['message']);
        }
      }
    } catch (error) {
      this.data.error(error.error.message);
    }
    this.btnDisabled = false;
  }
}
