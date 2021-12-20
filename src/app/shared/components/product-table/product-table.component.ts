import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit {
  @Input() productList!: Product[];
  @Input() displayedColumns!: string[];
  @Input() isEdited = true;
  @Output() remove = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  removeProduct(product: Product) {
    this.remove.emit(product);
  }

  updateProduct(product: Product) {
    this.update.emit(product);
  }
}
