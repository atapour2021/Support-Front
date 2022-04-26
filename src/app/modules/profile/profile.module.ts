import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { ProfileRoutingModule } from './profile.routing';
import { ProfileService } from './service/profile.service';
import { ProfileComponent } from './view/profile/profile.component';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CoreModule,
    ProfileRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ProfileService],
})
export class ProfileModule {}
