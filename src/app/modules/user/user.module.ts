import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user.routing.module';
import { UserService } from './service/user.service';
import { CreateComponent } from './view/create/create.component';
import { ListComponent } from './view/list/list.component';
import { UpdateComponent } from './view/update/update.component';

@NgModule({
  declarations: [ListComponent, CreateComponent, UpdateComponent],
  imports: [
    CoreModule,
    UserRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UserService],
})
export class UserModule {}
