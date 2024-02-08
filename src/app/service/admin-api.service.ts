import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {


  /* this function is for Protecting the Path for using Activate  Guards*/
  isLogggedIn() {
    console.log(!!sessionStorage.getItem("existedUser"));
    return !!sessionStorage.getItem("existedUser")
  }



  service_url = "http://localhost:3000"
  wishlistCount = new BehaviorSubject(0)
  cartlistCount = new BehaviorSubject(0)


  constructor(private http: HttpClient) {
    if (sessionStorage.getItem("token")) {
      this.getWishlistcount()
      this.getCartlistcount()
    }
  }

  registerUsers(users: any) {
    return this.http.post(`${this.service_url}/ecommerce/register`, users)
  }

  LoginedUsers(users: any) {
    return this.http.post(`${this.service_url}/ecommerce/login`, users)
  }

  allProductApi() {
    return this.http.get(`${this.service_url}/ecommerce/allproducts`)

  }
  getProductApi(id: any) {
    return this.http.get(`${this.service_url}/ecommerce/product/${id}`)

  }

  addTokentoHeader() {
    /* Make an object for class  HttpHeaders */
    let headers = new HttpHeaders
    /* Import Token */
    const token = sessionStorage.getItem("token")
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`)
    }

    return { headers }
  }

  addWishList(products: any) {
    return this.http.post(`${this.service_url}/ecommerce/wishlist`, products, this.addTokentoHeader())
  }
  getWishList() {
    return this.http.get(`${this.service_url}/ecommerce/getAllwishlist`, this.addTokentoHeader())
  }
  getWishlistcount() {
    this.getWishList().subscribe((res: any) => {

      this.wishlistCount.next(res.length)

    })

  }
  removeWishList(Id: any) {
    return this.http.delete(`${this.service_url}/ecommerce/removeWishlist/${Id}`, this.addTokentoHeader())
  }
  addCartlist(products: any) {
    return this.http.post(`${this.service_url}/ecommerce/addlist`, products, this.addTokentoHeader())
  }
  getCartlist() {
    return this.http.get(`${this.service_url}/ecommerce/getCartlist`, this.addTokentoHeader())

  }

  getCartlistcount() {
    this.getCartlist().subscribe((res: any) => {

      this.cartlistCount.next(res.length)

    })

  }
  deleteCartlist(id: any) {
    return this.http.delete(`${this.service_url}/ecommerce/deleteCartlist/${id}`, this.addTokentoHeader())
  }
  incrementCartlist(id: any) {
    return this.http.get(`${this.service_url}/ecommerce/incrementCartlist/${id}`, this.addTokentoHeader())
  }
  decrementCartlist(id: any) {
    return this.http.get(`${this.service_url}/ecommerce/decrementCartlist/${id}`, this.addTokentoHeader())
  }
  emptycart() {
    return this.http.delete(`${this.service_url}/ecommerce/emptycart`, this.addTokentoHeader())
  }


}
