import { BiometricOptions, NativeBiometric } from "capacitor-native-biometric";
import { catchError, filter, from, map, Observable, of, switchMap } from "rxjs";

export function isBiometricAvailable() {
  return from(NativeBiometric.isAvailable()).pipe(
    map(res => res.isAvailable),
    catchError(() => of(false))
  );
}

export function ifBiometricsIsAvailable() {
  return isBiometricAvailable().pipe(
    filter(isAvailable => isAvailable)
  )
}

export function verifyIdentity(options?: BiometricOptions) {
  return (source$: Observable<any>) => source$.pipe(
    switchMap(() => NativeBiometric.verifyIdentity(options)
      .then(() => true)
      .catch(() => false)
    ),
    filter(isVerified => isVerified)
  )
}