import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminApiService } from '../service/admin-api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  registerImage: string = "./assets/images/register.png"
  constructor(private fb: FormBuilder, private service: AdminApiService, private router: Router) { }

  loginedForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9]*")]]

  })


  loginedUsers() {
    console.log(this.loginedForm.value);
    if (this.loginedForm.valid) {

    
    const email = this.loginedForm.value.email
    const password = this.loginedForm.value.password

    const users = { email, password }

    this.service.LoginedUsers(users).subscribe({
      next: ((response: any) => {
        console.log(response);
        Swal.fire({
          title: 'Wow!',
          text: `${email} Logined Succesfully`,
          icon: 'success',
        })

        sessionStorage.setItem("existedUser", response.existedUser.username)
        sessionStorage.setItem("token", response.token)


        this.router.navigateByUrl("/")

      }),
      error: ((error) => {
        console.log(error);

        Swal.fire({
          title: 'error',
          text: `OOPs ....!! ${error.error}`,
          icon: 'error'
        })
      })
    })

  }
  else{
    Swal.fire({
      title: 'error',
      text: `OOPs ....!! `,
      icon: 'error'
    })
  }

  }
}
