import { Component, OnInit } from '@angular/core';
import { UserStorageService} from './storage/user-storage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontAng';

 
  isCustomerLoggedIn : boolean = UserStorageService.isCustomerLoggedIn(); 
  isAdminLoggedIn : boolean = UserStorageService.isAdminLoggedIn();

  constructor(private router: Router){}


  ngOnInit(): void {
    this.router.events.subscribe(event=>{
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    })
  }

  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }

  



}
