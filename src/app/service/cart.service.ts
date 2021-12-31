import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartProduct } from '../models/product.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  model = 'cart';
  public cartItemList: CartProduct[];
  public productList: BehaviorSubject<CartProduct[]>;

  constructor(private ls: LocalStorageService, private http: HttpClient) {
    const localData = this.getLocalData();
    if (localData != null) {
      this.cartItemList = localData;
      this.productList = new BehaviorSubject(localData);
    } else {
      this.cartItemList = [] as CartProduct[];
      this.productList = new BehaviorSubject<CartProduct[]>([]);
    }
  }

  setLocalData(data: CartProduct[]) {
    return this.ls.set<CartProduct[]>('cart-item', data);
  }

  getLocalData() {
    return this.ls.get<CartProduct[]>('cart-item');
  }

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product: any, action?: 'add' | 'rmv') {
    const addedProduct = this.cartItemList.find((i) => i._id === product._id);
    let newList;
    if (addedProduct) {
      newList = this.cartItemList.map((item) => {
        if (item._id === product._id)
          item.quantity =
            action === 'add' ? item.quantity + 1 : item.quantity - 1;
        return item;
      });
    } else {
      newList = [...this.cartItemList, { ...product, quantity: 1, rating: 3 }];
    }
    this.cartItemList = newList;
    this.setLocalData(newList);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice(): number {
    return this.cartItemList.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0
    );
  }

  getTotalPriceWithSale(): number {
    return this.cartItemList.reduce(
      (acc, cur) => acc + cur.price * cur.quantity * (1 - cur.sale / 100),
      0
    );
  }

  removeCartItem(product: any) {
    const newList = this.cartItemList.filter(
      (item) => item._id !== product._id
    );
    this.cartItemList = newList;
    this.setLocalData(newList);
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.setLocalData([]);
    this.productList.next(this.cartItemList);
  }

  createCart() {
    const cart = this.cartItemList.map((c) => ({
      productId: c._id,
      quantity: c.quantity,
    }));
    return this.http.post(`${environment.baseUrl}/${this.model}`, cart);
  }

  getAllCart(date = '') {
    return this.http.get(`${environment.baseUrl}/${this.model}?date=${date}`);
  }

  acceptCart(cartId: string) {
    return this.http.patch(
      `${environment.baseUrl}/${this.model}/change-status/${cartId}`,
      null
    );
  }
}
