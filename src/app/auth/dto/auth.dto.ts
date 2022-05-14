export class LoginDto implements ILoginDto {
  userName!: string;
  password!: string;

  init(data: ILoginDto): void {
    this.userName = data['userName'];
    this.password = data['password'];
  }
}
export interface ILoginDto {
  userName: string;
  password: string;
}

export class RegisterDto implements IRegisterDto {
  userName!: string;
  password!: string;
  fullName!: string;
  nationalCode!: string;

  init(data: IRegisterDto): void {
    this.userName = data['userName'];
    this.password = data['password'];
    this.nationalCode = data['nationalCode'];
  }
}
export interface IRegisterDto {
  userName: string;
  password: string;
  fullName: string;
  nationalCode: string;
}

export class RefreshTokenDto implements IRefreshTokenDto {
  userId!: string;
  token!: string;

  init(data: IRefreshTokenDto): void {
    this.userId = data['userId'];
    this.token = data['token'];
  }
}
export interface IRefreshTokenDto {
  userId: string;
  token: string;
}
