import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { FoodAndBeverageComponent } from './food-and-beverage/food-and-beverage.component';
import { ContactComponent } from './contact/contact.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgetpasswordComponent } from './auth/forgetpassword.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './shop/product/product.component';

const routes: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartComponent },
  { path: 'food-and-beverage', component: FoodAndBeverageComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'myaccount', component: MyaccountComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: '', component: HomeComponent },
  {
    path: '**',
    redirectTo: '',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
