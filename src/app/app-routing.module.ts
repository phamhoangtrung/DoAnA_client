import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartAdminComponent } from './component/cart-admin/cart-admin.component';
import { CartListComponent } from './component/cart-list/cart-list.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { SigninComponent } from './component/signin/signin.component';
import { SignupComponent } from './component/signup/signup.component';
import { UserAdminComponent } from './component/user-admin/user-admin.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { AuthGuard } from './service/auth.guard';
import { RoleGuard } from './service/role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'user', component: UserDetailComponent },
  {
    path: 'cart',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CartComponent, pathMatch: 'full' },
      {
        path: 'info',
        component: CartListComponent,
      },
    ],
  },

  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user',
      },
      {
        path: 'cart',
        component: CartAdminComponent,
      },
      {
        path: 'user',
        component: UserAdminComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
