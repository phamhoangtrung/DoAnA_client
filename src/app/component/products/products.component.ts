import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  mergeMap,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { DialogData } from 'src/app/models/dialog.model';
import { Product } from 'src/app/models/product.model';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { DialogService } from 'src/app/service/dialog.service';
import { IndicatorService } from 'src/app/service/indicator.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public productList!: Product[];
  public searchTerm = new FormControl('');
  public length!: number;

  public isLoading!: Observable<boolean>;
  @ViewChild('paginator', { static: true }) paginatorRef!:
    | MatPaginator
    | undefined;

  displayedColumns: string[] = [
    'no',
    'name',
    'rating',
    'price',
    'sale',
    'createdAt',
    'updatedAt',
    'action',
  ];

  constructor(
    private api: ApiService,
    public authService: AuthService,
    private router: Router,
    private cartService: CartService,
    private indicatorService: IndicatorService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.isLoading = this.indicatorService.get();
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(500),
        startWith(''),
        distinctUntilChanged(),
        tap(() => {
          this.indicatorService.set(true);
        }),
        switchMap((search) => {
          this.api.setFilter({
            name: search,
          });
          return this.api.getProduct().pipe(
            tap(() => {
              this.indicatorService.set(false);
              this.paginatorRef?.firstPage();
            })
          );
        })
      )
      .subscribe((rs) => {
        this.productList = this.addIndex(rs.products);
        this.length = rs.total;
      });
  }

  addToCart(item: any) {
    if (!this.authService.isLogin) {
      const data: DialogData = {
        title: 'Sign in',
        body: 'You need to sign in before add to cart',
        type: 'option',
      };
      this.dialogService.openMessageDialog(data).subscribe((rs: boolean) => {
        if (rs) {
          this.router.navigate(['signin']);
        }
      });
    } else {
      this.cartService.addToCart(item);
      this.dialogService.openSnackBar(
        `Item: '${item.name}' add to cart successfully`,
        'OK'
      );
    }
  }

  onPageChange(e: PageEvent | number) {
    let page;
    if (typeof e === 'number') page = e;
    else page = e.pageIndex + 1;

    this.indicatorService.set(true);
    this.api.getProduct(page).subscribe((rs) => {
      this.indicatorService.set(false);
      this.productList = this.addIndex(rs.products);
    });
  }

  addIndex(item: any[]) {
    return item.map((it, i) => ({ ...it, index: i + 1 }));
  }

  filter(filter: string) {}

  removeItem({ _id, name }: Product) {
    const data: DialogData = {
      title: 'Delete',
      body: `Do you want to delete ${name}`,
      type: 'option',
    };
    this.dialogService.openMessageDialog(data).subscribe((rs: boolean) => {
      if (rs) {
        this.api.deleteProduct(_id).subscribe((_) => {
          this.onPageChange(1);
        });
      }
    });
  }

  updateProduct(item: Product) {
    this.dialogService.openProductDialog(item).subscribe((data: boolean) => {
      if (data) {
        this.onPageChange(1);
      }
    });
  }

  createProduct() {
    this.dialogService.openProductDialog().subscribe((data: boolean) => {
      if (data) {
        this.onPageChange(1);
      }
    });
  }
}
