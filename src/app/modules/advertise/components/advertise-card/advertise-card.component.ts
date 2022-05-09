import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AdvertiseDto } from '../../dto/advertise.dto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-advertise-card',
  templateUrl: './advertise-card.component.html',
  styleUrls: ['./advertise-card.component.scss'],
})
export class AdvertiseCardComponent implements OnInit {
  @Input() data = new AdvertiseDto();

  @Output() editClick = new EventEmitter<string>();
  @Output() removeClick = new EventEmitter<string>();

  baseUrl!: string;

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'persian']);
    translate.setDefaultLang('persian');

    this.baseUrl = `${environment.baseUrl}/file-uploader`;
  }

  ngOnInit(): void {}

  onEditClick(event: any): void {
    const id = event.target.closest('.card').firstChild.textContent;
    this.editClick.emit(id);
  }
  onRemoveClick(event: any): void {
    const id = event.target.closest('.card').firstChild.textContent;
    this.removeClick.emit(id);
  }
  onDownloadClick(file: string): void {
    const url = `${this.baseUrl}/${file}`;
    window.open(url);
  }
}
