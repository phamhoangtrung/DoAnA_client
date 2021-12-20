import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaringComponent } from './staring.component';

describe('StaringComponent', () => {
  let component: StaringComponent;
  let fixture: ComponentFixture<StaringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
