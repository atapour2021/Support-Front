import { Component, Inject, OnInit } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

export interface INotificationListDto {
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
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
  baseImagePath!: string;
  image!: string;
  notifications: INotificationListDto[] = [];

  constructor(
    public translate: TranslateService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<NotificationListComponent>
  ) {
    // this.baseImagePath = `${environment.fileUploaderUrl_}/Download`;
  }

  ngOnInit(): void {
    this.notifications = this.data.notifications;
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
