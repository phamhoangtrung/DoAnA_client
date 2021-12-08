import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { IndicatorService } from './indicator.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  model = 'auth';

  constructor(private http: HttpClient) {}

  getAllUser() {
    return this.http.get(`${environment.baseUrl}/${this.model}`);
  }

  approveUser(user: User) {
    return this.http.patch(
      `${environment.baseUrl}/${this.model}/${user._id}`,
      null
    );
  }
}
