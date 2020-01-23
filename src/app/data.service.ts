import { Injectable } from '@angular/core';

import { NavigationStart, Router } from '@angular/router';

import { RestApiService } from './rest-api.service';

@Injectable()
export class DataService {
  message = '';
  messageType = 'danger';

  user: any;
  cartItems = 0;

  constructor(private router: Router, private rest: RestApiService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.message = '';
      }
    });
  }

  error (message) {
    this.messageType = 'danger';
    this.message = message;
  }

  success (message) {
    this.messageType = 'success';
    this.message = message;
  }

  warning (message) {
    this.messageType = 'warning';
    this.message = message;
  }

  async getProfile () {
    try {
      if (localStorage.getItem('token')) {
        const data = await this.rest.get(
          'https://newlooks-api.herokuapp.com/api/v1/users/me',//http://newlooks-api.herokuapp.com//
        );
        console.log('HERE TRYING TO PRINT', data);
        this.user = data['data'].data;

      }
    } catch (e) {
      console.log('HERE TRYING TO PRINT ERRR', e);
      // this.error(e);
    }
  }
  async logOut () {
    try {
      this.clearToken()
      const data = await this.rest.get(
        'https://newlooks-api.herokuapp.com/api/v1/users/logout',//http://newlooks-api.herokuapp.com//
      );
      console.log('HERE WE LEFT THE APP', data);


    } catch (e) {
      console.log('HERE TRYING TO REFT', e);
      // this.error(e);
    }
  }
  getCart () {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  addToCart (item: string) {
    const cart: any = this.getCart();
    if (cart.find(data => JSON.stringify(data) === JSON.stringify(item))) {
      return false;
    } else {
      cart.push(item);
      this.cartItems++;
      localStorage.setItem('cart', JSON.stringify(cart));
      return true;
    }
  }

  removeFromCart (item: string) {
    let cart: any = this.getCart();
    if (cart.find(data => JSON.stringify(data) === JSON.stringify(item))) {
      cart = cart.filter(data => JSON.stringify(data) !== JSON.stringify(item));
      this.cartItems--;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  clearCart () {
    this.cartItems = 0;
    localStorage.setItem('cart', '[]');
  }

  clearToken () {

    //localStorage.setItem('token', '[]');
    this.user = {};
    this.cartItems = 0;
    localStorage.clear();
    this.router.navigate(['/signin']);

  }

}
