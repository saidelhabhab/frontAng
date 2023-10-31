import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  signUpForm:FormGroup;
  hidePassword=true

  constructor(private fb : FormBuilder,
    private snackBar:MatSnackBar,
    private authService:AuthService,
    private router:Router){

  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: [null,[Validators.required]],
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]]
    
    })
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(){

    const password = this.signUpForm.get('password')?.value;
    const confirmPassword = this.signUpForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.openSnackBar("Passwords do not match","Close");
      return ;
      }
    
    if(!this.signUpForm.valid) return;
    const user={...this.signUpForm.value}
    console.log('user',user);
    
    // send to server
    //call the service to register a new user
    this.authService.registerUser(user).subscribe((res)=>{
      console.log("Registered Successfully");
      this.openSnackBar("Registration successful","Close")
      setTimeout(()=>{
        this.router.navigate(['login'])
        },2000)
        },err =>{
          console.error(err);
          this.openSnackBar("Error in registration", "Close")
          });
}

openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 3000,
    });
}
 

}
