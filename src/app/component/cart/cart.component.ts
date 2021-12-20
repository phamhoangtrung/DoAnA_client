import { Component, OnInit } from '@angular/core';
import { CartProduct, Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';

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
    'name',
    'quantity',
    'price',
    'sale',
    'total',
    'action',
  ];

  // name: string;
  // price: number;
  // rating: number;
  // sale: number;
  // type: 'men' | 'women';

  constructor(
    private cartService: CartService,
    private authService: AuthService
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
    this.cartService.removeCartItem(item);
  }
  emptyCart() {
    this.cartService.removeAllCart();
  }

  createCart() {
    this.cartService.createCart().subscribe(() => {
      this.emptyCart();
    });
  }

  getSaleTotal(product: any) {
    return (
      product.price *
      product.quantity *
      (1 - product.sale / 100)
    ).toFixed(2);
  }

  changeQuan(product: any, action: 'add' | 'rmv') {
    this.cartService.addToCart(product, action);
  }
}
