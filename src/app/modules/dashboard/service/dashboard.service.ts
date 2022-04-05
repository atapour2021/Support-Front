import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHelperService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { InvoiceReportDto } from '../dto/dashboard.dto';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUr!: string;

  constructor(private _apiService: ApiHelperService) {
    // this.baseUrl = environment.fiscalMemory;
  }

  getChartData(body: InvoiceReportDto): Observable<any> {
    let params = '';
    const url = `InvoiceQuery/InvoiceReport`;
    if (body.taxpayerAggregateId !== undefined)
      params += `?TaxpayerAggregateId=${body.taxpayerAggregateId}`;
    if (body.startDate !== undefined)
      params += `&&StartDateTime=${body.startDate}`;
    if (body.endDate !== undefined) params += `&&EndDateTime=${body.endDate}`;

    return this._apiService.get<any>(params, url);
  }
}
