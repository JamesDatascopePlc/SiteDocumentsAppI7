import { addHours, format, isAfter, isBefore, isEqual, subHours } from "date-fns";
import { DateFormat, ListIterator } from "global";
import { parse } from "json5";
import { flatMap, orderBy } from "lodash-es";

String.prototype.toNumber = function(this: string) {
  return Number(this);
}

String.prototype.toDate = function(this: string) {
  return new Date(this);
}

String.prototype.toJSON = function<T = unknown>(this: string) {
  return parse<T>(this)
}

Date.prototype.toFormat = function(to: DateFormat) {
  return format(this, to);
}

Date.prototype.isEqualOrAfter = function(date: Date) {
  return isEqual(this, date) || isAfter(this, date);
}

Date.prototype.isEqualOrAfterToday = function() {
  return this.isEqualOrAfter(new Date());
}

Date.prototype.isEqualOrBefore = function(date: Date) {
  return isEqual(this, date) || isBefore(this, date);
}

Date.prototype.isEqualOrBeforeToday = function() {
  return this.isEqualOrBefore(new Date());
}

Date.prototype.addHours = function(hours: number) {
  return addHours(this, hours);
}

Date.prototype.subtrackHours = function(hours: number) {
  return subHours(this, hours);
}

Array.prototype.orderBy = function<T, TResult>(this: T[], iteratees: keyof T | ListIterator<T, TResult>, order: "asc" | "desc" = "asc") {
  return orderBy(this, iteratees, order);
}

Array.prototype.flatMap = function<T, TResult>(this: T[], iteratee: ListIterator<T, TResult>) {
  return flatMap(this, iteratee);
}