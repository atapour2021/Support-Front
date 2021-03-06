import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/services';
import { AdvertiseDto } from '../../dto/advertise.dto';
import { AdvertisesService } from '../../service/advertise.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-extra-file',
  templateUrl: './extra-file.component.html',
  styleUrls: ['./extra-file.component.scss'],
})
export class ExtraFileComponent implements OnInit {
  saving = false;
  advertise = new AdvertiseDto();
  showFile = false;
  baseUrl!: string;
  filePath!: string;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<ExtraFileComponent>,
    public dialog: MatDialog,
    public translate: TranslateService,
    private _advertisesService: AdvertisesService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    translate.addLangs(['en', 'persian']);
    translate.setDefaultLang('persian');

    this.baseUrl = `${environment.baseUrl}/file-uploader`;

    const user = JSON.parse(localStorage.getItem('user')!);
    this.advertise.userId = user.id;
    this.advertise.createDate = Date.now().toString();
  }

  ngOnInit(): void {
    this.findAdvertise(this.data.id!);
  }
  findAdvertise(id: string): void {
    this._advertisesService.findAdvertise(id).subscribe(result => {
      if (!result.success) return;
      this.advertise.init(result.data);
      this.advertise.createDate = Date.now().toString();
      this.filePath = result.data.extraDataFile;
      this.showFile = true;
    });
  }

  uploadFile(body: any): void {
    this.advertise.extraDataFile = body.data;
  }
  removeFile(): void {
    this.advertise.extraDataFile = '';
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    this.saving = true;

    this._advertisesService
      .editAdvertise(this.advertise, this.data.id)
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
