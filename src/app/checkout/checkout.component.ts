import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConst } from '../app-const';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  quantities = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    public data: DataService,
    private rest: RestApiService,
    private router: Router,


  ) { }
  myOrders: any;
  get cartItems () {
    return this.data.getCart();
  }

  get cartTotal () {
    let total = 0;
    this.cartItems.forEach((data, index) => {
      total += data['priceDiscount'] * this.quantities[index];
    });
    return total;
  }
  ngOnInit (


  ) {

    this.activatedRoute.params.subscribe(res => {
      this.rest
        .get(AppConst.serverPath + `/api/v1/orders/${res['id']}`)
        .then(data => {


          data


            ? (this.myOrders = data['data'].data)
            : this.router.navigate(['/myaccount']);
          console.log('HERE IS MY BRADDDY ORDER', this.myOrders)
        })
        .catch(error => this.data.error(error.error.message));
    });

    //cart
    this.cartItems.forEach(data => {
      this.quantities.push(1);
    });

    this.data.getProfile();

  }

  sendStuffs () {
    this.cartItems.forEach(data => {
      this.quantities.push(1);
    });


  }

}
