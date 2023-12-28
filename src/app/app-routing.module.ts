import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SellerAuthComponent } from './pages/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './pages/seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './pages/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './pages/seller-update-product/seller-update-product.component';
import { SearchComponent } from './pages/search/search.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { UserAuthComponent } from './pages/user-auth/user-auth.component';

const routes: Routes = [
  {
    path:"", component:HomeComponent
  },
  {
    path:"seller-auth", component:SellerAuthComponent
  },
  {
    path:"seller-home", component:SellerHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"seller-add-product", component:SellerAddProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"seller-update-product/:id", component:SellerUpdateProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"search/:query", component:SearchComponent,
  },
  {
    path:"details/:productId", component:ProductDetailsComponent,
  },
  {
    path:"user-auth", component:UserAuthComponent,
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
