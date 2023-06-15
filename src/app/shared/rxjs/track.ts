import { EMPTY, Observable, Subject, catchError, merge, mergeMap, of, shareReplay, tap } from "rxjs";
import { use, UseOf, UsePipe, createPipe } from "../rxjs";

export type TrackingStatus = "Idle" | "Success" | "Error" | "Loading";

export interface Tracking<T> {
  status: UseOf<TrackingStatus>,
  error: UseOf<unknown>,
  data: UsePipe<T>
  isIdle: UsePipe<boolean>,
  isSuccess: UsePipe<boolean>,
  isError: UsePipe<boolean>,
  isLoading: UsePipe<boolean>
}

export interface TrackingOptions<TParams, TResult> {
  deps: Observable<TParams>[],
  fn: (params: TParams) => Observable<TResult>
}

export function track<TResult>(fn: () => Observable<TResult>): Tracking<TResult>;
export function track<TParams, TResult>(options: TrackingOptions<TParams, TResult>): Tracking<TResult>;
export function track<TParams, TResult>(param: TrackingOptions<TParams, TResult> | (() => Observable<TResult>)): Tracking<TResult> {
  const status = use<TrackingStatus>("Idle");
  const error = use<unknown>();
  const trackingFn = typeof param === "function" 
    ? () => {
      status.next("Loading");
      return param();
    }
    : () => merge(...param.deps).pipe(
      tap(() => status.next("Loading")),
      mergeMap(params => param.fn(params))
    );
    

  return {
    status,
    data: createPipe(trackingFn().pipe(
      tap(() => status.next("Success")),
      catchError(err => {
        console.error(err);
        status.next("Error");
        error.next(err);

        return EMPTY;
      }),
      shareReplay()
    )),
    error,
    isIdle: status(s => s === "Idle"),
    isSuccess: status(s => s === "Success"),
    isError: status(s => s === "Error"),
    isLoading: status(s => s === "Loading")
  }
}

export function trackOf<T>(value: T) {
  return track(() => of(value));
}

export function dependencyTrack<TParams, TResult>(options: {
  binding: () => TParams,
  fn: (params: TParams) => Observable<TResult>
}) {
  const params$ = new Subject<TParams>();

  const tracking = track({
    deps: [params$],
    fn: params => options.fn(params)
  });

  return {
    ...tracking,
    fetch: (params?: Partial<TParams>) => {
      params$.next({
        ...options.binding(),
        ...params
      } as TParams);
    }
  }
}