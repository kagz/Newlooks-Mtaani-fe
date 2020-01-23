import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  myReview = {

    review: '',
    rating: 0,
  };
  btnDisabled = false;

  product: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private rest: RestApiService,
    private router: Router,
  ) { }


  ngOnInit () {
    this.activatedRoute.params.subscribe(res => {
      this.rest
        .get(`https://newlooks-api.herokuapp.com/api/v1/products/${res['id']}`)
        .then(data => {
          data


            ? (this.product = data['data'].data)
            : this.router.navigate(['/shop']);

        })
        .catch(error => this.data.error(error.error.message));
    });
  }

  addToCart () {
    this.data.addToCart(this.product)
      ? this.data.success('Product successfully added to cart.')
      : this.data.error('Product has already been added to cart.');
  }


  postReview () {
    this.btnDisabled = true;
    this.activatedRoute.params.subscribe(async res => {
      try {


        const data = await this.rest.post(`https://newlooks-api.herokuapp.com/api/v1/products/${res['id']}/reviews`, {
          // productId: this.product._id,

          review: this.myReview.review,
          rating: this.myReview.rating,
        });
        data
          ? this.data.success('Review successfully saved.')
          : this.data.error(data['message']);
        this.btnDisabled = false;
        this.router.navigate(['/shop']);
      } catch (error) {
        this.data.error(error.error.message);
      }

    });



  }

}