import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHelperService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { AdvertiseLisArgDto } from '../dto/advertise.dto';

@Injectable({
  providedIn: 'root',
})
export class AdvertisesService {
  private baseUrl!: string;

  constructor(private _apiService: ApiHelperService) {
    this.baseUrl = environment.baseUrl;
  }

  getAdvertises(body: AdvertiseLisArgDto): Observable<any> {
    let url = `${this.baseUrl}/Advertises`;
    if (body.page) url += `/${body.page}`;
    if (body.pageSize) url += `/${body.pageSize}`;
    return this._apiService.get<any>(url, true);
  }

  removeAdvertise(id: string): Observable<any> {
    let url = `${this.baseUrl}/Advertises`;
    return this._apiService.delete<any>(url, id);
  }
}
