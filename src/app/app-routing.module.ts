import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { HeaderComponent } from './header/header.component';
import { CartlistComponent } from './cartlist/cartlist.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { authguardsGuard } from './guard/authguards.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "", component: AllproductsComponent },
  { path: "viewProducts/:id", component: ViewProductsComponent, canActivate: [authguardsGuard] },
  { path: "wishlist", component: WishlistComponent, canActivate: [authguardsGuard] },
  { path: "header", component: HeaderComponent },
  { path: "cartlist", component: CartlistComponent, canActivate: [authguardsGuard] },
  { path: "checkout", component: CheckOutComponent, canActivate: [authguardsGuard] },
  { path: "**", component: PagenotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
