import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';
import { AdminApiService } from '../service/admin-api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  proceedToBuy: boolean = false
  makePaymentStatus: boolean = false
  totalAmount: any = 0;
  public payPalConfig?: IPayPalConfig;

  constructor(private fb: FormBuilder, private service: AdminApiService, private router: Router) { }
  checkoutForm = this.fb.group({
    userName: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    apartment: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9:,.\/ ]*')]],
    place: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    pincode: ["", [Validators.required, Validators.pattern('[0-9]*')]],
  });
  ngOnInit(): void {
    this.initConfig();
  }
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: this.totalAmount,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.totalAmount
              }
            }
          },
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.service.emptycart().subscribe((res) => {
          this.service.getCartlistcount();
          Swal.fire({
            position: "top",
            title: "Wow",
            text: "Payment Successfull",
            icon: "success"

          })

          this.router.navigateByUrl("/")

          this.makePaymentStatus = false
          this.proceedToBuy = false
        })


      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        Swal.fire({
          position: 'top',
          title: 'error',
          text: `Payment cancelled!!`,
          icon: 'info'
        })
        this.proceedToBuy = true

      },
      onError: err => {
        console.log('OnError', err);
        Swal.fire({
          position: 'top',
          title: 'error',
          text: `transaction failed Please try Again!!`,
          icon: 'error'
        })
        this.proceedToBuy = true

      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);

      }
    };
  }
  orderPlaced() {
    console.log("orderplace", this.checkoutForm.value);
    if (this.checkoutForm.valid) {
      this.proceedToBuy = true
      this.totalAmount = sessionStorage.getItem("grandTotal")
    } else {
      Swal.fire({
        position: "top",
        title: "Info",
        text: "Invalid Details",
        icon: "info"

      })
    }


  }

  cancel() {
    this.checkoutForm.reset()
  }
  back() {
    this.proceedToBuy = true
  }

  makePayment() {
    this.makePaymentStatus = true

  }


}
