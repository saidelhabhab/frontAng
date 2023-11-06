import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent  implements OnInit {
  

  orderForm! : FormGroup;

  constructor(
    private customerService:CustomerService,
    private fb:FormBuilder,
    private snackBar:MatSnackBar,
    public dialog: MatDialog,
    private router:Router
    ) { }


  ngOnInit() {
    this.orderForm = this.fb.group({
      address: [null,Validators.required],
      orderDescription: [null]
    });

  }

  placeOrder(){
    if (this.orderForm.valid){

      const data = {...this.orderForm.value};
       console.log('data to send', data);
       
      this.customerService.playerOrder(data).subscribe((res)=>{


          this.openSnackBar("Your Order has been placed successfully","OK");
          setTimeout(()=>{
            this.router.navigateByUrl('/customer/my-orders');
            },2000)
            this.closeForm();

       
        },err=>{
          this.openSnackBar("Error in placing the order","OK")
          })
          }else{
            this.openSnackBar("Please fill all fields correctly","OK");
            }
  }

  closeForm(){
    this.dialog.closeAll();
  }




  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      });

  }

}
