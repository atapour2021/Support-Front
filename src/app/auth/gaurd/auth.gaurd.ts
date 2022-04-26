import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import jwt_decode from 'jwt-decode';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.checkAuth()) {
      this.login();
      return false;
    } else {
      const token = localStorage.getItem('token');
      const decodedToken: unknown = jwt_decode(token!);
      localStorage.setItem('user', JSON.stringify(decodedToken));
      return true;
    }
  }

  login(): void {
    this.router.navigate(['/auth/login']);
  }
}
