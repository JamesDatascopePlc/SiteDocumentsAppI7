import { inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, map, shareReplay } from "rxjs";

export function param(queryParam: string) {
  const route = inject(ActivatedRoute);

  return route.snapshot.queryParamMap.get(queryParam);
}

export function param$<T>(queryParam: string): Observable<Nullable<string>>
export function param$<T>(queryParam: string, project: (value: Nullable<string>, index: number) => T): Observable<T>
export function param$<T>(queryParam: string, project?: (value: Nullable<string>, index: number) => T) {
  const route = inject(ActivatedRoute);
  const queryParam$ = route.queryParamMap.pipe(
    map(params => params.get(queryParam))
  );

  return project != null 
    ? queryParam$.pipe(
      map(project),
      shareReplay()
    )
    : queryParam$.pipe(
      shareReplay()
    );
}