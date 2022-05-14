import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  AddAvatarDto,
  ChangeToSponsorDto,
  ProfileDto,
  Role,
} from '../../dto/profile.dto';
import { ProfileService } from '../../service/profile.service';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/core/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileId: string | undefined;
  profile = new ProfileDto();
  sponsorRole: Role = 'sponsor';
  file!: File;
  baseUrl: string | undefined;
  addAvatarArg = new AddAvatarDto();
  changeToSponsor = new ChangeToSponsorDto();
  isLegalCmbData: Array<{ id: boolean; name: string }> = [
    { id: true, name: 'بله' },
    { id: false, name: 'خیر' },
  ];

  constructor(
    public translate: TranslateService,
    private profileService: ProfileService,
    private notificationService: NotificationService
  ) {
    translate.addLangs(['en', 'persian']);
    translate.setDefaultLang('persian');

    this.profileId = JSON.parse(localStorage.getItem('user')!).profileId;
    this.baseUrl = `${environment.baseUrl}/file-uploader`;

    this.changeToSponsor.isLegal = false;
  }

  ngOnInit(): void {
    this.getProfile(this.profileId!);
  }

  getProfile(id: string): void {
    this.profileService.getProfile(id).subscribe((response_: any) => {
      this.profile.init(response_);
    });
  }

  onFileUploaderClick(): void {
    const file = document.getElementById('file');
    file?.click();
  }
  uploadContent(event: any): void {
    let file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    this.profileService.uploadFile(formData).subscribe((response_: any) => {
      this.addAvatarArg.init({
        id: this.profileId,
        imagePath: response_.data,
      });
      this.addAvatar(this.addAvatarArg);
    });
  }
  addAvatar(data: AddAvatarDto): void {
    this.profileService.addAvatar(data).subscribe(() => {
      this.getProfile(this.profileId!);
      document.getElementById('layoutBtn')!.click();
    });
  }
  deleteAvatar(imagePath: string): void {
    this.profileService.deleteAvatar(this.profileId!).subscribe(() => {
      this.getProfile(this.profileId!);
      this.deleteFile(imagePath);
    });
  }
  deleteFile(imagePath: string): void {
    this.profileService.deleteFile(imagePath).subscribe((response_: any) => {
      document.getElementById('layoutBtn')!.click();
    });
  }

  onEditProfileClick(): void {
    this.profileService
      .editProfile(this.profile, this.profileId!)
      .subscribe((response_: any) => {
        if (!response_.success) return;
        this.getProfile(this.profileId!);
        this.notificationService.showNotification(response_);
      });
  }

  onChangeToSponsorClick(): void {
    const userId = JSON.parse(localStorage.getItem('user')!).id;
    this.changeToSponsor.userId = userId;

    this.profileService
      .changeToSponsor(this.changeToSponsor)
      .subscribe((response_: any) => {
        if (!response_.success) return;
        this.notificationService.showNotification(response_.data);
      });
  }
}
