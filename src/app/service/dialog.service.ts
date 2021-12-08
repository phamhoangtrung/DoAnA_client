import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../models/dialog.model';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogProductComponent } from '../shared/components/dialog-product/dialog-product.component';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  openMessageDialog(data: DialogData) {
    return this.dialog
      .open(DialogComponent, {
        width: '300px',
        data,
      })
      .afterClosed();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openProductDialog(data?: Product) {
    return this.dialog
      .open(DialogProductComponent, {
        width: '400px',
        data,
      })
      .afterClosed();
  }
}
