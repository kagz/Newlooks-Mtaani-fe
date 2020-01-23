import { Component, OnInit } from '@angular/core';
import { Logger } from '../logger.service';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: any;

  constructor(private data: DataService, private rest: RestApiService) { }

  async ngOnInit () {
    try {
      const res = await this.rest.get('https://newlooks-api.herokuapp.com/api/v1/products');
      //console.log(res['data']);

      res
        ? (this.products = res['data'].data)
        : this.data.error('Could not fetch products.');
      //ng serve console.log('WTF IS WRONG ',this.products);
    } catch (error) {
      this.data.error(error);
    }
  }
}


  // products: any;
  // page: 1;
  // constructor(private data: DataService, private rest: RestApiService) { }

  // async ngOnInit () {
  //   this.page = 1;
  //   this.getProducts();
  // }
  // async getProducts () {
  //   try {
  //     const res = await this.rest.get
  //       (`https://newlooks-api.herokuapp.com/api/v1/products?page=${this.page}`);
  //     res
  //       ? (this.products = res['data'].data)
  //       : this.data.error('Could not fetch products.');
  //   } catch (error) {
  //     this.data.error(error);
  //   }
  // }
