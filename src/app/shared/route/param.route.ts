import { inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

export function param(queryParam: string) {
  const route = inject(ActivatedRoute);

  return route.snapshot.data[queryParam] as string | undefined;
}