import { Component, OnInit } from '@angular/core';
import { CartAdmin } from 'src/app/models/product.model';
import { CartService } from 'src/app/service/cart.service';
import { IndicatorService } from 'src/app/service/indicator.service';
import { columns } from './cart-list-column';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit {
  carts!: any[];
  columns = columns;
  displayedColumns = this.columns.map((c) => c.columnDef);

  constructor(
    private cartService: CartService,
    private indicatorService: IndicatorService
  ) {}

  ngOnInit(): void {
    this.indicatorService.set(true);
    this.getAllCart();
  }

  getAllCart() {
    this.cartService.getAllCart().subscribe((res: any) => {
      this.carts = res.carts.map((c: any) => {
        const orderedProduct = c.orderedProduct.map((o: any, i: number) => ({
          ...o,
          index: i + 1,
        }));

        return { ...c, orderedProduct };
      });
      this.indicatorService.set(false);
    });
  }
}
