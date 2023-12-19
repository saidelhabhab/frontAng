import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-view-wishlist',
  templateUrl: './view-wishlist.component.html',
  styleUrls: ['./view-wishlist.component.scss']
})
export class ViewWishlistComponent implements OnInit {

  products : any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService:CustomerService
  ){}


  ngOnInit(): void {
    this.getWishlistByCustomerId();
  }


  getWishlistByCustomerId(){
    this.customerService.getProductToWishlist().subscribe((data)=>{
      console.log('Data Wishlist By Id ', data);

      if(!data.error){
        data.forEach(element=>{
          element.processedImg = 'data:image/png;base64,'+element.returnedImg;
        this.products.push(element)
      })
        
        }else{
          alert("Error");
          }
    })
  }

}
