import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminApiService } from '../service/admin-api.service';
import Swal from 'sweetalert2';

export const authguardsGuard: CanActivateFn = () => {
  const service = inject(AdminApiService)
  const router = inject(Router)

  if (service.isLogggedIn()) {
    return true

  } else {
    Swal.fire({
      title:'Login',
      text:"Please Login",
      icon:"info",

    })
    router.navigateByUrl("/")
    return false
    
  }

};
