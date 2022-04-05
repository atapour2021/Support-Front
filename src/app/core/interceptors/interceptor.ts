import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let contentType = request.headers.get('Content-Type');

    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', token),
      });
    }

    if (!contentType) {
      if (typeof request.body === 'string') {
        request = request.clone({
          headers: request.headers.set('Content-Type', 'application/json'),
        });
      }
    }
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      })
    );
  }
}
