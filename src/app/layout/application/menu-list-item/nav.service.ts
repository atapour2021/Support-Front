import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiHelperService } from 'src/app/core/services';
import { environment } from '../../../../environments/environment';
import { NavItem } from './nav-item';

@Injectable()
export class NavService {
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string | undefined>(undefined);
  private baseUrl!: string;

  constructor(
    private router: Router,
    private apiHelperService: ApiHelperService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });

    this.baseUrl = environment.baseUrl;
  }

  getMenu(role?: string): Observable<NavItem> {
    const url = `${this.baseUrl}/Menu/${role}`;
    return this.apiHelperService.get<NavItem>(url);
  }
}
