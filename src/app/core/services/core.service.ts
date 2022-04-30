import { Injectable } from '@angular/core';
import * as jalaliMoment from 'jalali-moment';
import * as moment from 'moment';
import { Toaster } from 'ngx-toast-notifications';
import { Subject } from 'rxjs';
import { ApiHelperService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private baseUrl!: string;
  isCompleteRegisterd = new Subject<boolean>();

  constructor(
    private _notificationService: Toaster,
    private _apiHelperService: ApiHelperService
  ) {
    // this.baseUrl = environment.baseUrl_;
  }

  convertToMiladiStandard(data: any): string {
    let miladiDate: string;
    let date = data._d.toLocaleDateString().split('/');
    let day: string = date[1];
    if (day.length == 1) day = `0${date[1]}`;
    let month: string = date[0];
    if (month.length == 1) month = `0${month}`;
    let year: string = date[2];
    if (year.length == 1) year = `0${year}`;
    miladiDate = `${year}-${month}-${day}T00:00:00.000Z`;
    return miladiDate;
  }

  jalaliConvert(dateTime: string): string {
    const date = moment(dateTime);
    if (date.isValid()) return '';
    let MomentDate = jalaliMoment
      .from(dateTime, 'en')
      .locale('fa')
      .format('HH:MM -YYYY/MM/DD');
    return MomentDate;
  }
}

export interface ColumnSettings {
  field: string;
  title: string;
  format?: string;
  width: number;
  _width?: number;
  filterable?: boolean;
  orderIndex?: number;
  hidden?: boolean;
  minResizableWidth?: number;
  hasPipe?: boolean;
  pipeName?: string;
  pipeValue?: string;
}

export interface GridSettings {
  columnsConfig: ColumnSettings[];
}
