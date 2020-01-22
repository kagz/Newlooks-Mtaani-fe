import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Logger } from '../logger.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  product = {
    title: '',
    price: 0,
    categoryId: '',
    description: '',
    product_picture: null
  };



  categories: any;
  btnDisabled = false;

  constructor(
    private logger: Logger,
    private data: DataService,
    private rest: RestApiService,
    private router: Router
  ) {




  }

  ngOnInit () {

    this.data.getProfile();

  }

}
