import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DemoAngularMateriel } from '../DemoAngularMateriel';

import { CostumersRoutingModule } from './customers-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { CustomersComponent } from './customers.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ViewOrderProductsComponent } from './components/view-order-products/view-order-products.component';
import { ReviewOrderedProductComponent } from './components/review-ordered-product/review-ordered-product.component';
import { ViewProductDetailComponent } from './components/view-product-detail/view-product-detail.component';
import { ViewWishlistComponent } from './components/view-wishlist/view-wishlist.component';


@NgModule({
  declarations: [
    CustomersComponent,
    DashboardComponent,
    CartComponent,
    PlaceOrderComponent,
    MyOrdersComponent,
    ViewOrderProductsComponent,
    ReviewOrderedProductComponent,
    ViewProductDetailComponent,
    ViewWishlistComponent
  ],
  imports: [
    CommonModule,
    CostumersRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DemoAngularMateriel
  ]
})
export class CustomersModule { }
