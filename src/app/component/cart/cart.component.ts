import { Component, OnInit } from '@angular/core';
import { iif, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { DialogData } from 'src/app/models/dialog.model';
import { CartProduct, Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { DialogService } from 'src/app/service/dialog.service';
import { IndicatorService } from 'src/app/service/indicator.service';
import { IndicatorComponent } from 'src/app/shared/components/indicator/indicator.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public products!: CartProduct[];
  public grandTotal!: string;
  public grandTotalWithSale!: string;
  public grandTotalFinal!: string;

  displayedColumns: string[] = [
    'no',
    'img',
    'name',
    'quantity',
    'price',
    'sale',
    'total',
    'action',
  ];

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private dialogService: DialogService,
    private indicatorService: IndicatorService
  ) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res: CartProduct[]) => {
      this.products = res.map((prod, i) => ({ ...prod, position: i + 1 }));
      this.grandTotal = this.cartService.getTotalPrice().toFixed(2);
      this.grandTotalWithSale = this.cartService
        .getTotalPriceWithSale()
        .toFixed(2);
      const memberShip = this.authService.user?.memberShip || 0;
      this.grandTotalFinal = (
        this.cartService.getTotalPriceWithSale() *
        (1 - memberShip / 100)
      ).toFixed(2);
    });
  }

  removeItem(item: any) {
    const data: DialogData = {
      title: 'Delete',
      body: `Do you want to remove item: ${item.name}`,
      type: 'option',
    };
    this.dialogService.openMessageDialog(data).subscribe((rs: boolean) => {
      if (rs) {
        this.cartService.removeCartItem(item);
      }
    });
  }

  emptyCart() {
    const data: DialogData = {
      title: 'Delete',
      body: `Do you want to remove all items`,
      type: 'option',
    };
    this.dialogService.openMessageDialog(data).subscribe((rs: boolean) => {
      if (rs) {
        this.cartService.removeAllCart();
      }
    });
  }

  createCart() {
    const data: DialogData = {
      title: 'Check out',
      body: `Do you want to checkout this cart`,
      type: 'option',
    };
    this.dialogService
      .openMessageDialog(data)
      .pipe(
        switchMap((isAccept: any) => {
          if (isAccept) {
            this.indicatorService.set(true);
            return this.cartService.createCart().pipe(
              tap(() => {
                this.cartService.removeAllCart();
              })
            );
          }
          return of(null);
        })
      )
      .subscribe(() => {
        this.indicatorService.set(false);
      });
  }

  getSaleTotal(product: any) {
    return (
      product.price *
      product.quantity *
      (1 - product.sale / 100)
    ).toFixed(2);
  }

  changeQuantity(product: any, action: 'add' | 'rmv') {
    if (product.quantity <= 1 && action === 'rmv') return;
    this.cartService.addToCart(product, action);
  }
}
