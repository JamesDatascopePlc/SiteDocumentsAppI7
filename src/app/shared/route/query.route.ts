import { inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

export function query(parameter: string) {
  const route = inject(ActivatedRoute);

  return route.snapshot.data[parameter] as string | undefined;
}