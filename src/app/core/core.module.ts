import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  HttpConfigInterceptor,
  HttpErrorInterceptor,
} from './interceptors/index';
import {
  jalalidateconvertor,
  RequestStatePipe,
  RequestTypePipe,
  RolePipe,
  TranslateBooleanPipe,
} from './pipe';
import {
  ApiHelperService,
  CoreService,
  RealtimeService,
} from './services/index';
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
    {
      provide: RealtimeService,
    },
  ],
  exports: [
    RolePipe,
    jalalidateconvertor,
    TranslateBooleanPipe,
    RequestStatePipe,
    RequestTypePipe,
  ],
  declarations: [
    RolePipe,
    jalalidateconvertor,
    TranslateBooleanPipe,
    RequestStatePipe,
    RequestTypePipe,
  ],
})
export class CoreModule {}
