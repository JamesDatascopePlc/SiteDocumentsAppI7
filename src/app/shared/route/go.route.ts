import { inject } from "@angular/core";
import { ActivatedRoute, NavigationBehaviorOptions, NavigationExtras, Router } from "@angular/router";

export function useGo() {
  const router = inject(Router);

  return (url: string, extras?: NavigationBehaviorOptions) => router.navigateByUrl(url, extras);
}

export function useGoRelative() {
  const route = inject(ActivatedRoute);
  const router = inject(Router);

  return (extras?: NavigationExtras) => router.navigate([], {
    relativeTo: route,
    ...extras
  });
}