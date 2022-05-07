import { Pipe, PipeTransform } from '@angular/core';
import { BooleanLabelModel } from './translate.model';

@Pipe({
  name: 'translateBoolean',
  pure: false,
})
export class TranslateBooleanPipe implements PipeTransform {
  transform(value: boolean, type: BooleanLabelModel): string {
    let translatedBoolean: string;
    if (value) {
      switch (type) {
        case 'active':
          translatedBoolean = 'فعال';
          break;
        case 'legal':
          translatedBoolean = 'مجاز';
          break;
        case 'own':
          translatedBoolean = 'دارد';
          break;
        case 'agreement':
          translatedBoolean = 'قبول';
          break;
        case 'is':
          translatedBoolean = 'بله';
          break;
        default:
          translatedBoolean = 'بله';
          break;
        case 'inquiry':
          translatedBoolean = 'استعلام شده';
          break;
      }
    } else {
      switch (type) {
        case 'active':
          translatedBoolean = 'غیر فعال';
          break;
        case 'legal':
          translatedBoolean = 'غیر مجاز';
          break;
        case 'own':
          translatedBoolean = 'ندارد';
          break;
        case 'agreement':
          translatedBoolean = 'مخالف';
          break;
        case 'is':
          translatedBoolean = 'خیر';
          break;
        default:
          translatedBoolean = 'خیر';
          break;
        case 'inquiry':
          translatedBoolean = 'استعلام نشده';
          break;
      }
    }
    return translatedBoolean;
  }
}
