import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth';
import { CoreModule } from './core/core.module';
import {
  BaseComponent,
  ContentComponent,
  MenuListItemComponent,
  NotificationListComponent,
} from './layout';
import { NavService } from './layout/application/menu-list-item/nav.service';
import { SharedModule } from './shared/shared.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: `${environment.baseUrl}`, options: {} };
const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    MenuListItemComponent,
    NotificationListComponent,
    BaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000',
    }),
    RouterModule.forRoot(routes, { useHash: false }),
    SharedModule,
    ToastNotificationsModule,
    BreadcrumbModule,
    CoreModule,
    AuthModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    {
      provide: NavService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
