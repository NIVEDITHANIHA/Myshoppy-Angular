import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../service/admin-api.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cartlist',
  templateUrl: './cartlist.component.html',
  styleUrls: ['./cartlist.component.css']
})
export class CartlistComponent implements OnInit {
  cartlist: any = []
  findAllTotal: any = 0
  constructor(private service: AdminApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cartlistDetails()
  }


  cartlistDetails() {
    this.service.getCartlist().subscribe({
      next: ((res) => {
        this.cartlist = res
        console.log(this.cartlist);


        this.findAllTotal = 0
        for (let i = 0; i <= this.cartlist.length; i++) {
          this.findAllTotal += this.cartlist[i].grandTotal
          sessionStorage.setItem("grandTotal", this.findAllTotal)
        }

      }),
      error: ((error) => {
        console.log(error);

      })
    })
  }


  removeCartlist(id: any) {
    this.service.deleteCartlist(id).subscribe({
      next: ((res: any) => {
        console.log(res);
        this.cartlistDetails()
        this.service.getCartlistcount()

        this.toastr.success('Succesfully Deleted!')

      }),
      error: ((err: any) => {
        console.log(err);
        Swal.fire({
          position: 'top',
          title: 'error',
          text: `OOPs .... ${err.error}!!`,
          icon: 'error'
        })
      }),

    })

  }

  decrement(Id: any) {
    console.log("decement");
    this.service.decrementCartlist(Id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.cartlistDetails()
        this.service.getCartlistcount()

        this.toastr.success(`Quantity Decreased to ${res.quantity} !`)
      },
      error: (error: any) => {
        console.log(error);
        Swal.fire({
          position: 'top',
          title: 'error',
          text: `OOPs .... ${error.error}!!`,
          icon: 'error'
        })
      }
    })


  }

  increment(Id: any) {
    console.log("increment");
    this.service.incrementCartlist(Id).subscribe({
      next: (res: any) => {
        console.log(res.quantity);
        this.cartlistDetails()
        this.service.getCartlistcount()

        this.toastr.success(`Quantity Increased to ${res.quantity} !`)


      },
      error: (error: any) => {
        console.log(error);
        Swal.fire({
          position: 'top',
          title: 'error',
          text: `OOPs .... ${error.error}!!`,
          icon: 'error'
        })
      }
    })

  }

  emptyCart() {
    this.service.emptycart().subscribe({
      next: (res: any) => {
        console.log(res);
        this.cartlistDetails()
        this.service.getCartlistcount()
        Swal.fire({
          position: 'top',
          title: 'Wow!',
          text: `Empty Cart!!!`,
          icon: 'success',
        })


      },
      error: (err: any) => {
        console.log(err);
        Swal.fire({
          position: 'top',
          title: 'error',
          text: `OOPs .... ${err.error}!!`,
          icon: 'error'
        })
      }
    })
  }
}
