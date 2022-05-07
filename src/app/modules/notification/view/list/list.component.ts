import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/core/services';
import {
  CardService,
  ICardSetting,
} from 'src/app/shared/components/card-list/card-list.service';
import swal from 'sweetalert2';
import {
  NotificationDto,
  NotificationLisArgDto,
} from '../../dto/notification.dto';
import { NotificationsService } from '../../service/notification.service';
import { CreateComponent } from '../create/create.component';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  notificationListArg = new NotificationLisArgDto();
  notificationList: NotificationDto[] = [];
  loading = false;
  pageSize = 10;
  page = 1;
  cardsSetting: ICardSetting[] = [];

  constructor(
    public translate: TranslateService,
    private _notificationsService: NotificationsService,
    public dialog: MatDialog,
    private _cardService: CardService,
    private notificationService: NotificationService
  ) {
    translate.addLangs(['en', 'persian']);
    translate.setDefaultLang('persian');
  }

  ngOnInit(): void {
    this.notificationListArg.init({
      page: 1,
      pageSize: 10,
    });
    this.getNotificationList(this.notificationListArg);
  }
  getNotificationList(data: NotificationLisArgDto): void {
    this.loading = true;
    this._notificationsService
      .getNotifications(data)
      .subscribe((response: any) => {
        this.loading = false;
        if (!response.success) return;
        this.notificationList = response.listData;
        this.fillCardSetting(response.listData);
      });
  }
  fillCardSetting(data: NotificationDto[]): void {
    this.cardsSetting = [];
    data.forEach((item: NotificationDto) => {
      this.cardsSetting.push({
        title: item.title!,
        selectionValue: item._id!,
        contents: [
          {
            name: 'Creator',
            value: item.creator,
          },
          {
            name: 'IsVisited',
            value: item.isVisited,
          },
          {
            name: 'CreateDate',
            value: item.createDate,
          },
          {
            name: 'Description',
            value: item.description,
          },
        ],
      });
    });
  }

  addNotification(): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '450px',
      disableClose: true,
    });

    // dialogRef.componentInstance.onSave.subscribe(result => {
    //   if (!result) return;
    //   if (result.success) {
    //     dialogRef.close();
    //     this.getNotificationList(this.NotificationListArg);
    //   }
    // });
  }
  editNotification(event: any) {
    const id = this._cardService.getSelevtion(event);
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '450px',
      disableClose: true,
      data: {
        id: id,
        editModalTitle: `ویرایش ${this.getNotificationName(id)}`,
      },
    });

    // dialogRef.componentInstance.onSave.subscribe(result => {
    //   if (!result) return;
    //   if (result.success) {
    //     dialogRef.close();
    //     this.getNotificationList(this.NotificationListArg);
    //   }
    // });
  }
  removeNotification(event: any): void {
    const id = this._cardService.getSelevtion(event);
    swal
      .fire({
        title: 'حذف اعلان ',
        text: ` ${this.getNotificationName(id)} را حذف کنید؟`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر',
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          this._notificationsService
            .removeNotification(id)
            .subscribe((response: any) => {
              this.getNotificationList(this.notificationListArg);
              this.notificationService.showNotification(response);
            });
        }
      });
  }
  // onSearchClick(): void {
  //   const dialogRef = this.dialog.open(NotificationFilterComponent, {
  //     width: '300px',
  //     height: '100%',
  //     position: {
  //       top: '0',
  //       left: '0',
  //     },
  //     data: {
  //       data: this.NotificationListArg,
  //     },
  //   });
  //   dialogRef.componentInstance.onFitterClick.subscribe(
  //     (data: NotificationDto) => {
  //       dialogRef.close();
  //       if (!data) return;
  //       this.NotificationListArg.init(data);
  //       this.NotificationListArg.page = this.page;
  //       this.NotificationListArg.pageSize = this.pageSize;
  //       this.getNotificationList(this.NotificationListArg);
  //     }
  //   );
  // }

  getNotificationName(id: string | undefined): string | undefined {
    const Notification: NotificationDto = this.notificationList.find(
      e => e._id === id
    )!;
    if (!Notification) return undefined;
    return `${Notification.title!} ${Notification.creator!}`;
  }
}
