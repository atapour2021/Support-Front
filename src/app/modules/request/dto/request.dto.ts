export class RequestDto implements IRequestDto {
  _id: string | undefined;
  type: requestTpe | undefined;
  applicant: string | undefined;
  userId: string | undefined;
  requestDate: string | undefined;
  requestState: requestState | undefined;
  description: boolean | undefined;

  init(data: IRequestDto): void {
    this.type = data['type'];
    this.applicant = data['applicant'];
    this.userId = data['userId'];
    this.requestDate = data['requestDate'];
    this.requestState = data['requestState'];
    this.description = data['description'];
  }
}
export interface IRequestDto {
  _id: string | undefined;
  type: requestTpe | undefined;
  applicant: string | undefined;
  userId: string | undefined;
  requestDate: string | undefined;
  requestState: requestState | undefined;
  description: boolean | undefined;
}

export type requestTpe = 'ChangeUserRoleToSponsor';
export type requestState =
  | 'reviewedSuccessfully'
  | 'pending'
  | 'reviewedFailed';

export class RequestLisArgDto implements IRequestLisArgDto {
  page: number | undefined;
  pageSize: number | undefined;

  init(data: IRequestLisArgDto): void {
    this.page = data['page'];
    this.pageSize = data['pageSize'];
  }
}
export interface IRequestLisArgDto {
  page: number | undefined;
  pageSize: number | undefined;
}
