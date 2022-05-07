import {
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ICardSetting } from './card-list.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  data: any[] = [];
  currentTemplate!: TemplateRef<any>;

  @ViewChild('selectionId') selection!: ElementRef;

  @Input() cardsSetting: ICardSetting[] = [];
  @Input() initialTemplate!: TemplateRef<any>;
  @Input() loading = false;

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'persian']);
    translate.setDefaultLang('persian');
  }

  ngOnInit(): void {
    this.currentTemplate = this.initialTemplate;
  }
}
