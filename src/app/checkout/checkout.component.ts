import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  quantities = [];
  constructor(
    private data: DataService,
    private rest: RestApiService,
    private router: Router,

  ) { }

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
    this.cartItems.forEach(data => {
      this.quantities.push(1);
    });
  }

  sendStuffs () {
    this.cartItems.forEach(data => {
      this.quantities.push(1);
    });


  }

}
