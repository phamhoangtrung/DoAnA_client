import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { map } from 'rxjs/operators';
import { CartAdmin, CartProduct } from 'src/app/models/product.model';
import { CartService } from 'src/app/service/cart.service';
import { DialogService } from 'src/app/service/dialog.service';
import { ExportService } from 'src/app/service/export.service';
import { IndicatorService } from 'src/app/service/indicator.service';

@Component({
  selector: 'app-cart-admin',
  templateUrl: './cart-admin.component.html',
  styleUrls: ['./cart-admin.component.scss'],
})
export class CartAdminComponent implements OnInit {
  public products!: CartAdmin[];
  public grandTotal!: number;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  displayedColumns: string[] = [
    'no',
    'id',
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
    private indicatorService: IndicatorService,
    private exportService: ExportService,
    private dialogService: DialogService
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

  export() {
    // if (!matPicker.startAt) return;
    const date = this.range.value.start + ',' + this.range.value.end;
    // console.log(date);

    this.cartService.getAllCart(date).subscribe((res: any) => {
      this.dialogService.openProductTableDialog(res.carts).subscribe((rs) => {
        if (rs) {
          const startDate = new Date(this.range.value.start).toLocaleDateString(
            'en-US'
          );
          const endDate = new Date(this.range.value.end).toLocaleDateString(
            'en-US'
          );
          this.exportService.exportExcel(
            res.carts,
            `Cart-${startDate}-to-${endDate}`
          );
        }
      });
    });
  }

  watchDetail(_id: string) {
    const data = this.products.filter((p) => p._id === _id);
    this.dialogService.openProductTableDialog(data);
  }
}
