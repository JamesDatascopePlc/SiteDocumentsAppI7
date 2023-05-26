import { Observable, catchError, lastValueFrom, tap } from "rxjs";
import { use } from "../rxjs";

export type TrackingStatus = "Idle" | "Success" | "Error" | "Loading"

export class Track<TResult, TParams = void> {
  status = use<TrackingStatus>("Idle");
  data = use<TResult>();

  isIdle = this.status(s => s === "Idle");
  isSuccess = this.status(s => s === "Success");
  isError = this.status(s => s === "Error");
  isLoading = this.status(s => s === "Loading");

  constructor(protected fn: (params: TParams) => Observable<TResult>) {}

  fire(params: TParams) {
    this.status.next("Loading");

    lastValueFrom(this.fn(params).pipe(
      tap(value => {
        this.status.next("Success");
        this.data.next(value);
      }),
      catchError((err, caught) => {
        console.error(err);
        this.status.next("Error");

        return caught;
      })
    ));

    return this;
  }
}

export function track<TResult, TParams = void>(fn: (params: TParams) => Observable<TResult>) {
  return new Track<TResult, TParams>(fn);
}