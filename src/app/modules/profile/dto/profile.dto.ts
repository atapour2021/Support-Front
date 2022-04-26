export class ProfileDto implements IProfile {
  userName: string | undefined;
  fullName: string | undefined;
  age: number | undefined;
  nationalCode: string | undefined;
  userRole: Role | undefined;
  mobileNumber: string | undefined;
  email: string | undefined;
  avatar: string | undefined;
  description: string | undefined;

  init(data: IProfile): void {
    this.userName = data['userName'];
    this.fullName = data['fullName'];
    this.age = data['age'];
    this.nationalCode = data['nationalCode'];
    this.userRole = data['userRole'];
    this.mobileNumber = data['mobileNumber'];
    this.email = data['email'];
    this.avatar = data['avatar'];
    this.description = data['description'];
  }
}
export interface IProfile {
  userName: string | undefined;
  fullName: string | undefined;
  age: number | undefined;
  nationalCode: string | undefined;
  userRole: Role | undefined;
  mobileNumber: string | undefined;
  email: string | undefined;
  avatar: string | undefined;
  description: string | undefined;
}
export type Role = 'admin' | 'user' | 'sponsor';

export class AddAvatarDto implements IAddAvatarDto {
  id: string | undefined;
  imagePath: string | undefined;

  init(data: IAddAvatarDto): void {
    this.id = data['id'];
    this.imagePath = data['imagePath'];
  }
}
export interface IAddAvatarDto {
  id: string | undefined;
  imagePath: string | undefined;
}
