import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/service/auth.service';
// import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private _notificationService: Toaster,
    private _authService: AuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          this.handleServerError(error);
        }
        return throwError(errorMsg);
      })
    );
  }
  handleServerError(error: HttpErrorResponse): void {
    if (error.status == 400) this.handleMessage('درخواست شما نامعتبر میباشد');
    else if (error.status == 401 || error.status == 403) this.getRefreshToken();
    else if (error.status == 403)
      this.handleMessage('شما به این بخش دسترسی ندارید');
    else if (error.status == 404)
      this.handleMessage('درخواست شما نامعتبر میباشد');
    else if (error.status == 405)
      this.handleMessage('نوع درخواست شما صحیح نمی باشد');
    else if (error.status == 500) this.handleMessage('خطا در سرور داخلی');
    else this.handleMessage('خطایی رخ داده ، مجددا تلاش نمایید');
  }
  handleMessage(message: string): void {
    this._notificationService.open({
      text: message,
      type: 'danger',
      duration: 4000,
      position: 'bottom-center',
    });
  }

  getRefreshToken(): void {
    this._authService.getRefreshToken().subscribe((response: any) => {
      if (!response.success) {
        this.router.navigate(['/auth/login']);
        this.handleMessage('کاربر یافت نشد!');
      }
      localStorage.clear();
      localStorage.setItem('token', response.data);
      location.reload();
    });
  }
}
