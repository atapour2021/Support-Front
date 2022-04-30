import { Component, Inject, OnInit } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { TranslateService } from '@ngx-translate/core';
import { NotificationDto } from 'src/app/modules/notification/dto/notification.dto';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
  baseImagePath!: string;
  image!: string;
  notifications: NotificationDto[] = [];

  constructor(
    public translate: TranslateService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<NotificationListComponent>
  ) {}

  ngOnInit(): void {
    this.notifications = this.data.notifications;
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
