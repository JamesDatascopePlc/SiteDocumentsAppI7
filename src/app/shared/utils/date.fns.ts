import { isAfter, isBefore, isEqual } from "date-fns";

export function isEqualOrAfter(date1: Date | undefined | null, date2: Date | undefined | null) {
  if (date1 == null || date2 == null)
    return false;

  return isEqual(date1, date2) || isAfter(date1, date2);
}

export function isEqualOrBefore(date1: Date | undefined | null, date2: Date | undefined | null) {
  if (date1 == null || date2 == null)
    return false;

  return isEqual(date1, date2) || isBefore(date1, date2);
}