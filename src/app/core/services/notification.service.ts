import { Injectable } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private baseUrl!: string;

  constructor(private _notificationService: Toaster) {}

  showNotification(body: INotification): void {
    if (!body.success) {
      this._notificationService.open({
        caption: 'خطا',
        text: `${body.errorMassage}`,
        type: 'danger',
        position: 'bottom-center',
        duration: 5000,
      });
    } else {
      this._notificationService.open({
        caption: 'موفق',
        text: body.successMassage,
        type: 'success',
        position: 'bottom-center',
        duration: 5000,
      });
    }
  }

  showRegisterNotification(massage: string): void {
    this._notificationService.open({
      caption: 'پیام سیستمی',
      text: `${massage}`,
      type: 'primary',
      position: 'bottom-center',
      duration: 5000,
    });
  }
}

export interface INotification {
  successMassage: string;
  errorMassage: string;
  success: boolean;
}
