import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHelperService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { RequestLisArgDto } from '../dto/request.dto';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private baseUrl!: string;

  constructor(private _apiService: ApiHelperService) {
    this.baseUrl = environment.baseUrl;
  }

  getRequests(body: RequestLisArgDto): Observable<any> {
    let url = `${this.baseUrl}/Requests`;
    if (body.page) url += `/${body.page}`;
    if (body.pageSize) url += `/${body.pageSize}`;
    return this._apiService.get<any>(url, false);
  }

  removeRequest(id: string): Observable<any> {
    let url = `${this.baseUrl}/Requests`;
    return this._apiService.delete<any>(url, id);
  }

  confirmChangeUserRolerequest(id: string): Observable<any> {
    let url = `${this.baseUrl}/Request-type/changeUserRole`;
    const body = {
      id: id,
    };
    return this._apiService.post<{ id: string }>(body, url);
  }
}
