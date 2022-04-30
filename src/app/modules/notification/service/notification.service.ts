import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHelperService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private baseUrl!: string;

  constructor(private _apiService: ApiHelperService) {
    this.baseUrl = environment.baseUrl;
  }

  getNotifications(): Observable<any> {
    const url = `${this.baseUrl}/Notifications`;
    return this._apiService.get<any>(url);
  }

}
