import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  btnDisabled = false;
  handler: any;

  quantities = [];

  product: any;
  constructor(
    private data: DataService,
    private rest: RestApiService,
    private router: Router,
  ) { }

  trackByCartItems (index: number, item: any) {
    return item._id;
  }

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

  removeProduct (index, product) {
    this.quantities.splice(index, 1);
    this.data.removeFromCart(product);
  }

  addToCart () {
    this.data.addToCart(this.product)
      ? this.data.success('Product successfully added to cart.')
      : this.data.error('Product has already been added to cart.');
  }
  ngOnInit () {
    this.cartItems.forEach(data => {
      this.quantities.push(1);
    });
    // this.handler = StripeCheckout.configure({
    //   key: environment.stripeKey,
    //   image: 'assets/img/logo.png',
    //   locale: 'auto',
    //   token: async stripeToken => {
    //     let products;
    //     products = [];
    //     this.cartItems.forEach((d, index) => {
    //       products.push({
    //         product: d['_id'],
    //         quantity: this.quantities[index],
    //       });
    //     });

    //     try {
    //       const data = await this.rest.post(
    //         'https://newlooks-api.herokuapp.com/api/payment',
    //         {
    //           totalPrice: this.cartTotal,
    //           products,
    //           stripeToken,
    //         },
    //       );
    //       data['success']
    //         ? (this.data.clearCart(), this.data.success('Purchase Successful.'))
    //         : this.data.error(data['message']);
    //     } catch (error) {
    //       this.data.error(error['message']);
    //     }
    //   },
    // });
  }

  validate () {
    if (!this.quantities.every(data => data > 0)) {
      this.data.warning('Quantity cannot be less than one.');
    } else if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']).then(() => {
        this.data.warning('You need to login before making a purchase.');
      });
    } else if (!this.data.user['address']) {
      this.router.navigate(['/profile/address']).then(() => {
        this.data.warning('You need to login before making a purchase.');
      });
    } else {
      this.data.message = '';
      return true;
    }
  }
  saveOrder () { 



  }
  checkout () {
    // this.btnDisabled = true;
    // try {
    //   if (this.validate()) {
    //     this.handler.open({
    //       name: 'Amazono',
    //       description: 'Checkout Payment',
    //       amount: this.cartTotal * 100,
    //       closed: () => {
    //         this.btnDisabled = false;
    //       },
    //     });
    //   } else {
    //     this.btnDisabled = false;
    //   }
    // } catch (error) {
    //   this.data.error(error);
  }

}
