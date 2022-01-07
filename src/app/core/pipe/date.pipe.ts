import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFilter',
})

export class DateFilter implements PipeTransform {
  transform(
    date: Date | string,
    format: string = 'dd.MM.yyyy HH:MM'
  ): any {
    date = new Date(date);
    return new DatePipe('en-US').transform(date, format);
  }
}
