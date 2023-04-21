import { Store, StoreDef } from "@ngneat/elf";

export function booleanAdapter<TState, TProp extends keyof TState & string>(store: Store<StoreDef<TState>>, key: TProp) {
  return {
    // toggle: () => store.update(
    //   setProp(key, (prop: TValue) => !prop)
    // )
  };
}