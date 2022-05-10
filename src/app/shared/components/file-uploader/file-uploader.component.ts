import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/core/services';
import { FileUploaderService } from './file-uploader.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  fileSrc!: SafeUrl;
  fileTypeValid = true;
  fileSizeValid = true;
  isImage = true;
  file!: File;
  saving = false;
  formData = new FormData();

  @Input() src!: string;
  @Input() fileMaxSize!: number;
  @Input() fileTypeLimit!: string;
  @Input() Label = 'انتخاب فایل';

  @Output() uploadFile = new EventEmitter<any>();
  @Output() removeFile = new EventEmitter<any>();

  constructor(
    public translate: TranslateService,
    private sanitizer: DomSanitizer,
    private _fileUploaderService: FileUploaderService,
    private _notificationService: NotificationService
  ) {
    translate.addLangs(['en', 'persian']);
    translate.setDefaultLang('persian');
  }
  ngOnInit(): void {
    if (this.src) this.fileSrc = this.src;
  }

  onChooseFileClick(): void {
    const file = document.getElementById('file');
    file?.click();
  }
  uploadContent(event: any): void {
    let file = event.target.files[0];
    if (!file) return;
    this.file = file;
    let isValide = this.validateFile(file);
    if (isValide) this.showFile(file);
  }
  showFile(file: File): void {
    this.checkFileType(file);
    this.fileTypeValid = true;
    this.fileSizeValid = true;
    const url = URL.createObjectURL(file);
    this.fileSrc = this.sanitizer.bypassSecurityTrustUrl(url);
    this.onUploadFileClick();
  }

  validateFile(file: any): boolean {
    let isSizeValid = this.validateFileSize(file);
    let isTypeValid = this.validateFieType(file);
    if (!isSizeValid || !isTypeValid) return false;
    else return true;
  }
  validateFileSize(file: any): boolean {
    let size = this.bytesToSize(file.size);
    if (size > this.fileMaxSize) {
      this.fileSizeValid = false;
      return false;
    } else {
      this.fileSizeValid = true;
      return true;
    }
  }
  bytesToSize(bytes: number): number {
    let sizeInMB = (bytes / (1024 * 1024)).toFixed(2);
    return Number(sizeInMB);
  }
  validateFieType(file: any): boolean {
    if (!this.fileTypeLimit) return false;
    if (this.fileTypeLimit === 'any') return true;
    else if (file.type.includes(this.fileTypeLimit)) {
      this.fileTypeValid = true;
      return true;
    } else {
      this.fileTypeValid = false;
      return false;
    }
  }
  checkFileType(file: any): void {
    if (file.type.includes('image')) this.isImage = true;
    else this.isImage = false;
  }

  onUploadFileClick(): void {
    this.formData.delete('file');
    this.formData.append('file', this.file);
    this._fileUploaderService
      .uploadFile(this.formData)
      .subscribe((responce: any) => {
        this.uploadFile.emit(responce);
        this._notificationService.showNotification(responce);
      });
  }
  onRemoveFileClick(fileSrc: string): void {
    const path = fileSrc.split('/').pop();
    this.fileSrc = '';
    this._fileUploaderService.deleteFile(path!).subscribe((responce: any) => {
      this.removeFile.emit(responce);
      this._notificationService.showNotification(responce);
    });
  }
}
