import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DemoAngularMateriel } from '../DemoAngularMateriel';
import { CostumersComponent } from './costumers.component';
import { CostumersRoutingModule } from './costumers-routing.module';
import { CartComponent } from './components/cart/cart.component';


@NgModule({
  declarations: [
    CostumersComponent,
    DashboardComponent,
    CartComponent
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
