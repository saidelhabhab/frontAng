import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  myOrders :any;

  constructor(private customerService : CustomerService) {}

  ngOnInit(): void {
   this.getMyOrder();
  }

  getMyOrder(){

    this.customerService.getOrderByCustomerId().subscribe((data)=>{
      console.log("order data",data);
      
    
        this.myOrders = data;
        
    })

  }

}
