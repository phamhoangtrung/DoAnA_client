import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from './shared/angular-material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { FilterPipe } from './shared/filter.pipe';

import { HeaderComponent } from './component/header/header.component';
import { CartComponent } from './component/cart/cart.component';
import { UserAdminComponent } from './component/user-admin/user-admin.component';
import { ProductsComponent } from './component/products/products.component';
import { SigninComponent } from './component/signin/signin.component';
import { SignupComponent } from './component/signup/signup.component';
import { IndicatorComponent } from './shared/components/indicator/indicator.component';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { BadgeComponent } from './shared/components/badge/badge.component';
import { DialogProductComponent } from './shared/components/dialog-product/dialog-product.component';
import { JwtInterceptor } from './service/jwt.interceptor';
import { CartAdminComponent } from './component/cart-admin/cart-admin.component';
import { CartListComponent } from './component/cart-list/cart-list.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { StaringComponent } from './shared/components/staring/staring.component';
import { ProductTableComponent } from './shared/components/product-table/product-table.component';
import { ProductTableDialogComponent } from './shared/components/product-table-dialog/product-table-dialog.component';
import { SnackBarComponent } from './shared/components/snack-bar/snack-bar.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { RatingListComponent } from './shared/components/rating-list/rating-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ProductsComponent,
    FilterPipe,
    SigninComponent,
    SignupComponent,
    IndicatorComponent,
    BadgeComponent,
    DialogComponent,
    DialogProductComponent,
    CartAdminComponent,
    UserAdminComponent,
    CartListComponent,
    UserDetailComponent,
    StaringComponent,
    ProductTableComponent,
    ProductTableDialogComponent,
    SnackBarComponent,
    ProductDetailComponent,
    RatingListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
