import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../service/admin-api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  allProducts: any = []
  constructor(private service: AdminApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getallWishlist()

  }

  getallWishlist() {
    this.service.getWishList().subscribe({
      next: (response: any) => {
        console.log(response);
        this.allProducts = response

      },
      error: (error) => {
        // console.log(error);

      }
    })

  }



  removeWishlist(Id: any) {
    this.service.removeWishList(Id).subscribe({
      next: (response) => {
        console.log(response);
        this.getallWishlist()
        this.service.getWishlistcount()

      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          position: 'top',
          title: 'error',
          text: `OOPs ....!!`,
          icon: 'error'
        })

      }
    })
  }


  addtoCartlist(productlist: any) {

    if (sessionStorage.getItem("token")) {
      productlist.quantity = 1

      this.service.addCartlist(productlist).subscribe({
        next: ((res: any) => {
          console.log(res);

          this.service.getCartlistcount()
          this.toastr.success('Added to Cart!')


          this.removeWishlist(productlist._id)
        }),
        error: ((err: any) => {
          Swal.fire({
            position: 'top',
            title: 'error',
            text: `OOPs ....!!`,
            icon: 'error'
          })

        })
      })

    } else {
      Swal.fire({
        position: 'top',
        title: 'error',
        text: `OOPs ....!!`,
        icon: 'error'
      })

    }



  }
}
