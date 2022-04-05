import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'persian']);
    translate.setDefaultLang('persian');
  }

  ngOnInit(): void {}

  onLogout(): void {}
}
