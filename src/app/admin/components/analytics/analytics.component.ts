import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  data:any;

  constructor(
    private adminService :AdminService,
    ){}



  ngOnInit(): void {
    this.adminService.getAnalytics().subscribe(res=>{
      console.log("response", res ); 
      
      this.data = res;
   
    })
  }



}
