export class AdvertiseDto implements IAdvertiseDto {
  _id: string | undefined;
  image: string | undefined;
  title: string | undefined;
  type: string | undefined;
  creator: string | undefined;
  createDate!: string;
  description: string | undefined;
  extraDataFile: string | undefined;
  userId: string | undefined;

  init(data: IAdvertiseDto): void {
    this.image = data['image'];
    this.creator = data['creator'];
    this.createDate = data['createDate'];
    this.description = data['description'];
    this.extraDataFile = data['extraDataFile'];
    this.title = data['title'];
    this.type = data['type'];
  }
}
export interface IAdvertiseDto {
  _id: string | undefined;
  image: string | undefined;
  creator: string | undefined;
  createDate: string;
  description: string | undefined;
  extraDataFile: string | undefined;
  userId: string | undefined;
  title: string | undefined;
  type: string | undefined;
}

export class AdvertiseLisArgDto implements IAdvertiseLisArgDto {
  page: number | undefined;
  pageSize: number | undefined;

  init(data: IAdvertiseLisArgDto): void {
    this.page = data['page'];
    this.pageSize = data['pageSize'];
  }
}
export interface IAdvertiseLisArgDto {
  page: number | undefined;
  pageSize: number | undefined;
}
