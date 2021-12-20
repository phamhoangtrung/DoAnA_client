import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../models/dialog.model';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogProductComponent } from '../shared/components/dialog-product/dialog-product.component';
import { CartAdmin, Product } from '../models/product.model';
import { Direction } from '@angular/cdk/bidi';
import { ProductTableDialogComponent } from '../shared/components/product-table-dialog/product-table-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}
  openMessageDialog(data: DialogData) {
    console.log(window.scrollY);

    return this.dialog
      .open(DialogComponent, {
        width: '300px',
        data,
        position: {
          top: window.scrollY + 200 + 'px',
        },
      })
      .afterClosed();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  openProductDialog(data?: Product) {
    return this.dialog
      .open(DialogProductComponent, {
        width: '400px',
        data,
        position: {
          top: window.scrollY + 50 + 'px',
        },
      })
      .afterClosed();
  }

  openProductTableDialog(data?: CartAdmin[]) {
    return this.dialog
      .open(ProductTableDialogComponent, {
        width: '1000px',
        // maxHeight: '80%',
        height: '80%',
        data,
        position: {
          top: window.scrollY + 50 + 'px',
        },
      })
      .afterClosed();
  }
}
