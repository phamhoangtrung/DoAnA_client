import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartAdmin, Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-table-dialog',
  templateUrl: './product-table-dialog.component.html',
  styleUrls: ['./product-table-dialog.component.scss'],
})
export class ProductTableDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ProductTableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CartAdmin[]
  ) {
    this.data = this.data.map((d) => {
      const orderedProduct = d.orderedProduct.map((p, i) => ({
        ...p,
        index: i + 1,
      }));
      return { ...d, orderedProduct };
    });
  }
  column = ['no', 'img', 'name', 'rating', 'price', 'type', 'gender', 'sale'];

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
