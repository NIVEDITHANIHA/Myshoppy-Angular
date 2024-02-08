import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../service/admin-api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent implements OnInit {

  constructor(private service: AdminApiService, private toastr: ToastrService) { }
  products: any = []

  ngOnInit(): void {
    this.getAllProducts()
  }


  getAllProducts() {
    this.service.allProductApi().subscribe({
      next: ((res: any) => {
        this.products = res
        console.log(this.products);

      }),
      error: ((err: any) => {
        console.log(err);

      })
    })
  }


  addtoWishlist(products: any) {

    this.service.addWishList(products).subscribe({
      next: ((res) => {
        console.log(res);
        this.service.getWishlistcount()
        this.toastr.success('Added to Wishlist!')
      }),
      error: ((err) => {
        Swal.fire({
          position: 'top',
          title: 'error',
          text: `OOPs ....!!`,
          icon: 'error'
        })

      })
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
