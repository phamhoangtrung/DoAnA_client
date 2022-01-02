import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
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
import { UtilService } from 'src/app/service/util.service';
import { Filter, Selection } from '../../models/share.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  public productList!: Product[];
  public searchTerm = new FormControl('');
  public length!: number;

  selection!: Selection;
  selected = {
    type: '',
    gender: '',
    sort: '',
  };
  column = [
    'no',
    'img',
    'name',
    'rating',
    'price',
    'totalSell',
    'type',
    'gender',
    'sale',
    'createdAt',
    'updatedAt',
    'action',
  ];

  public isLoading!: Observable<boolean>;
  @ViewChild('paginator') paginatorRef!: MatPaginator;

  constructor(
    private api: ApiService,
    public authService: AuthService,
    private router: Router,
    private cartService: CartService,
    private indicatorService: IndicatorService,
    private dialogService: DialogService,
    private utilService: UtilService
  ) {
    utilService.setDocumentTitle('Product', 'page: 1');
  }

  ngOnInit(): void {
    this.api.getSelection().subscribe((res) => {
      this.selection = res;
    });
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
      this.cartService.addToCart(item, 'add');
      this.dialogService.openSnackBar(
        `Item: '${item.name}' add to cart successfully`
      );
    }
  }

  onPageChange(e: PageEvent | number) {
    let page;
    if (typeof e === 'number') page = e;
    else page = e.pageIndex + 1;

    this.utilService.setDocumentTitle('Product', `page: ${page.toString()}`);

    this.indicatorService.set(true);
    this.api.getProduct(page).subscribe((rs) => {
      this.indicatorService.set(false);
      this.productList = this.addIndex(rs.products);
      this.length = rs.total;
      window.scroll(0, 0);
    });
  }

  addIndex(item: any[]) {
    return item.map((it, i) => ({ ...it, index: i + 1 }));
  }

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

  handleStarChange(value: number, id: string) {
    console.log(value, id);
  }

  handleSelectionChange(key: keyof Omit<Filter, 'name'>, value: string) {
    this.selected[key] = value;
    this.api.setFilter({ [key]: value });
    this.startFilter();
  }

  startFilter() {
    this.indicatorService.set(true);
    this.api.getProduct().subscribe((res) => {
      this.paginatorRef?.firstPage();
      this.productList = this.addIndex(res.products);
      this.length = res.total;
      this.indicatorService.set(false);
    });
  }

  resetFilter() {
    this.searchTerm.setValue('');
    this.selected = {
      type: '',
      sort: '',
      gender: '',
    };
    this.api.resetFilter();
    this.startFilter();
  }

  ngOnDestroy(): void {
    this.api.resetFilter();
  }
}
