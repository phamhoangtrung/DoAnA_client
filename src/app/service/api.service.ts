import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { Filter, Selection } from '../models/share.model';

interface ProductResponse {
  products: Product[];
  pageSize: number;
  total: number;
}
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  model = 'product';
  selection!: Selection;
  filter: Filter = {
    name: '',
    gender: '',
    sort: '',
    type: '',
  };

  constructor(private http: HttpClient) {
    this.getSelection().subscribe((res) => {
      this.selection = res;
    });
  }

  getProduct(page: number = 1) {
    const { name, gender, type, sort } = this.filter;
    return this.http.get<ProductResponse>(
      `${environment.baseUrl}/${this.model}?page=${page}&name=${name}&gender=${gender}&type=${type}&sort=${sort}`
    );
  }

  setFilter(filter: Filter) {
    this.filter = { ...this.filter, ...filter };
  }

  updateProduct(id: string, body: any) {
    return this.http.patch(`${environment.baseUrl}/${this.model}/${id}`, body);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.baseUrl}/${this.model}/${id}`);
  }

  createProduct(body: any) {
    return this.http.post(`${environment.baseUrl}/${this.model}/`, body);
  }

  getSelection() {
    return this.http.get<Selection>(
      `${environment.baseUrl}/${this.model}/get-selection`
    );
  }

  resetFilter() {
    this.filter = {
      name: '',
      gender: '',
      sort: '',
      type: '',
    };
  }
}
