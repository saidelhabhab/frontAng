import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';
import { CostumerService } from '../../services/costumer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products :any[] = [];
  searchProductForm:FormGroup;

  constructor(
    private costumerService:CostumerService,
    private fb:FormBuilder,
    private snackBar:MatSnackBar,
    ) { }


  ngOnInit(): void {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title:[null,Validators.required]
    })
  }

  getAllProducts(){
    this.products = [];

    this.costumerService.getAllProducts().subscribe(res=>{
      res.forEach(element=>{
        element.processedImg ='data:image/jpeg;base64,'+element.byteImg;
        this.products.push(element);
      })
    })
  }

  submitForm (){
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.costumerService.getAllProductsByName(title).subscribe(res=>{
      res.forEach(element=>{
        element.processedImg ='data:image/jpeg;base64,'+element.byteImg;
        this.products.push(element);
      })
      console.log("product"+ this.products);
    })
  }

  addToCart(id:any){
    //console.log("id "+ id)
    this.costumerService.addToCart(id).subscribe(res=>{
      
      this.snackBar.open("Product added to cart Successfully", "Close", { duration: 4000 });
      console.log("res "+ res)
    })

  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      });

  }

}
