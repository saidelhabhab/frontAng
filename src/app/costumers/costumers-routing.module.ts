import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CostumersComponent } from './costumers.component';
import { CartComponent } from './components/cart/cart.component';


const routes: Routes = [
  { path: '', component: CostumersComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostumersRoutingModule { }
