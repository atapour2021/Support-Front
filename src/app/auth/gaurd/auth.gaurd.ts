import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.checkAuth()) {
      this.login();
      return false;
    } else {
      return true;
    }
  }

  login(): void {
    this.router.navigate(['/auth/login']);
  }
}
