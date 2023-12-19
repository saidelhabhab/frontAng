import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent  implements OnInit {

  order :any;
  constructor(private adminService:AdminService,private snackBar:MatSnackBar) {}


  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.adminService.getAllOrders().subscribe(res=>{
      //console.log("coupon", res);
      this.order = res;
    })
  }


  changeOrderStatus(orderId:number, status:string){
    this.adminService.changeOrderStatus(orderId,status).subscribe(res=>{
      console.log('response',res);

      if (res.id!=null) {

        this.snackBar.open("Order Status changed Successfully", "Close", { duration: 2000 });
        this.getOrders();
      }else{
        this.snackBar.open("Something went wrong!", "Close", { duration: 3000 });
      }
    },err =>{
      console.error('Error occured', err);
      }
      );
    
  }
  





  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      });

  }

}
