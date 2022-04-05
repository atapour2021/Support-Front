import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  HttpConfigInterceptor,
  HttpErrorInterceptor,
} from './interceptors/index';
import { ApiHelperService, CoreService } from './services/index';

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
  ],
  exports: [],
  declarations: [],
})
export class CoreModule {}
