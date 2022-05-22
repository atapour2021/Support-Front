import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
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

  @Output() changeToggle = new EventEmitter<{ event: any; data: any }>();

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

  onChangeToggleClick(event: any, data: any): void {
    this.changeToggle.emit({ event: event, data: data });
  }
}
