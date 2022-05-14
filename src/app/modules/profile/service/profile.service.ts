import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHelperService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { AddAvatarDto, ChangeToSponsorDto, ProfileDto } from '../dto/profile.dto';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl: string | undefined;

  constructor(private _apiService: ApiHelperService) {
    this.baseUrl = environment.baseUrl;
  }

  getProfile(id: string): Observable<any> {
    const url = `${this.baseUrl}/Profiles/${id}`;
    return this._apiService.get<any>(url);
  }

  editProfile(body: ProfileDto, id: string): Observable<any> {
    const url = `${this.baseUrl}/profiles`;
    return this._apiService.put<any>(body, url, id);
  }

  uploadFile(body: any): Observable<any> {
    const url = `${this.baseUrl}/file-uploader`;
    return this._apiService.uploadFile(body);
  }

  deleteFile(id: string): Observable<any> {
    const url = `${this.baseUrl}/file-uploader`;
    return this._apiService.delete(url, id);
  }

  deleteAvatar(id: string): Observable<any> {
    const url = `${this.baseUrl}/Avatar-Profile`;
    return this._apiService.delete(url, id);
  }

  addAvatar(data: AddAvatarDto): Observable<any> {
    const url = `${this.baseUrl}/Avatar-Profile`;
    return this._apiService.post(data, url);
  }

  changeToSponsor(data: ChangeToSponsorDto): Observable<any> {
    const url = `${this.baseUrl}/Sponsors`;
    return this._apiService.post(data, url);
  }
}
