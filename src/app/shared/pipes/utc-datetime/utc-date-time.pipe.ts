import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'utcDateTime',
  standalone: true
})
export class UtcDateTimePipe implements PipeTransform {
  transform(value: Date) {
    return value.toFormat("yyyy-MM-dd HH:mm");
  }
}