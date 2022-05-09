import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHelperService } from 'src/app/core/services/api-helper.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileUploaderService {
  constructor(private _apiHelperService: ApiHelperService) {}

  uploadFile(body: any): Observable<string> {
    return this._apiHelperService.uploadFile(body);
  }

  deleteFile(id: string): Observable<any> {
    const url = `${environment.baseUrl}/file-uploader`;
    return this._apiHelperService.delete(url, id);
  }
}

export interface IFileUploaderDialogData {
  opened: boolean;
  fileTypeLimit: string;
  fileMaxSize: number;
  src: string;
  Label: string;
  fileType: string;
}
