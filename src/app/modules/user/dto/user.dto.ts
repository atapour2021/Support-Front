export class UserDto implements IUserDto {
  _id: string | undefined;
  userName: string | undefined;
  password: string | undefined;
  fullName: string | undefined;
  nationalCode: string | undefined;
  userRole: string | undefined;
  profileId: string | undefined;

  init(data: IUserDto): void {
    this.userName = data['userName'];
    this.password = data['password'];
    this.fullName = data['fullName'];
    this.nationalCode = data['nationalCode'];
    this.userRole = data['userRole'];
    this.profileId = data['profileId'];
  }
}
export interface IUserDto {
  _id: string | undefined;
  userName: string | undefined;
  password: string | undefined;
  fullName: string | undefined;
  nationalCode: string | undefined;
  userRole: string | undefined;
  profileId: string | undefined;
}

export class UserLisArgDto implements IUserLisArgDto {
  page: number | undefined;
  pageSize: number | undefined;

  init(data: IUserLisArgDto): void {
    this.page = data['page'];
    this.pageSize = data['pageSize'];
  }
}
export interface IUserLisArgDto {
  page: number | undefined;
  pageSize: number | undefined;
}
