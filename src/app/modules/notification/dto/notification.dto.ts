export class NotificationDto implements INotificationDto {
  title: string | undefined;
  description: string | undefined;
  createDate: string | undefined;
  creator: string | undefined;
  isVisited: boolean | undefined;

  init(data: INotificationDto): void {
    this.title = data['title'];
    this.description = data['description'];
    this.createDate = data['createDate'];
    this.creator = data['creator'];
    this.isVisited = data['isVisited'];
  }
}
export interface INotificationDto {
  title: string | undefined;
  description: string | undefined;
  createDate: string | undefined;
  creator: string | undefined;
  isVisited: boolean | undefined;
}
