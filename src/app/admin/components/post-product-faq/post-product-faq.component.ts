import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-post-product-faq',
  templateUrl: './post-product-faq.component.html',
  styleUrls: ['./post-product-faq.component.scss']
})
export class PostProductFAQComponent implements OnInit {

  productId : number = this.activeRoute.snapshot.params["productId"]

  FAQForm! : FormGroup;

constructor( private fb : FormBuilder, private router:Router,
   private snackBar: MatSnackBar, private adminService: AdminService,
   private activeRoute : ActivatedRoute)
   {}

  ngOnInit(): void {

    this.FAQForm = this.fb.group({
      question: [null,[Validators.required]],
      answer:[null,[Validators.required]],

    })
   
  }


  postFAQ(){

    let data={...this.FAQForm.value}

    this.adminService.postFAQ(this.productId,data).subscribe(res=>{
     
     
      if (res.id !=null){
      
        this.openSnackBar('Successfully added the FAQ','Close')
        setTimeout(()=>{
          this.router.navigateByUrl('/admin/dashboard')
          },2000)

     }else{
      this.openSnackBar('Error adding the FAQ','Close')
     }
    })
  
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      });

  }

}
