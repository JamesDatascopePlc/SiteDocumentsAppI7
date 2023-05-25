import { Observable, catchError, tap } from "rxjs";
import { use } from "../rxjs";

export type QueryStatus = "Idle" | "Success" | "Error" | "Loading"

export function track<T>(fn: () => Observable<T>) {
  const status = use<QueryStatus>("Loading"),
    isLoading$ = status(status => status === "Loading");

  return {
    status$: status(),
    isLoading$,
    data$: fn().pipe(
      tap(() => status.next("Success")),
      catchError((err, caught) => {
        console.error(err);
        status.next("Error");

        return caught;
      })
    )
  }
}