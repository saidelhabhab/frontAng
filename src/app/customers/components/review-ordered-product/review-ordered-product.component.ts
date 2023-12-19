import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStorageService } from 'src/app/storage/user-storage-service';

@Component({
  selector: 'app-review-ordered-product',
  templateUrl: './review-ordered-product.component.html',
  styleUrls: ['./review-ordered-product.component.scss']
})
export class ReviewOrderedProductComponent  implements OnInit{

  productId : number = this.activatedRoute.snapshot.params["productId"];
  reviewForm! : FormGroup;
  selectedFile : File |  null;
  imagePreview : string | ArrayBuffer| null;

  constructor(
    private fb : FormBuilder,
    private snackBar : MatSnackBar,
    private customerService : CustomerService,
    private router : Router,
    private activatedRoute : ActivatedRoute
  ){}
  ngOnInit(): void {
   
    this.reviewForm = this.fb.group({
      rating : [null,[Validators.required]],
      description : [null,[Validators.required]]
  })
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }


  submitForm(){

    //let data={...this.reviewForm.value}
    //console.log("data",data)

    const formData : FormData = new FormData();

    formData.append('img' , this.selectedFile);
    formData.append('productId' , this.productId.toString());
    formData.append('customerId' , UserStorageService.getUserId().toString())
    formData.append('rating' , this.reviewForm.get('rating').value);
    formData.append('description' , this.reviewForm.get('description').value);


    this.customerService.giveReview(formData).subscribe(res=>{

     // console.log("res ",res)

      if (res.id !=null){
      
        this.openSnackBar('Successfully added the Review','Close')
        setTimeout(()=>{
          this.router.navigateByUrl('/customer/my_orders')
          },2000)

     }else{
      this.openSnackBar('Error adding the Review','Close')
     }

    })
    
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      });

  }


}
