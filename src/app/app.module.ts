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
import { CoreModule } from './core/core.module';
import {
  BaseComponent,
  ContentComponent,
  MenuListItemComponent,
  NotificationListComponent,
} from './layout';
import { NavService } from './layout/application/menu-list-item/nav.service';
import { SharedModule } from './shared/shared.module';

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
  ],
  providers: [
    {
      provide: NavService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
