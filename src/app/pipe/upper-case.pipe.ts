import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'upperCase',
})
export class UpperCasePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value !== undefined && typeof value === 'string') {
      return value.toUpperCase();
    }
    return value;
  }
}
