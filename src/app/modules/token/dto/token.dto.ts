export class TokenDto implements ITokenDto {
  _id: string | undefined;
  hashToken: string | undefined;
  userId: string | undefined;
  expire: boolean | undefined;

  init(data: ITokenDto): void {
    this._id = data['_id'];
    this.hashToken = data['hashToken'];
    this.userId = data['userId'];
    this.expire = data['expire'];
  }
}
export interface ITokenDto {
  _id: string | undefined;
  hashToken: string | undefined;
  userId: string | undefined;
  expire: boolean | undefined;
}

export class TokenLisArgDto implements ITokenLisArgDto {
  page: number | undefined;
  pageSize: number | undefined;

  init(data: ITokenLisArgDto): void {
    this.page = data['page'];
    this.pageSize = data['pageSize'];
  }
}
export interface ITokenLisArgDto {
  page: number | undefined;
  pageSize: number | undefined;
}
