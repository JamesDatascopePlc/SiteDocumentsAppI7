import { Pipe, PipeTransform } from "@angular/core";
import { format } from "date-fns";

@Pipe({
  name: 'utcDate',
  standalone: true
})
export class UtcDatePipe implements PipeTransform {
  transform(value: Date) {
    return format(value, "yyyy-MM-dd");
  }
}