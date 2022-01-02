import { Component, OnInit } from '@angular/core';
import { DialogData } from 'src/app/models/dialog.model';
import { CartAdmin } from 'src/app/models/product.model';
import { CartService } from 'src/app/service/cart.service';
import { DialogService } from 'src/app/service/dialog.service';
import { IndicatorService } from 'src/app/service/indicator.service';
import { UtilService } from 'src/app/service/util.service';
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
    private indicatorService: IndicatorService,
    private dialogService: DialogService,
    private utilService: UtilService
  ) {
    this.utilService.setDocumentTitle('Carts', 'List');
  }

  ngOnInit(): void {
    this.indicatorService.set(true);
    this.getAllCart();
  }

  getAllCart() {
    this.cartService.getAllCart().subscribe((res: any) => {
      this.carts = res.carts.map((c: any) => {
        const orderedProduct = addIndex(c.orderedProduct);
        return { ...c, orderedProduct };
      });
      this.indicatorService.set(false);
    });
  }

  rate(cart: CartAdmin) {
    this.dialogService.openRatingTableDialog(cart).subscribe((rs) => {
      if (rs) {
        this.carts = this.carts.map((c) => {
          if (c._id === cart._id) c.isRated = true;
          return c;
        });
        const data: DialogData = {
          title: 'Rating',
          body: 'Rating successfully',
          type: 'confirm',
        };
        this.dialogService.openMessageDialog(data);
      }
    });
  }
}

const addIndex = (data: Object[]) => {
  return data.map((d, i) => ({ ...d, index: i + 1 }));
};
