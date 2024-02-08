import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminApiService } from '../service/admin-api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerImage: string = "./assets/images/register.png"

  constructor(private fb: FormBuilder, private service: AdminApiService, private router: Router) { }

  registerForm = this.fb.group({

    username: ["", [Validators.required, Validators.pattern("[a-zA-Z]*")]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9]*")]]

  })
  register() {
    console.log(this.registerForm.value);
    const username = this.registerForm.value.username
    const email = this.registerForm.value.email
    const password = this.registerForm.value.password


    const users = { username, email, password }


    this.service.registerUsers(users).subscribe({

      next: ((response: any) => {
        console.log(response);

        Swal.fire({
          title: 'Wow!',
          text: `${username} Registered Succesfully`,
          icon: 'success',
        })
        this.router.navigateByUrl("login")

      }),
      error: ((error: any) => {
        console.log(error);

        Swal.fire({
          title: `oops...!! ${error.error
            }`,
          text: 'Do you want to continue',
          icon: 'error',
        })


      })
    })













  }


}
