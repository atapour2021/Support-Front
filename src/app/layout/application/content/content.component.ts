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

export interface INotificationList {
  id: number | undefined;
  counter: number | undefined;
  changeStateDateTime: string | undefined;
  createDateTime: string | undefined;
  description: string | undefined;
  fromUserId: string | undefined;
  state: number | undefined;
  timeAgo: string | undefined;
  title: string | undefined;
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, AfterViewInit {
  showFiller = false;
  completeRegister = true;
  navItems: NavItem[] = [];
  notificationList: INotificationList[] = [
    {
      id: 1,
      counter: 1,
      changeStateDateTime: '1400/02/10',
      createDateTime: '1400/02/10',
      description: 'تجهیز شما فعال شد.',
      fromUserId: undefined,
      state: 0,
      timeAgo: '3 روز پیش',
      title: 'فعال سازی',
    },
    {
      id: 1,
      counter: 1,
      changeStateDateTime: '1400/02/10',
      createDateTime: '1400/02/10',
      description: 'پیغام ادمین توضیحات ....',
      fromUserId: undefined,
      state: 1,
      timeAgo: '2 ساعت پیش',
      title: 'پیغام ادمین',
    },
  ];
  count!: number;

  profileId: string | undefined;
  profile = new ProfileDto();
  baseUrl: string | undefined;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  _observer!: BreakpointObserver;

  constructor(
    public translate: TranslateService,
    private observer: BreakpointObserver,
    private _bottomSheet: MatBottomSheet,
    private router: Router,
    private authService: AuthService,
    private navService: NavService,
    private profileService: ProfileService
  ) {
    translate.addLangs(['en', 'persian']);
    translate.setDefaultLang('persian');

    this._observer = this.observer;

    this.profileId = JSON.parse(localStorage.getItem('user')!).profileId;
    this.baseUrl = `${environment.baseUrl}/file-uploader`;
  }

  ngOnInit(): void {
    this.setMenuItem();
    this.getProfile(this.profileId!);
  }

  getProfile(id: string): void {
    this.profileService.getProfile(id).subscribe((response_: any) => {
      this.profile.init(response_);
    });
  }

  ngAfterViewInit(): void {
    this._observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  setMenuItem(): void {
    this.navService.getMenu().subscribe((menu: any) => {
      this.navItems = menu.data;
    });
  }

  updateLayout(): void {
    this.getProfile(this.profileId!);
  }

  getCount(id: string) {}

  onLogOutClick(): void {
    this.authService.logout();
  }
  openNotifList(): void {
    this._bottomSheet.open(NotificationListComponent, {
      data: {
        notifications: this.notificationList,
      },
    });
  }
  openShoppingCart(): void {
    this.router.navigate(['app/products/shoppingcart']);
  }
  moveToProfile(): void {
    this.router.navigate(['app/profile']);
  }
}
