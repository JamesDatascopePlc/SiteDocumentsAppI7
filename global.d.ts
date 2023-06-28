export {};

export type Many<T> = T | T[];
export type ListIterator<T, TResult> = (value: T, index: number) => TResult;

export type DateFormat = `dd${string}MM${string}yyyy` 
  | `dd${string}MM${string}yyyy HH${string}mm`
  | `yyyy${string}MM${string}dd`
  | `yyyy${string}MM${string}dd HH${string}mm`
  | `HH${string}mm`
  | `HH${string}mm${string}ss`;

declare global {
  type Func<R, T = void> = (param: T) => R;
  type Nullable<T> = T | null | undefined;
  interface String {
    toNumber(): number;
    toBoolean(): boolean;
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
    addDays(days: number): Date;
    subtrackHours(hours: number): Date;
  }
  interface Array<T> {
    first(): T | undefined;
    last(): T | undefined;
    removeAt(index: number): T[];
    orderBy<TResult>(iteratees: keyof T | ListIterator<T, TResult>, order?: "asc" | "desc"): T[];
    flatMap<TResult>(iteratee: ListIterator<T, Many<TResult>>): TResult[];
  }
}