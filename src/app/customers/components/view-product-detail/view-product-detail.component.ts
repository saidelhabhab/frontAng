import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStorageService } from 'src/app/storage/user-storage-service';

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrls: ['./view-product-detail.component.scss']
})
export class ViewProductDetailComponent implements OnInit{

  productId : number = this.activatedRoute.snapshot.params["productId"];
  product : any;
  FAQS: any[] = [];
  reviews: any[] = [];

  constructor(
    private customerService : CustomerService,
    private activatedRoute : ActivatedRoute,
    private snackBar:MatSnackBar,
    private router:Router
  ){}


  ngOnInit(): void {
   this.getProductDetailById();
  }

  getProductDetailById(){
    this.customerService.getProductDetailById(this.productId).subscribe(res=>{
      this.product = res.productDto;
      this.product.processedImg = 'data:image/png;base64,' + res.productDto.byteImg;

      this.FAQS = res.faqDtoList;

      res.reviewDtoList.forEach(element=>{
        element.processedImg = 'data:image/png;base64,' + element.returnedImg;+
      this.reviews.push(element);
      })
    })
  }


  addToWishlist(){


    const wishlistDto = {
      productId : this.productId,
      customerId : UserStorageService.getUserId()
    }

    this.customerService.addProductToWishlist(wishlistDto).subscribe(res=>{


      if (res.id != null) {     

        this.openSnackBar("Product added to Wishlist","OK");
        setTimeout(()=>{
          this.router.navigateByUrl('/customer/wishlist');
          },2000)     
        
        }else{
          
          this.openSnackBar("Already in Wishlist","ERROR");
           
        }
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      });

  }


}
