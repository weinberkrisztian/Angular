import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import{HttpClientModule} from '@angular/common/http';
import { ProductServiceService } from './service/product-service.service';
import { Routes,RouterModule } from '@angular/router';
import { ProductListMenuComponent } from './components/product-list-menu/product-list-menu.component';
import{SearchListComponent} from './components/search-list/search-list.component';
import { ProductDetailListComponent } from './components/product-detail-list/product-detail-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

// declaring the routes and also importing them(RouterModule)
const routes: Routes=[
{path:'checkout', component: CheckoutComponent},  
{path:'cart-details', component: CartDetailsComponent},  
{path:'products/:id', component: ProductDetailListComponent},
{path:'search/:keyword', component: ProductListComponent} , 
{path:'category/:id/:name' , component:  ProductListComponent},
{path:'category' , component:  ProductListComponent},
{path:'products' , component:  ProductListComponent},
{path:'' , redirectTo:'/products', pathMatch:'full'},
{path:'**' , redirectTo:'/products', pathMatch:'full'}

];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductListMenuComponent,
    SearchListComponent,
    ProductDetailListComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [ProductServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
