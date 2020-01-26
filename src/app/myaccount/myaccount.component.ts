import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Logger } from '../logger.service';
import { AppConst } from '../app-const';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  product = {
    name: '',
    price: 0,
    size: '',
    summary: '',
    priceDiscount: '',
    description: '',

    imageCover: null
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

  validate (product) {
    if (product.name) {
      if (product.price) {
        if (product.size) {
          if (product.description) {
            if (product.imageCover) {
              return true;
            } else {
              this.data.error('Please select product image.');
            }
          } else {
            this.data.error('Please enter description.');
          }
        } else {
          this.data.error('Please select size.');
        }
      } else {
        this.data.error('Please enter a price.');
      }
    } else {
      this.data.error('Please enter a name.');
    }
  }

  fileChange (event: any) {
    this.product.imageCover = event.target.files[0];
  }

  async post () {
    this.btnDisabled = true;
    try {
      if (this.validate(this.product)) {
        const form = new FormData();
        for (const key in this.product) {
          if (this.product.hasOwnProperty(key)) {
            if (key === 'imageCover') {
              form.append(
                'imageCover',
                this.product.imageCover,
                this.product.imageCover.name
              );
            } else {
              form.append(key, this.product[key]);
            }
          }
        }
        const data = await this.rest.post(
          AppConst.serverPath + '/api/v1/products',
          form
        );
        data
          ? this.router.navigate(['/shop'])
            .then(() => this.data.success('Product was saved successfully!!'))
            .catch(error => this.data.error(error))
          : this.data.error(data['message']);
      }
    } catch (error) {
      this.data.error(error.error.message);
    }
    this.btnDisabled = false;
  }

}
