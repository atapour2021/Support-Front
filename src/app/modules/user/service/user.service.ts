import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHelperService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { UserLisArgDto } from '../dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl!: string;

  constructor(private _apiService: ApiHelperService) {
    this.baseUrl = environment.baseUrl;
  }

  getUsers(body: UserLisArgDto): Observable<any> {
    let url = `${this.baseUrl}/Users`;
    if (body.page) url += `/${body.page}`;
    if (body.pageSize) url += `/${body.pageSize}`;
    return this._apiService.get<any>(url);
  }

  removeUser(id: string): Observable<any> {
    let url = `${this.baseUrl}/Users`;
    return this._apiService.delete<any>(url, id);
  }
}
