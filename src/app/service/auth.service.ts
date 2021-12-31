import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DialogData } from '../models/dialog.model';
import { UserSignin, UserSignup, User } from '../models/user.model';
import { DialogService } from './dialog.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  model = 'auth';
  user: User | null = null;

  constructor(
    private http: HttpClient,
    private ls: LocalStorageService,
    private router: Router,
    private dialogService: DialogService
  ) {
    const localData = this.getUser();
    if (localData != null) {
      this.user = localData;
    } else {
      this.user = null;
    }
  }

  get isLogin() {
    return !!this.user;
  }

  get isAdmin() {
    if (this.user) {
      return this.user.role === 'admin' || this.user.role === 'sys-admin'
        ? true
        : false;
    }
    return false;
  }

  private getUser() {
    return this.ls.get<User>('user');
  }

  private setUser(user: User | null) {
    this.ls.set<User | null>('user', user);
  }

  checkEmailExist(email: string) {
    return this.http.post<{ valid: boolean }>(
      `${environment.baseUrl}/${this.model}/check-email`,
      { email }
    );
  }

  signup(user: UserSignup) {
    this.http
      .post<User>(`${environment.baseUrl}/${this.model}/signup`, {
        user,
      })
      .pipe(
        map((res: any) => ({
          ...res.user,
          token: res.token,
        }))
      )
      .subscribe((res: User) => {
        this.setUser(res);
        this.user = res;
        this.router.navigate(['/']);
      });
  }

  signin(user: UserSignin) {
    this.http
      .post<User>(`${environment.baseUrl}/${this.model}/signin`, {
        user,
      })
      .pipe(
        map((res: any) => ({
          ...res.user,
          token: res.token,
        }))
      )
      .subscribe({
        next: (res: User) => {
          this.setUser(res);
          this.user = res;
          this.router.navigate(['/']);
        },
        error: (err) => {
          const dialogData: DialogData = {
            title: 'Error Notification',
            body: err.error.msg,
            type: 'confirm',
          };
          this.dialogService.openMessageDialog(dialogData);
        },
      });
  }

  signOut() {
    this.setUser(null);
    this.user = null;
    this.router.navigate(['products']);
  }

  changeName(name: string) {
    return this.http
      .patch(`${environment.baseUrl}/${this.model}/change-name`, {
        name,
      })
      .pipe(
        tap((res: any) => {
          const user = { ...this.user, ...res.customer };
          console.log(user);
          this.user = user;
          this.setUser(user);
        })
      );
  }
}
