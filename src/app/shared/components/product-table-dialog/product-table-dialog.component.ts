import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartAdmin, Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-table-dialog',
  templateUrl: './product-table-dialog.component.html',
  styleUrls: ['./product-table-dialog.component.scss'],
})
export class ProductTableDialogComponent implements OnInit {
  total = 0;

  constructor(
    public dialogRef: MatDialogRef<ProductTableDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { isExport: boolean; carts: CartAdmin[] }
  ) {
    this.data.carts = this.data.carts.map((d) => {
      // add index
      const orderedProduct = d.orderedProduct.map((p, i) => ({ ...p, index: i + 1, }));
      return { ...d, orderedProduct };
    });

    this.total = this.data.carts.reduce((acc, cur) => acc + cur.total, 0);
  }
  column = ['no', 'img', 'name', 'rating', 'price', 'type', 'gender', 'sale'];

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
