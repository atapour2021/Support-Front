import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { NotificationRoutingModule } from './notification.routing.module';
import { NotificationsService } from './service/notification.service';

@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    NotificationRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [NotificationsService],
})
export class NotificationModule {}
