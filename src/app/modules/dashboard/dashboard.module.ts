import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardService } from './service/dashboard.service';
import { DashboardComponent } from './view/dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CoreModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DashboardService],
})
export class DashboardModule {}
