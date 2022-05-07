import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  getSelevtion(e: any): string {
    return e.target.closest('.mat-card').children[0].innerText.trim();
  }
}

export interface ICardSetting {
  title: string;
  selectionValue: number | string;
  accessKey?: boolean | undefined;
  contents: IContent[];
}
export interface IContent {
  name: string;
  value: any;
  hidden?: boolean;
  isToggle?: boolean;
  hasPipe?: boolean;
  type?: string
}
