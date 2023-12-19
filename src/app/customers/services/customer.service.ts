import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/storage/user-storage-service';


const Basic_URL="http://localhost:8000/"

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  constructor(private http: HttpClient) { }

 /////////////////////////////////////////

  getAllProducts(): Observable<any>{
    return this.http.get(Basic_URL+ "api/customer/products",{
      headers:this.createAuthorizationHeader()
    });
  }

  getAllProductsByName(name:any): Observable<any>{
    return this.http.get(Basic_URL+ `api/customer/search/${name}`,{
      headers:this.createAuthorizationHeader()
    });
  }

 /////////////////////////////////////////

   addToCart(productId:any): Observable<any>{
    
    const cartDto = {  
      productId : productId,   
      customerId: UserStorageService.getUserId(),
    }

    console.log("cartDto" + JSON.stringify(cartDto))


    return this.http.post(Basic_URL+ `api/customer/cart`,cartDto , {
      headers:this.createAuthorizationHeader()
    });
  }


  getCartByCustomerId(): Observable<any>{
    
    const customerId = UserStorageService.getUserId();

    return this.http.get(Basic_URL+ `api/customer/cart/${customerId}`, {
      headers:this.createAuthorizationHeader()
    });
  }
  

  /////////////////////////////////////////

  applyCoupon(code:any): Observable<any>{
    
    const customerId = UserStorageService.getUserId();

    return this.http.get(Basic_URL+ `api/customer/coupon/${customerId}/${code}`, {
      headers:this.createAuthorizationHeader()
    });
  }


  increaseProductQuantity(productId:any): Observable<any>{
    
    const cartDto = {  
      productId : productId,   
      customerId: UserStorageService.getUserId(),
    }

     return this.http.post(Basic_URL+ `api/customer/addition`,cartDto , {
      headers:this.createAuthorizationHeader()
    });
  }


  decreaseProductQuantity(productId:any): Observable<any>{
    
    const cartDto = {  
      productId : productId,   
      customerId: UserStorageService.getUserId(),
    }

     return this.http.post(Basic_URL+ `api/customer/deduction`,cartDto , {
      headers:this.createAuthorizationHeader()
    });
  }

  
  /////////////////////////////////////////

  playerOrder(orderDto:any): Observable<any>{
    
     orderDto.customerId = UserStorageService.getUserId();

    return this.http.post(Basic_URL+ `api/customer/placeOrder`, orderDto, {
      headers:this.createAuthorizationHeader()
    });
  }

  
  getOrderByCustomerId(): Observable<any>{
    
    const customerId  = UserStorageService.getUserId();

   return this.http.get(Basic_URL+ `api/customer/MyOrders/${customerId}`, {
     headers:this.createAuthorizationHeader()
   });
 }


 getOrderProduct(orderId:number): Observable<any>{

 return this.http.get(Basic_URL+ `api/customer/order-products/${orderId}`, {
   headers:this.createAuthorizationHeader()
 });
}

/////////////////////////////////////////

giveReview(reviewDto:any): Observable<any>{

  return this.http.post(Basic_URL+ `api/customer/review`,reviewDto , {
    headers:this.createAuthorizationHeader()
  });
 }

 getProductDetailById(productId:number): Observable<any>{

  return this.http.get(Basic_URL+ `api/customer/product/${productId}`, {
    headers:this.createAuthorizationHeader()
  });
 }

  /////////////////////////////////////////

  addProductToWishlist(wishlistDto:any): Observable<any>{

    return this.http.post(Basic_URL+ `api/customer/wishlist`,wishlistDto , {
      headers:this.createAuthorizationHeader()
    });
   }

   getProductToWishlist(): Observable<any>{
    
    const customerId = UserStorageService.getUserId();

    return this.http.get(Basic_URL+ `api/customer/wishlist/${customerId}` , {
      headers:this.createAuthorizationHeader()
    });
   }

 

  /////////////////////////////////////////

  private createAuthorizationHeader():HttpHeaders{
    return new HttpHeaders().set(
      'Authorization','Bearer ' + UserStorageService.getToken()
    )
  }

}
