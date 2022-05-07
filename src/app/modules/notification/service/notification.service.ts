import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHelperService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { NotificationLisArgDto } from '../dto/notification.dto';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private baseUrl!: string;

  constructor(private _apiService: ApiHelperService) {
    this.baseUrl = environment.baseUrl;
  }

  getNotifications(body: NotificationLisArgDto): Observable<any> {
    let url = `${this.baseUrl}/Notifications`;
    if (body.page) url += `/${body.page}`;
    if (body.pageSize) url += `/${body.pageSize}`;
    return this._apiService.get<any>(url);
  }

  removeNotification(id: string): Observable<any> {
    let url = `${this.baseUrl}/Notifications`;
    return this._apiService.delete<any>(url, id);
  }
}
