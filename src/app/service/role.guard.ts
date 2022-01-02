import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(public router: Router, private authService: AuthService) { }
  canActivate(): boolean {
    // redirect if not admin
    if (!this.authService.user) return false;

    const token = this.authService.user?.token;
    const tokenPayload = decode<{ role: string }>(token || '');

    if (tokenPayload.role === 'user') {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
