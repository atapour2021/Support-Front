import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/core/services';
import {
  CardService,
  ICardSetting,
} from 'src/app/shared/components/card-list/card-list.service';
import swal from 'sweetalert2';
import { TokenDto, TokenLisArgDto } from '../../dto/token.dto';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  tokenListArg = new TokenLisArgDto();
  tokenList: TokenDto[] = [];
  loading = false;
  pageSize = 6;
  page = 1;
  cardsSetting: ICardSetting[] = [];
  totalElement!: number;
  showPagination = false;

  constructor(
    public translate: TranslateService,
    private _TokenService: TokenService,
    public dialog: MatDialog,
    private _cardService: CardService,
    private notificationService: NotificationService
  ) {
    translate.addLangs(['en', 'persian']);
    translate.setDefaultLang('persian');
  }

  ngOnInit(): void {
    this.tokenListArg.init({
      page: this.page,
      pageSize: this.pageSize,
    });
    this.getTokenList(this.tokenListArg);
  }
  getTokenList(data: TokenLisArgDto): void {
    this.loading = true;
    this._TokenService.getTokens(data).subscribe((response: any) => {
      this.loading = false;
      if (!response.success) return;
      this.tokenList = response.listData;
      this.totalElement = response.totalItem;
      this.showPagination = true;
      this.fillCardSetting(response.listData);
    });
  }
  fillCardSetting(data: TokenDto[]): void {
    this.cardsSetting = [];
    data.forEach((item: TokenDto) => {
      this.cardsSetting.push({
        title: 'Token',
        selectionValue: item._id!,
        contents: [
          {
            name: 'Expire',
            value: item.expire,
            hasPipe: true,
          },
          {
            name: 'UserId',
            value: item.userId,
          },
        ],
      });
    });
  }

  removeToken(event: any): void {
    const id = this._cardService.getSelevtion(event);
    swal
      .fire({
        title: 'حذف توکن ',
        text: ` ${this.getTokenName(id)} را حذف کنید؟`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر',
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          this._TokenService.removeToken(id).subscribe((response: any) => {
            this.getTokenList(this.tokenListArg);
            this.notificationService.showNotification(response);
          });
        }
      });
  }

  getTokenName(id: string | undefined): string | undefined {
    const token: TokenDto = this.tokenList.find(e => e._id === id)!;
    if (!token) return undefined;
    return token._id;
  }

  onPageChange(data: any): void {
    this.tokenListArg.init({
      page: data.page,
      pageSize: data.pageSize,
    });

    this.getTokenList(this.tokenListArg);
  }
}
