import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../service/admin-api.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  Id: any = ""

  productItems: any = {}

  constructor(private service: AdminApiService, private route: ActivatedRoute ,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.route.params.subscribe((res: any) => {
      this.Id = res.id
      console.log(this.Id);

    })
    this.getProduct(this.Id)
  }


  getProduct(id: any) {
    this.service.getProductApi(id).subscribe({
      next: ((res: any) => {
        this.productItems = res[0]
        console.log(this.productItems);



      }),
      error: ((err: any) => {

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
