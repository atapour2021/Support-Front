import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiHelperService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { LoginDto, RegisterDto } from '../dto/auth.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string;

  constructor(private _apiService: ApiHelperService, private router: Router) {
    this.baseUrl = environment.baseUrl;
  }

  checkAuth(): boolean {
    let isAuth = false;
    if (localStorage.getItem('token')) isAuth = true;
    else isAuth = false;

    return isAuth;
  }

  Login(body: LoginDto): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this._apiService.post<LoginDto>(body, url);
  }

  register(body: RegisterDto): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this._apiService.post<RegisterDto>(body, url);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
