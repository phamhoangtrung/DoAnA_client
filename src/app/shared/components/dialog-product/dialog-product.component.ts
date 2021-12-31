import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { Selection } from 'src/app/models/share.model';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';
import { noWhiteSpaceValidator } from '../../validator/noWhiteSpace.validator';
import { numberValidator } from '../../validator/number.validator';
import { rangeValidator } from '../../validator/range.validator';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss'],
})
export class DialogProductComponent implements OnInit {
  productForm!: FormGroup;
  file!: File;
  selection!: Selection;
  url: any;
  msg = '';

  constructor(
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<DialogProductComponent>,
    private api: ApiService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  ngOnInit(): void {
    this.selection = this.api.selection;
    this.buildForm();
    console.log(this.selection);

    this.url = this.data?.imageUrl || '';
  }

  selectFile(event: any) {
    //Angular 11, for stricter type
    this.file = event.target.files[0] as File;
    if (!this.file) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = this.file.type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.file);

    reader.onload = (_event: any) => {
      this.msg = '';
      this.url = reader.result;
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  buildForm() {
    this.productForm = this.builder.group({
      name: [this.getDefault('name'), Validators.required],
      price: [
        this.getDefault('price'),
        [Validators.required, numberValidator, noWhiteSpaceValidator],
      ],
      sale: [
        this.getDefault('sale'),
        [
          Validators.required,
          numberValidator,
          rangeValidator(0, 99),
          noWhiteSpaceValidator,
        ],
      ],
      type: [this.getDefault('type'), Validators.required],
      gender: [this.getDefault('gender'), Validators.required],
    });
  }

  getDefault(key: keyof Product) {
    if (this.data) {
      return this.data[key];
    }
    return '';
  }

  get title() {
    return this.data ? this.data.name : 'Create product';
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
    const formData = new FormData();
    formData.append('file', this.file);

    if (this.data) {
      if (this.file)
        this.http
          .post(environment.baseUrl + '/uploadphoto', formData)
          .subscribe((res: any) => {
            this.api
              .updateProduct(this.data._id, {
                ...this.productForm.value,
                imageUrl: res.filename,
              })
              .subscribe();
          });
      else {
        this.api
          .updateProduct(this.data._id, this.productForm.value)
          .subscribe();
      }
    } else {
      this.http
        .post(environment.baseUrl + '/uploadphoto', formData)
        .subscribe((res: any) => {
          this.api
            .createProduct({
              ...this.productForm.value,
              imageUrl: res.filename,
            })
            .subscribe();
        });
    }
  }
}
