import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'liter',
})
export class LiterPipe implements PipeTransform {
  transform(value: number | null): string {
    if (value === null) {
      return '--';
    } else {
      return String(value).replace('.', ',').concat('L');
    }
  }
}
