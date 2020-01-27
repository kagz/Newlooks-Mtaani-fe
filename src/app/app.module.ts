import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './shop/product/product.component';
import { FoodAndBeverageComponent } from './food-and-beverage/food-and-beverage.component';

import { ContactComponent } from './contact/contact.component';

import { MyaccountComponent } from './myaccount/myaccount.component';

import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ForgetpasswordComponent } from './auth/forgetpassword.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { NavtabsComponent } from './navigation/navtabs/navtabs.component';
import { RestApiService } from './rest-api.service';
import { DataService } from './data.service';
import { AuthGuard } from './auth-guard.service';
import { MessageComponent } from './message/message.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Logger } from './logger.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    ProductComponent,
    FoodAndBeverageComponent,

    ContactComponent,

    MyaccountComponent,
    MessageComponent,
    CartComponent,
    CheckoutComponent,
    ForgetpasswordComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    NavtabsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [RestApiService, DataService, AuthGuard, Logger],
  bootstrap: [AppComponent]
})
export class AppModule { }
