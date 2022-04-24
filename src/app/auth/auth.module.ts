import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth.routing.module';
import { AuthInputComponent } from './components';
import { AuthGuard } from './gaurd/auth.gaurd';
import { AuthService } from './service/auth.service';
import { LoginComponent } from './view/login/login.component';
import { RegisterComponent } from './view/register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthInputComponent],
  imports: [
    CoreModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
