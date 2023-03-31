import { Pipe, PipeTransform } from "@angular/core";
import { format } from "date-fns";

@Pipe({
  name: 'utcDateTime',
  standalone: true
})
export class UtcDateTimePipe implements PipeTransform {
  transform(value: Date) {
    return format(value, "yyyy-MM-dd HH:mm");
  }
}