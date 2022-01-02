import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  setDocumentTitle(title: string, body?: string) {
    if (body) {
      document.title = `${title} - ${body}`;
    } else {
      document.title = `${title}`;
    }
  }
}
