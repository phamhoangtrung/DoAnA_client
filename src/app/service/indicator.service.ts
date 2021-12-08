import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndicatorService {
  private isLoading = new BehaviorSubject(false);

  constructor() {}

  set(isLoading: boolean) {
    this.isLoading.next(isLoading);
  }

  get() {
    return this.isLoading.asObservable();
  }
}
