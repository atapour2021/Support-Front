import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { AdvertiseRoutingModule } from './advertise.routing.module';
import { AdvertiseCardComponent } from './components';
import { AdvertisesService } from './service/advertise.service';
import { CreateComponent } from './view/create/create.component';
import { ExtraFileComponent } from './view/extra-file/extra-file.component';
import { ListComponent } from './view/list/list.component';
import { UpdateComponent } from './view/update/update.component';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    UpdateComponent,
    AdvertiseCardComponent,
    ExtraFileComponent
  ],
  imports: [
    CoreModule,
    AdvertiseRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AdvertisesService],
})
export class AdvertiseModule {}
