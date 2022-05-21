import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHelperService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { TokenLisArgDto } from '../dto/token.dto';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private baseUrl!: string;

  constructor(private _apiService: ApiHelperService) {
    this.baseUrl = environment.baseUrl;
  }

  getTokens(body: TokenLisArgDto): Observable<any> {
    let url = `${this.baseUrl}/Tokens`;
    if (body.page) url += `/${body.page}`;
    if (body.pageSize) url += `/${body.pageSize}`;
    return this._apiService.get<any>(url);
  }

  removeToken(id: string): Observable<any> {
    let url = `${this.baseUrl}/Tokens`;
    return this._apiService.delete<any>(url, id);
  }
}
