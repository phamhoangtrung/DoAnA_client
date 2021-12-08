import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CartAdmin, CartProduct } from 'src/app/models/product.model';
import { CartService } from 'src/app/service/cart.service';
import { IndicatorService } from 'src/app/service/indicator.service';

@Component({
  selector: 'app-cart-admin',
  templateUrl: './cart-admin.component.html',
  styleUrls: ['./cart-admin.component.scss'],
})
export class CartAdminComponent implements OnInit {
  public products!: CartAdmin[];
  public grandTotal!: number;

  displayedColumns: string[] = [
    'no',
    'customerId',
    'status',
    'total',
    'totalProduct',
    'createdAt',
    'updatedAt',
    'action',
  ];

  constructor(
    private cartService: CartService,
    private indicatorService: IndicatorService
  ) {}

  ngOnInit(): void {
    this.indicatorService.set(true);
    this.getCart();
  }

  getCart() {
    this.cartService
      .getAllCart()
      .pipe(
        map((cart: any) => {
          return cart.carts.map((c: any, i: number) => {
            return {
              ...c,
              index: i + 1,
              totalProduct: c.orderedProduct.length,
            };
          });
        })
      )
      .subscribe((data) => {
        this.indicatorService.set(false);
        this.products = data;
      });
  }

  acceptCart(cartId: string) {
    this.indicatorService.set(true);
    this.cartService.acceptCart(cartId).subscribe(() => {
      this.indicatorService.set(false);
      this.getCart();
    });
  }
}
