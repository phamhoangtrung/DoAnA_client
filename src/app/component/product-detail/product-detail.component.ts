import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogData } from 'src/app/models/dialog.model';
import { Product } from 'src/app/models/product.model';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { DialogService } from 'src/app/service/dialog.service';
import { IndicatorService } from 'src/app/service/indicator.service';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public authService: AuthService,
    private cartService: CartService,
    private indicatorService: IndicatorService,
    private dialogService: DialogService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    const params = this.activeRoute.snapshot.paramMap.get('id');
    if (params) {
      this.getDetail(params);
    } else {
      this.router.navigate(['/']);
    }
  }

  getDetail(id: string) {
    this.apiService.getDetail(id).subscribe((res: any) => {
      this.product = res.product;
      this.utilService.setDocumentTitle('Product', res.product.name);
    });
  }

  addToCart() {
    if (!this.authService.isLogin) {
      const data: DialogData = {
        title: 'Sign in',
        body: 'You need to sign in before add to cart',
        type: 'option',
      };
      this.dialogService.openMessageDialog(data).subscribe((rs: boolean) => {
        if (rs) {
          this.router.navigate(['signin']);
        }
      });
    } else {
      this.cartService.addToCart(this.product, 'add');
      this.dialogService.openSnackBar(
        `Item: '${this.product.name}' add to cart successfully`
      );
    }
  }
}
