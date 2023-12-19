import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { UserStorageService } from '../storage/user-storage-service';
import { RecaptchaService } from '../services/recaptcha.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm : FormGroup;
  hidePassword = true;

  constructor(private fb : FormBuilder,
    private snackBar:MatSnackBar,
    private authService:AuthService,
    private router:Router,
    private recaptchaService: RecaptchaService){

  }


  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required]]
    
    })
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }


  onSubmit(){

    const password = this.loginForm.get('password')?.value;
    const email = this.loginForm.get('email')?.value;

    if(!email || !password) return;

    this.authService.login(email,password).subscribe((res)=>{

      
      
      if(UserStorageService.isAdminLoggedIn()){
        
        console.log("Login Successfully _Admin");
        this.openSnackBar("Registration successful","Close")
        setTimeout(()=>{
          this.router.navigateByUrl('admin/dashboard');
          },2000)
      }
      else if(UserStorageService.isCostumerLoggedIn()){
        
        console.log("Registered Successfully");
        this.openSnackBar("Registration successful","Close")
        setTimeout(()=>{
          this.router.navigateByUrl('customer/dashboard');
          },2000)
      }

      else{
        console.error("Error in login => "+ UserStorageService.isAdminLoggedIn());
        console.error("Something went wrong");
        this.openSnackBar("Something went wrong","Close")
        setTimeout(()=>{
          this.router.navigateByUrl('login')
          },2000)
      }

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


//recaptchaService

  executeRecaptcha() {
    this.recaptchaService.executeRecaptcha('action_name')
      .then((token: string) => {
        // Use the token as needed, e.g., send it to your backend for validation
        console.log('reCAPTCHA token:', token);
      })
      .catch((error: any) => {
        console.error('reCAPTCHA error:', error);
      });
  }
}
