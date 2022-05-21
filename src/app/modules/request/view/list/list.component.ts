import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/core/services';
import {
  CardService,
  ICardSetting,
} from 'src/app/shared/components/card-list/card-list.service';
import swal from 'sweetalert2';
import { RequestDto, RequestLisArgDto } from '../../dto/request.dto';
import { RequestsService } from '../../service/request.service';
import { CreateComponent } from '../create/create.component';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  requestListArg = new RequestLisArgDto();
  requestList: RequestDto[] = [];
  loading = false;
  pageSize = 10;
  page = 1;
  cardsSetting: ICardSetting[] = [];

  totalElement!: number;
  showPagination = false;

  constructor(
    public translate: TranslateService,
    private _RequestsService: RequestsService,
    public dialog: MatDialog,
    private _cardService: CardService,
    private notificationService: NotificationService
  ) {
    translate.addLangs(['en', 'persian']);
    translate.setDefaultLang('persian');
  }

  ngOnInit(): void {
    this.requestListArg.init({
      page: 1,
      pageSize: 10,
    });
    this.getRequestList(this.requestListArg);
  }
  getRequestList(data: RequestLisArgDto): void {
    this.loading = true;
    this._RequestsService.getRequests(data).subscribe((response: any) => {
      this.loading = false;
      if (!response.success) return;
      this.requestList = response.listData;
      this.totalElement = response.totalItem;
      this.showPagination = true;
      this.fillCardSetting(response.listData);
    });
  }
  fillCardSetting(data: RequestDto[]): void {
    this.cardsSetting = [];
    data.forEach((item: RequestDto) => {
      this.cardsSetting.push({
        title: item.applicant!,
        selectionValue: item._id!,
        contents: [
          {
            name: 'Type',
            value: item.type,
            hasPipe: true,
          },
          {
            name: 'CreateDate',
            value: item.requestDate,
            hasPipe: true,
          },
          {
            name: 'RequestState',
            value: item.requestState,
            hasPipe: true,
          },
          {
            name: 'Description',
            value: item.description,
          },
        ],
      });
    });
  }

  addRequest(): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '450px',
      disableClose: true,
    });

    // dialogRef.componentInstance.onSave.subscribe(result => {
    //   if (!result) return;
    //   if (result.success) {
    //     dialogRef.close();
    //     this.getRequestList(this.requestListArg);
    //   }
    // });
  }
  editRequest(event: any) {
    const id = this._cardService.getSelevtion(event);
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '450px',
      disableClose: true,
      data: {
        id: id,
        editModalTitle: `ویرایش ${this.getRequestName(id)}`,
      },
    });

    // dialogRef.componentInstance.onSave.subscribe(result => {
    //   if (!result) return;
    //   if (result.success) {
    //     dialogRef.close();
    //     this.getRequestList(this.requestListArg);
    //   }
    // });
  }
  removeRequest(event: any): void {
    const id = this._cardService.getSelevtion(event);
    swal
      .fire({
        title: 'حذف درخواست ',
        text: ` ${this.getRequestName(id)} را حذف کنید؟`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر',
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          this._RequestsService.removeRequest(id).subscribe((response: any) => {
            this.getRequestList(this.requestListArg);
            this.notificationService.showNotification(response);
          });
        }
      });
  }

  getRequestName(id: string | undefined): string | undefined {
    const request: RequestDto = this.requestList.find(e => e._id === id)!;
    if (!request) return undefined;
    return `${request.type} ${request.applicant!}`;
  }

  onPageChange(data: any): void {
    this.requestListArg.init({
      page: data.page,
      pageSize: data.pageSize,
    });

    this.getRequestList(this.requestListArg);
  }
}
