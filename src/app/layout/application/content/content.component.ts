import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { delay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ProfileDto } from 'src/app/modules/profile/dto/profile.dto';
import { ProfileService } from 'src/app/modules/profile/service/profile.service';
import { NavItem } from '../menu-list-item/nav-item';
import { NavService } from '../menu-list-item/nav.service';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { environment } from 'src/environments/environment';
import { RealtimeService } from 'src/app/core/services';
import { NotificationsService } from 'src/app/modules/notification/service/notification.service';
import {
  NotificationDto,
  NotificationLisArgDto,
} from 'src/app/modules/notification/dto/notification.dto';
import { NotificationService } from 'src/app/core/services';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, AfterViewInit {
  navItems: NavItem[] = [];
  count!: number;
  profileId: string | undefined;
  profile = new ProfileDto();
  baseUrl: string | undefined;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  _observer!: BreakpointObserver;
  notifications: NotificationDto[] = [];
  unVisibleNotificationsCount!: number;

  constructor(
    public translate: TranslateService,
    private observer: BreakpointObserver,
    private _bottomSheet: MatBottomSheet,
    private router: Router,
    private authService: AuthService,
    private navService: NavService,
    private profileService: ProfileService,
    private realtimeService: RealtimeService,
    private notificationsService: NotificationsService,
    private notifService: NotificationService
  ) {
    translate.addLangs(['en', 'persian']);
    translate.setDefaultLang('persian');

    this._observer = this.observer;

    this.profileId = JSON.parse(localStorage.getItem('user')!).profileId;
    this.baseUrl = `${environment.baseUrl}/file-uploader`;

    this.realtimeService.receiveNotification().subscribe((message: string) => {
      if (!this.authService.checkAuth()) return;
      this.notifService.showRegisterNotification(message);
      this.getNotifications();
    });
  }

  ngOnInit(): void {
    const role = JSON.parse(localStorage.getItem('user')!).role;
    this.setMenuItem(role);
    this.getProfile(this.profileId!);
    this.getNotifications();
  }
  ngAfterViewInit(): void {
    this._observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe(res => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  getProfile(id: string): void {
    this.profileService.getProfile(id).subscribe((response_: any) => {
      this.profile.init(response_);
    });
  }
  getNotifications(): void {
    const body = new NotificationLisArgDto();
    body.init({
      page: 1,
      pageSize: 10,
    });
    this.notificationsService
      .getNotifications(body)
      .subscribe((response_: any) => {
        if (!response_.success) return;
        this.notifications = response_.listData;
        this.getUnVisibleNotifications(response_.listData);
      });
  }
  getUnVisibleNotifications(notifications: NotificationDto[]): void {
    this.unVisibleNotificationsCount = 0;
    notifications.forEach((notification: NotificationDto) => {
      if (!notification.isVisited) this.unVisibleNotificationsCount++;
    });
  }

  updateLayout(): void {
    this.getProfile(this.profileId!);
  }

  setMenuItem(role: string): void {
    this.navService.getMenu(role).subscribe((menu: any) => {
      this.navItems = menu.data;
    });
  }

  onLogOutClick(): void {
    this.authService.logout();
  }
  openNotifList(): void {
    this._bottomSheet.open(NotificationListComponent, {
      data: {
        notifications: this.notifications,
      },
    });
  }
  moveToProfile(): void {
    this.router.navigate(['app/profile']);
  }
}
