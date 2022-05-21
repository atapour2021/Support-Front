import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { TokenService } from './service/token.service';
import { TokenRoutingModule } from './token.routing.module';
import { ListComponent } from './view/list/list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CoreModule,
    TokenRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [TokenService],
})
export class TokenModule {}
