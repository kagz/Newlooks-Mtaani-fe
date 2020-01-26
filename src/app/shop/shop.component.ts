import { Component, OnInit } from '@angular/core';
import { Logger } from '../logger.service';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';
import { AppConst } from '../app-const';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  searchTerm = '';
  query: string;
  products: any;
  page: 1;
  private serverPath = AppConst.serverPath;
  constructor(private data: DataService, private rest: RestApiService) { }
  search () {
    if (this.searchTerm) {
      {
        this.query = this.searchTerm;
      }

    }
  }
  async ngOnInit () {
    this.page = 1;

    this.getProducts();
  }
  async getProducts () {

    try {
      const res = await this.rest.get
        (AppConst.serverPath + `/api/v1/products?sort=${this.query}&page=${this.page}`);
      res
        ? (this.products = res['data'].data)
        : this.data.error('Could not fetch products.');
    } catch (error) {
      this.data.error(error);
    }
  }










  // products: any;

  // constructor(private data: DataService, private rest: RestApiService) { }

  // async ngOnInit () {
  //   try {
  //     const res = await this.rest.get('https://newlooks-api.herokuapp.com/api/v1/products');
  //     //console.log(res['data']);

  //     res
  //       ? (this.products = res['data'].data)
  //       : this.data.error('Could not fetch products.');
  //     //ng serve console.log('WTF IS WRONG ',this.products);
  //   } catch (error) {
  //     this.data.error(error);
  //   }
  // }


}

