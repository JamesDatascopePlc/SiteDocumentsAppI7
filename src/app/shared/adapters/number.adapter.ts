import { createStore, propsFactory } from "@ngneat/elf";
import { map } from "rxjs";

export function numberAdapter(name: string, initialValue: number) {
  const {
    withNumber,
    selectNumber,
    setNumber
  } = propsFactory("number", {
    initialValue
  });

  const store = createStore(
    { name },
    withNumber()
  );

  return {
    value$: store.pipe(selectNumber()),
    increment: () => store.update(setNumber(state => state.number + 1)),
    decrement: () => store.update(setNumber(state => state.number - 1)),
    is$: (predicate: (value: number) => boolean) => store.pipe(
      selectNumber(),
      map(predicate)
    ),
    set: (value: number) => store.update(setNumber(value))
  }
}