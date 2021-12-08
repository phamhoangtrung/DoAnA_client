import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { Selection } from 'src/app/models/share.model';
import { ApiService } from 'src/app/service/api.service';
import { numberValidator } from '../../validator/number.validator';
import { rangeValidator } from '../../validator/range.validator';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss'],
})
export class DialogProductComponent implements OnInit {
  productForm!: FormGroup;
  selection!: Selection;
  constructor(
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<DialogProductComponent>,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  ngOnInit(): void {
    this.selection = this.api.selection;
    this.buildForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  buildForm() {
    this.productForm = this.builder.group({
      name: [this.getDefault('name'), Validators.required],
      price: [this.getDefault('price'), [Validators.required, numberValidator]],
      sale: [
        this.getDefault('sale'),
        [Validators.required, numberValidator, rangeValidator(0, 99)],
      ],
      type: [this.getDefault('type'), Validators.required],
      gender: [this.getDefault('gender'), Validators.required],
    });
  }

  get title() {
    return this.data ? this.data.name : 'Create product';
  }

  getDefault(key: keyof Product) {
    if (this.data) {
      return this.data[key];
    }
    return '';
  }

  get name() {
    return this.productForm.get('name');
  }

  get price() {
    return this.productForm.get('price');
  }

  get sale() {
    return this.productForm.get('sale');
  }

  get type() {
    return this.productForm.get('type');
  }

  get gender() {
    return this.productForm.get('gender');
  }

  handleSubmit() {
    this.dialogRef.close(true);
    if (this.data) {
      this.api
        .updateProduct(this.data._id, this.productForm.value)
        .subscribe(console.log);
    } else {
      this.api.createProduct(this.productForm.value).subscribe(console.log);
    }
  }
}

// name: string;
// price: number;
// rating: number;
// sale: number;
// type: 'men' | 'women';
// createdAt: string;
// updatedAt: string;
// _id: string;
