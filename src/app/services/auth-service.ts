import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserStorageService} from '../storage/user-storage-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService{

  Basic_URL="http://localhost:8000/"

  constructor(private http:HttpClient,private userStorageService:UserStorageService) { }


  ///////////////////////////////////////////////
  registerUser(signupRequest:any): Observable<any>{
    
    return this.http.post(this.Basic_URL+"sign-up", signupRequest);
  };

  ///////////////////////////////////////////////
  login(username:string, password:string):any{

    const headers = new HttpHeaders().set('Content-Type','Application/json');
    console.log("header : "+JSON.stringify(headers));
    const body={ username, password}
  
   
    return this.http.post(this.Basic_URL+'authenticate', body , {headers, observe:'response'}).pipe(
      map((res)=>{
        const token = res.headers.get('authorization').substring(7);
        const user = res.body;
        
        if(token && user){
          this.userStorageService.saveToken(token);
          this.userStorageService.saveUser(user);
          console.log("user and token : "+JSON.stringify(user)+token);
          return true;
        }
        return false;
      
    }))

  }


 





}
