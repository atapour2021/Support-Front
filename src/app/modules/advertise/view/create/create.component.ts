import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/services';
import { AdvertiseDto } from '../../dto/advertise.dto';
import { AdvertisesService } from '../../service/advertise.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  saving = false;
  advertise = new AdvertiseDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    public dialog: MatDialog,
    public translate: TranslateService,
    private _advertisesService: AdvertisesService,
    private notificationService: NotificationService
  ) {
    translate.addLangs(['en', 'persian']);
    translate.setDefaultLang('persian');

    const user = JSON.parse(localStorage.getItem('user')!);

    this.advertise.userId = user.id;
    this.advertise.createDate = Date.now().toString();
  }

  uploadFile(body: any): void {
    this.advertise.extraDataFile = body.data;
  }
  uploadImage(body: any): void {
    this.advertise.image = body.data;
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    this.saving = true;
    this._advertisesService
      .createAdvertise(this.advertise)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((responce: any) => {
        if (responce.success) this.onSave.emit(responce);
        this.notificationService.showNotification(responce);
      });
  }
}
