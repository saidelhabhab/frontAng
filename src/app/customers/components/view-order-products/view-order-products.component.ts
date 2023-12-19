import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-view-order-products',
  templateUrl: './view-order-products.component.html',
  styleUrls: ['./view-order-products.component.scss']
})
export class ViewOrderProductsComponent implements OnInit {

  orderId = this.activatedRoute.snapshot.params['orderId'];
  orderedProductDetailsList = [];
  totalAmount:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService:CustomerService
  ){}


  ngOnInit(): void {
    this.getOrderProductsDetailsByOrderId();
  }

  getOrderProductsDetailsByOrderId(){

    this.customerService.getOrderProduct(this.orderId).subscribe(res=>{
      console.log("Order Product Details : ", res);
      res.productDtoList.forEach(element =>{
        element.processedImg = 'data:image/png;base64,' +element.byteImg;
        this.orderedProductDetailsList.push(element);
      });
      this.totalAmount = res.orderAmount;
    })
  }

}
