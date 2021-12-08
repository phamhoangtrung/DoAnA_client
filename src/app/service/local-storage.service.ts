import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  get<T>(key: string): T | null {
    const data = window.localStorage.getItem(key);
    if (data) {
      return JSON.parse(data) as T;
    } else {
      return null;
    }
  }
  set<T>(key: string, data: T): void {
    const addedData = JSON.stringify(data);
    window.localStorage.setItem(key, addedData);
  }
}
