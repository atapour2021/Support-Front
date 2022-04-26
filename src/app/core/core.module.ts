import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  HttpConfigInterceptor,
  HttpErrorInterceptor,
} from './interceptors/index';
import { RolePipe } from './pipe';
import { ApiHelperService, CoreService } from './services/index';
import { NotificationService } from './services/notification.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: CoreService,
    },
    {
      provide: ApiHelperService,
    },
    {
      provide: NotificationService,
    },
  ],
  exports: [RolePipe],
  declarations: [RolePipe],
})
export class CoreModule {}
