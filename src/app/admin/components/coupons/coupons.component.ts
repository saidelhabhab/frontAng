import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {

  coupons :any;
  constructor(private adminService:AdminService) {}


  ngOnInit(): void {
    this.getCoupons();
  }

  getCoupons(){
    this.adminService.getAllCoupon().subscribe(res=>{
      //console.log("coupon", res);
      this.coupons = res;
    })
  }

}
