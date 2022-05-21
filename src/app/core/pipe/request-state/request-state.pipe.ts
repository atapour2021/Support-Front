import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestStatePipe',
  pure: false,
})
export class RequestStatePipe implements PipeTransform {
  transform(type: string | undefined): string {
    let state: string;
    switch (type) {
      case 'reviewedSuccessfully':
        state = ' درخواست شما با موفقیت ثبت شد';
        break;
      case 'pending':
        state = 'در حال بررسی';
        break;
      case 'reviewedFailed':
        state = 'درخواست شما رد شد';
        break;
    }
    return state!;
  }
}
