import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/core/services';
import { CardService } from 'src/app/shared/components/card-list/card-list.service';
import swal from 'sweetalert2';
import { AdvertiseDto, AdvertiseLisArgDto } from '../../dto/advertise.dto';
import { AdvertisesService } from '../../service/advertise.service';
import { CreateComponent } from '../create/create.component';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  advertiseListArg = new AdvertiseLisArgDto();
  advertiseList: AdvertiseDto[] = [];
  loading = false;
  pageSize = 10;
  page = 1;

  totalElement!: number;
  showPagination = false;

  constructor(
    public translate: TranslateService,
    private _advertisesService: AdvertisesService,
    public dialog: MatDialog,
    private _cardService: CardService,
    private notificationService: NotificationService
  ) {
    translate.addLangs(['en', 'persian']);
    translate.setDefaultLang('persian');
  }

  ngOnInit(): void {
    this.advertiseListArg.init({
      page: 1,
      pageSize: 10,
    });
    this.getAdvertiseList(this.advertiseListArg);
  }
  getAdvertiseList(data: AdvertiseLisArgDto): void {
    this.loading = true;
    this._advertisesService.getAdvertises(data).subscribe((response: any) => {
      this.loading = false;
      if (!response.success) return;
      this.advertiseList = response.listData;
      this.totalElement = response.totalItem;
      this.showPagination = true;
    });
  }

  addAdvertise(): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '450px',
      disableClose: true,
    });

    // dialogRef.componentInstance.onSave.subscribe(result => {
    //   if (!result) return;
    //   if (result.success) {
    //     dialogRef.close();
    //     this.getAdvertiseList(this.AdvertiseListArg);
    //   }
    // });
  }
  editAdvertise(event: any) {
    const id = this._cardService.getSelevtion(event);
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '450px',
      disableClose: true,
      data: {
        id: id,
        editModalTitle: `ویرایش ${this.getAdvertiseName(id)}`,
      },
    });

    // dialogRef.componentInstance.onSave.subscribe(result => {
    //   if (!result) return;
    //   if (result.success) {
    //     dialogRef.close();
    //     this.getAdvertiseList(this.AdvertiseListArg);
    //   }
    // });
  }
  removeAdvertise(event: any): void {
    const id = this._cardService.getSelevtion(event);
    swal
      .fire({
        title: 'حذف تبلیغات ',
        text: ` ${this.getAdvertiseName(id)} را حذف کنید؟`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر',
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          this._advertisesService
            .removeAdvertise(id)
            .subscribe((response: any) => {
              this.getAdvertiseList(this.advertiseListArg);
              this.notificationService.showNotification(response);
            });
        }
      });
  }
  // onSearchClick(): void {
  //   const dialogRef = this.dialog.open(AdvertiseFilterComponent, {
  //     width: '300px',
  //     height: '100%',
  //     position: {
  //       top: '0',
  //       left: '0',
  //     },
  //     data: {
  //       data: this.AdvertiseListArg,
  //     },
  //   });
  //   dialogRef.componentInstance.onFitterClick.subscribe(
  //     (data: AdvertiseDto) => {
  //       dialogRef.close();
  //       if (!data) return;
  //       this.AdvertiseListArg.init(data);
  //       this.AdvertiseListArg.page = this.page;
  //       this.AdvertiseListArg.pageSize = this.pageSize;
  //       this.getAdvertiseList(this.AdvertiseListArg);
  //     }
  //   );
  // }

  getAdvertiseName(id: string | undefined): string | undefined {
    const advertise: AdvertiseDto = this.advertiseList.find(a => a._id === id)!;
    if (!advertise) return undefined;
    return advertise.title;
  }

  onPageChange(data: any): void {
    this.advertiseListArg.init({
      page: data.page,
      pageSize: data.pageSize,
    });

    this.getAdvertiseList(this.advertiseListArg);
  }
}
