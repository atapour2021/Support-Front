import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestTypePipe',
  pure: false,
})
export class RequestTypePipe implements PipeTransform {
  transform(type: string | undefined): string {
    let state: string;
    switch (type) {
      case 'changeUserRoleToSponsor':
        state = 'تغییر نقش کاربر به اسپانسر';
        break;
    }
    return state!;
  }
}
