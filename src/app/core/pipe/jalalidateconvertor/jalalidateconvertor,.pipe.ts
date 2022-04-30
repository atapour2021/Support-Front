import { Pipe, PipeTransform } from '@angular/core';
import * as jalaliMoment from 'jalali-moment';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'jalalidateconvertor',
})
export class jalalidateconvertor implements PipeTransform {
  transform(value: string): any {
    if (value.indexOf('Date')) {
      let dateTime = '';
      let date = jalaliMoment
        .from(value, 'en')
        .locale('fa')
        .format('YYYY/MM/DD');

      const timezone = moment.tz.guess();
      const format = 'HH:mm:ss';
      let time = moment(value.concat()).tz(timezone).format(format);

      dateTime = `${date}-${time}`;
      if (dateTime) return dateTime;
    }
  }
}
