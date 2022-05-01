import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CorporateEmployee, Page, PagedData } from './grid.model';
import { companyData } from './company';

@Injectable()
export class MockServerResultsService {
  public getResults(page: Page): Observable<PagedData<CorporateEmployee>> {
    return of(companyData)
      .pipe(map(d => this.getPagedData(page)))
      .pipe(delay(1000 * Math.random()));
  }

  private getPagedData(page: Page): PagedData<CorporateEmployee> {
    const pagedData = new PagedData<CorporateEmployee>();
    page.totalElements = companyData.length;
    page.totalPages = page.totalElements / page.size;
    const start = page.pageNumber * page.size;
    const end = Math.min(start + page.size, page.totalElements);
    for (let i = start; i < end; i++) {
      const jsonObj = companyData[i];
      const employee = new CorporateEmployee(
        jsonObj.name,
        jsonObj.gender,
        jsonObj.company,
        jsonObj.age!
      );
      pagedData.data.push(employee);
    }
    pagedData.page = page;
    return pagedData;
  }
}
