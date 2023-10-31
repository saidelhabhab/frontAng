import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss']
})
export class PostCategoryComponent implements OnInit {
  
  categoryForm:FormGroup;
  hidePassword=true

  constructor(private fb : FormBuilder,
    private snackBar:MatSnackBar,
    private adminService:AdminService,
    private router:Router){

  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: [null,[Validators.required]],
      description:[null,[Validators.required]],

    
    })
  }

  addCategory():void{
    if(this.categoryForm.valid){
      let data={...this.categoryForm.value}
       console.log("data",data)

      this.adminService.addCategory(data).subscribe((res)=>{
        
        console.log('response', res);

        if (res['name']) {

          this.openSnackBar('Category added successfully','Close')

          setTimeout(()=>{
            this.router.navigateByUrl('/admin/dashboard')
            },2000)
            }
        })
              
    }else{
      this.categoryForm.markAllAsTouched();
      this.openSnackBar('Error adding Category','Close')
    }
  }

  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      });

  }
}
