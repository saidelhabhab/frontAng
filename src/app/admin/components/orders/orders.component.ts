import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent  implements OnInit {

  order :any;
  constructor(private adminService:AdminService) {}


  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.adminService.getAllOrders().subscribe(res=>{
      //console.log("coupon", res);
      this.order = res;
    })
  }

}
