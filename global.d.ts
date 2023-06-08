export {};

export type ListIterator<T, TResult> = (value: T, index: number) => TResult;

export type DateFormat = `dd${string}MM${string}yyyy` 
  | `dd${string}MM${string}yyyy HH${string}mm`
  | `yyyy${string}MM${string}dd`
  | `yyyy${string}MM${string}dd HH${string}mm`
  | `HH${string}mm`
  | `HH${string}mm${string}ss`;

declare global {
  interface String {
    toNumber(): number;
    toDate(): Date;
    toJSON<T>(): T;
  }
  interface DateConstructor {
    parseFormat(value: string, from: DateFormat): Date;
    fromISOString(value: string): Date;
  }
  interface Date {
    toFormat(to: DateFormat): string;
    isEqualOrAfter(date: Date): boolean;
    isEqualOrAfterToday(): boolean;
    isEqualOrBefore(date: Date): boolean;
    isEqualOrBeforeToday(date: Date): boolean;
    addHours(hours: number): Date;
    subtrackHours(hours: number): Date;
  }
  interface Array<T> {
    orderBy<TResult>(iteratees: keyof T | ListIterator<T, TResult>, order?: "asc" | "desc"): T[]
    flatMap<TResult>(iteratee: ListIterator<T, TResult>): TResult[]
  }
}