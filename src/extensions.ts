import { addDays, addHours, format, isAfter, isBefore, isEqual, parse as parseFormat, parseISO, subHours } from "date-fns";
import { DateFormat, ListIterator, Many } from "global";
import { parse } from "json5";
import { flatMap, orderBy } from "lodash-es";

String.prototype.toNumber = function(this: string) {
  return Number(this);
}

String.prototype.toBoolean = function(this: string) {
  return Boolean(this);
}

String.prototype.toDate = function(this: string) {
  return new Date(this);
}

String.prototype.toJSON = function<T = unknown>(this: string) {
  return parse<T>(this)
}

Date.parseFormat = function(value: string, from: DateFormat) {
  return parseFormat(value, from, new Date());
}

Date.fromISOString = function(value: string) {
  return parseISO(value);
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

Date.prototype.addDays = function(days: number) {
  return addDays(this, days);
}

Date.prototype.subtrackHours = function(hours: number) {
  return subHours(this, hours);
}

Array.prototype.first = function<T>(this: T[]) {
  return this[0]
}

Array.prototype.last = function<T>(this: T[]) {
  return this[this.length - 1];
}

Array.prototype.orderBy = function<T, TResult>(this: T[], iteratees: keyof T | ListIterator<T, TResult>, order: "asc" | "desc" = "asc") {
  return orderBy(this, iteratees, order);
}

Array.prototype.flatMap = function<T, TResult>(this: T[], iteratee: ListIterator<T, Many<TResult>>) {
  return flatMap(this, iteratee);
}