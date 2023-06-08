import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'utcDate',
  standalone: true
})
export class UtcDatePipe implements PipeTransform {
  transform(value: Date) {
    return value.toFormat("yyyy-MM-dd")
  }
}