import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rolePipe',
  pure: false,
})
export class RolePipe implements PipeTransform {
  transform(type: string | undefined): string {
    let state: string;
    switch (type) {
      case 'admin':
        state = 'کارشناس';
        break;
      case 'sponsor':
        state = 'اسپانسر';
        break;
      case 'user':
        state = 'کاربر';
        break;
    }
    return state!;
  }
}
