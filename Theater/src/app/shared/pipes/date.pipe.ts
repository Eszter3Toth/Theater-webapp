import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let date = value.toDate();
    let minOffset = new Date(date).getTime();
    let localISOTime = (new Date(minOffset)).toISOString().replace('Z', '').replace('T', ' ');
    return localISOTime.slice(0, localISOTime.length - 4);
  }

}
