import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHelperService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { LoginDto, RefreshTokenDto, RegisterDto } from '../dto/auth.dto';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string;

  constructor(private _apiService: ApiHelperService) {
    this.baseUrl = environment.baseUrl;
  }

  checkAuth(): boolean {
    let isAuth = false;
    if (localStorage.getItem('token')) isAuth = true;
    else isAuth = false;

    return isAuth;
  }

  getUserIdFromToken(): string {
    const token = localStorage.getItem('token');
    const decodedToken: any = jwt_decode(token!);
    return decodedToken.id;
  }

  Login(body: LoginDto): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this._apiService.post<LoginDto>(body, url);
  }

  register(body: RegisterDto): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this._apiService.post<RegisterDto>(body, url);
  }

  logout(userId: string): Observable<any> {
    const url = `${this.baseUrl}/logout`;
    return this._apiService.post<{ userId: string }>({ userId: userId }, url);
  }

  getRefreshToken(data: RefreshTokenDto): Observable<any> {
    const url = `${this.baseUrl}/refresh-token`;
    return this._apiService.post<RefreshTokenDto>(data, url);
  }
}
