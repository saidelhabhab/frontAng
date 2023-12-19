import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements OnInit {
  
  productForm:FormGroup;
  listOfCategories:any =[];
  selectedFile :File | null;
  imagePreview:string| ArrayBuffer | null;
  dialogRef: any;


  constructor(
    private fb : FormBuilder,
    private snackBar:MatSnackBar,
    private adminService:AdminService,
    private router:Router
    ){}

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


  ngOnInit(): void {
    this.productForm = this.fb.group({

      categoryId:[null,Validators.required],
      name: [null,Validators.required],
      price:[null,Validators.required],
      description:[null]
      
      
    });

    this.getAllCategories();
  }

  getAllCategories(){
   this.adminService.getAllCategories().subscribe((res)=>{
      
       console.log("categories", res)
        this.listOfCategories=res;
    })
  }

  addProduct():void{
    let data={...this.productForm.value}
    console.log("data before ",data)

    if(this.productForm.valid){

      let data={...this.productForm.value}
       console.log("data",data)

      const formData : FormData = new FormData()
      formData.append('img',this.selectedFile);
      formData.append('categoryId',this.productForm.get('categoryId').value);
      formData.append('description',this.productForm.get('description').value);
      formData.append('name',this.productForm.get('name').value);
      formData.append('price',this.productForm.get('price').value);
     
      this.adminService.addProduct(formData).subscribe((res) =>{
        
        console.log("results : " +res)
        alert("Added Successfully");

        if (res.id !=null) {
          
          this.router.navigateByUrl('/admin/dashboard');
          this.snackBar.open('Product added successfully','OK',{duration:3000})
          this.dialogRef.close();
        }else{
            this.snackBar.open('Failed to add product','OK',{duration:3000})
        }
      },err=>console.error(err));
            

    }else{
      for(const i in this.productForm.controls){
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
      alert("not Successfully");    

    }
    
    
  }

}
