import { EMPTY, Observable, catchError, take, tap } from "rxjs";
import { use } from "../rxjs";

export type TrackingStatus = "Idle" | "Success" | "Error" | "Loading";

export class Track<TResult, TParams = void> {
  status = use<TrackingStatus>("Idle");
  data = use<TResult>();
  error = use<unknown>();

  isIdle = this.status(s => s === "Idle");
  isSuccess = this.status(s => s === "Success");
  isError = this.status(s => s === "Error");
  isLoading = this.status(s => s === "Loading");

  constructor(protected fn: (params: TParams) => Observable<TResult>) {}

  fire(params: TParams) {
    this.status.next("Loading");

    this.fn(params).pipe(
      take(1),
      tap(value => {
        this.status.next("Success");
        this.data.next(value);
      }),
      catchError((err) => {
        this.status.next("Error");
        this.error.next(err);

        return EMPTY;
      })
    )
    .subscribe();

    return this;
  }
}

export function track<TResult, TParams = void>(fn: (params: TParams) => Observable<TResult>) {
  return new Track<TResult, TParams>(fn);
}