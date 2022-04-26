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
}
