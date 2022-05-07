import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/core/services';
import {
  CardService,
  ICardSetting,
} from 'src/app/shared/components/card-list/card-list.service';
import swal from 'sweetalert2';
import { UserDto, UserLisArgDto } from '../../dto/user.dto';
import { UserService } from '../../service/user.service';
import { CreateComponent } from '../create/create.component';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  UserListArg = new UserLisArgDto();
  userList: UserDto[] = [];
  loading = false;
  pageSize = 10;
  page = 1;
  cardsSetting: ICardSetting[] = [];

  constructor(
    public translate: TranslateService,
    private _UserService: UserService,
    public dialog: MatDialog,
    private _cardService: CardService,
    private notificationService: NotificationService
  ) {
    translate.addLangs(['en', 'persian']);
    translate.setDefaultLang('persian');
  }

  ngOnInit(): void {
    this.UserListArg.init({
      page: 1,
      pageSize: 10,
    });
    this.getUserList(this.UserListArg);
  }
  getUserList(data: UserLisArgDto): void {
    this.loading = true;
    this._UserService.getUsers(data).subscribe((response: any) => {
      this.loading = false;
      if (!response.success) return;
      this.userList = response.listData;
      this.fillCardSetting(response.listData);
    });
  }
  fillCardSetting(data: UserDto[]): void {
    this.cardsSetting = [];
    data.forEach((item: UserDto) => {
      this.cardsSetting.push({
        title: item.userName!,
        selectionValue: item._id!,
        contents: [
          {
            name: 'FullName',
            value: item.fullName,
          },
          {
            name: 'NationalCode',
            value: item.nationalCode,
          },
          {
            name: 'Role',
            value: item.userRole,
            hasPipe: true,
          },
        ],
      });
    });
  }

  addUser(): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '450px',
      disableClose: true,
    });

    // dialogRef.componentInstance.onSave.subscribe(result => {
    //   if (!result) return;
    //   if (result.success) {
    //     dialogRef.close();
    //     this.getUserList(this.UserListArg);
    //   }
    // });
  }
  editUser(event: any) {
    const id = this._cardService.getSelevtion(event);
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '450px',
      disableClose: true,
      data: {
        id: id,
        editModalTitle: `ویرایش ${this.getUserName(id)}`,
      },
    });

    // dialogRef.componentInstance.onSave.subscribe(result => {
    //   if (!result) return;
    //   if (result.success) {
    //     dialogRef.close();
    //     this.getUserList(this.UserListArg);
    //   }
    // });
  }
  removeUser(event: any): void {
    const id = this._cardService.getSelevtion(event);
    swal
      .fire({
        title: 'حذف کاربر ',
        text: ` ${this.getUserName(id)} را حذف کنید؟`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر',
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          this._UserService.removeUser(id).subscribe((response: any) => {
            this.getUserList(this.UserListArg);
            this.notificationService.showNotification(response);
          });
        }
      });
  }
  // onSearchClick(): void {
  //   const dialogRef = this.dialog.open(UserFilterComponent, {
  //     width: '300px',
  //     height: '100%',
  //     position: {
  //       top: '0',
  //       left: '0',
  //     },
  //     data: {
  //       data: this.UserListArg,
  //     },
  //   });
  //   dialogRef.componentInstance.onFitterClick.subscribe(
  //     (data: UserDto) => {
  //       dialogRef.close();
  //       if (!data) return;
  //       this.UserListArg.init(data);
  //       this.UserListArg.page = this.page;
  //       this.UserListArg.pageSize = this.pageSize;
  //       this.getUserList(this.UserListArg);
  //     }
  //   );
  // }

  getUserName(id: string | undefined): string | undefined {
    const user: UserDto = this.userList.find(e => e._id === id)!;
    if (!user) return undefined;
    return user.fullName;
  }
}
