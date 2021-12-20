import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTableDialogComponent } from './product-table-dialog.component';

describe('ProductTableDialogComponent', () => {
  let component: ProductTableDialogComponent;
  let fixture: ComponentFixture<ProductTableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTableDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
