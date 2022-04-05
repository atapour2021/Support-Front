import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from './nav-item';
import { NavService } from './nav.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
  ],
})
export class MenuListItemComponent implements OnInit {
  expanded!: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item!: NavItem;
  @Input() depth: number | undefined;

  constructor(
    public _navService: NavService,
    public router: Router,
    private _notificationService: Toaster
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit(): void {
    this._navService.currentUrl.subscribe((url: string | undefined) => {
      if (this.item.route && url) {
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (!item.isPermission) {
      this._notificationService.open({
        text: 'شما به این بخش دسترسی ندارید',
        caption: 'خطا',
        type: 'danger',
        duration: 4000,
      });
    } else {
      if (!item.children || !item.children.length) {
        this.router.navigate([item.route]);
      }
      if (item.children && item.children.length) {
        this.expanded = !this.expanded;
      }
    }
  }
}
