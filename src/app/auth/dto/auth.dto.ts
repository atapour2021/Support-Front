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
    firstName!: string;
    lastName!: string;
    age?: number;
    nationalCode!: string;
  
    init(data: IRegisterDto): void {
      this.userName = data['userName'];
      this.password = data['password'];
      this.firstName = data['firstName'];
      this.lastName = data['lastName'];
      this.age = data['age'];
      this.nationalCode = data['nationalCode'];
    }
  }
  export interface IRegisterDto {
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    age?: number;
    nationalCode: string;
  }
  