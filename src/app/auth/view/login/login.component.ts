import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/services';
import { LoginDto } from '../../dto/auth.dto';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginData = new LoginDto();
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

  onLoginClick(): void {
    this.authService
      .Login(this.loginData)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((result: any) => {
        if (result.success) {
          localStorage.setItem('token', result.data);
          this.router.navigate(['app/dashboard']);
        } else {
          this.notificationService.showNotification(result);
        }
      });
  }
}
