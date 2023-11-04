import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-post-coupon',
  templateUrl: './post-coupon.component.html',
  styleUrls: ['./post-coupon.component.scss']
})
export class PostCouponComponent implements OnInit {
  
  couponForm:FormGroup;



  constructor(
    private fb : FormBuilder,
    private snackBar:MatSnackBar,
    private adminService:AdminService,
    private router:Router
    ){}



  ngOnInit(): void {
    
    this.couponForm = this.fb.group({
      name: [null,Validators.required],
      code:[null,Validators.required],
      discount:[null,[Validators.required]],
      expirationDate:[null,Validators.required],
    })
  }


  addCoupon(){

    if(this.couponForm.valid){

      let data={...this.couponForm.value}

      this.adminService.addCoupon(data).subscribe(res=>{

        if(res.id != null){
           console.log("Added Successfully");
          this.openSnackBar('Coupon Added Successfully','OK');
          setTimeout(() => {
            this.router.navigateByUrl('/admin/dashboard');
            }, 2000);
        }else{
          console.log("Failed to Add Coupon")
          this.openSnackBar('Failed To Add Coupon','OK')
        }
        
      })

    }else {
      this.couponForm.markAllAsTouched();
    }
  }




  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      });

  }

}
