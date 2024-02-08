import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminApiService } from '../service/admin-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: any = ""
   wishListCount: number = 0
  cartListCount: number = 0

  constructor(private router: Router, private service: AdminApiService) { }

  ngOnInit(): void {

    if (sessionStorage.getItem("existedUser")) {
      this.userName = sessionStorage.getItem("existedUser")

      this.service.wishlistCount.subscribe((res: any) => {
        this.wishListCount = res       
      })
      this.service.cartlistCount.subscribe((res: any) => {
        this.cartListCount = res 
      })

    } else {
      this.userName = ""
    }

  }

  logOut() {
    this.userName = ""
    sessionStorage.removeItem("existedUser")
    sessionStorage.removeItem("token")
    this.router.navigateByUrl("/login")

  }

}
