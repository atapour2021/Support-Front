import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/services';
import { RegisterDto } from '../../dto/auth.dto';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerData = new RegisterDto();
  saving = false;

  constructor(
    public translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    translate.addLangs(['en', 'persian']);
    translate.setDefaultLang('persian');
  }

  onRegisterClick(): void {
    this.authService
      .register(this.registerData)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((result: any) => {
        if (result.success) {
          this.notificationService.showNotification(result);
          this.router.navigate(['auth/login']);
        } else {
          this.notificationService.showNotification(result);
        }
      });
  }
}
